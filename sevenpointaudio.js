const { InstanceBase, Regex, runEntrypoint, InstanceStatus, UDPHelper } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')
const UpdateActions = require('./src/actions')
const UpdateConfigFields = require('./src/config')
const UpdateVariableDefinitions = require('./src/variables')

const DEFAULT_HOST = '127.0.0.1'
const DEFAULT_PORT = 7788

class SevenPointAudioModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

   //Required method for module to operate
   getConfigFields() {
		return UpdateConfigFields.getConfigFields()
	}

   //Init the module
   async init(config) {
      this.config = config
      //Create the UDP object before loading the module
      this.initUDP()   
      this.updateStatus(InstanceStatus.Ok)
      this.updateActions()
      this.updateVariableDefinitions()
   }

   initUDP() {
      //Destroy any pre-existing object
      if (this.udp) {
         this.log('info', 'Destroying existing UDP connection')
         this.udp.destroy()
         delete this.udp
      }

      //Get the host/port settings from the config, if present
      const host = this.config.host || DEFAULT_HOST
      const port = this.config.port || DEFAULT_PORT

      this.log('info', `Creating new UDPHelper - Host: ${host}, Port: ${port}`)

      //Create the UDPHelper object
      try {
         this.udp = new UDPHelper(host, port)

         //Capture the state_change event
         this.udp.on('status_change', (status, message) => {
            this.updateStatus(status, message)
         })

         //Capture the error even
         this.udp.on('error', (err) => {
            this.log('error', 'UDP error: ' + err.message)
            this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
         })
      } catch (error) {
         this.log('error', `Failed to create UDP helper: ${error.message}`)
      }

   }

	// When module gets deleted
	async destroy() {
      //Close any open UDPHelper objects
      if (this.udp) {
         this.udp.destroy()
      }
      delete this.udp

		this.log('info', 'Destroying Seven Point Audio Module')
	}

	async configUpdated(config) {
		this.config = config
      this.initUDP()
	}

	updateActions() {
		UpdateActions(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(SevenPointAudioModuleInstance, UpgradeScripts)
