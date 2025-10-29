const { InstanceBase, Regex, runEntrypoint, InstanceStatus, UDPHelper } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')
const actions = require('./src/actions')
const configFields = require('./src/config')
const UpdateVariableDefinitions = require('./src/variables')

class SevenPointAudioModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

   getConfigFields() {
		return configFields.getConfigFields()
	}

async init(config) {
   this.config = config
   this.initUDP()   
   this.updateStatus(InstanceStatus.Ok)
   this.updateActions()
   this.updateVariableDefinitions()
}

initUDP() {
   if (this.udp) {
      this.log('info', 'Destroying existing UDP connection')
      this.udp.destroy()
      delete this.udp
   }

   const host = this.config.host || '127.0.0.1'
   const port = this.config.port || 7788

   this.log('info', `Host: ${host}, Port: ${port}`)

   if (host) {
      this.log('info', 'Creating new UDPHelper...')
      
      try {
         this.udp = new UDPHelper(host, port)

         this.udp.on('status_change', (status, message) => {
            this.updateStatus(status, message)
         })

         this.udp.on('error', (err) => {
            this.log('error', 'UDP error: ' + err.message)
            this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
         })
      } catch (error) {
         this.log('error', `Failed to create UDP helper: ${error.message}`)
      }
   } else {
      this.log('warn', 'UDP not created - no host')
   }
}

	// When module gets deleted
	async destroy() {
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
		actions(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(SevenPointAudioModuleInstance, UpgradeScripts)
