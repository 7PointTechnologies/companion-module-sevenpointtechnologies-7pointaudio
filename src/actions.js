module.exports = function (self) {
   //Basic UDP send message
   //NOTE: The UDP message does **NOT** end in a CR/LF
   const sendUDPMessage = (msg, msgId) => {
      if (msg === undefined)
      {
         self.log('warn', 'Message is undefined')
         return
      }

      if (self.udp) {
         self.log('debug', `Sending UDP Message: ${msg}`)
         self.udp.send(msg)
      } else {
         self.log('warn', 'UDP not initialized')
      }
   }

   //Create a Toggle Action that is repeatable
   const createToggleAction = (name, cmdName = "") => {
      if (cmdName == "") {
         cmdName = name.toLowerCase()
      } else {
         cmdName = cmdName.toLowerCase()
      }

      const stateId = cmdName + 'State'

      return {
         name: name,
         options: [
            {
               type: 'dropdown',
               label: `${name} Control`,
               id: stateId,
               default: 'toggle',
               choices: [
                  { id: 'toggle', label: `Toggle ${name}` },
                  { id: 'on', label: `${name} On` },
                  { id: 'off', label: `${name} Off` }
               ]
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let cmd = cmdName

            switch (opt[stateId]) {
               case 'on':
                  cmd += ' 1'
                  break
               case 'off':
                  cmd += ' 0'
                  break
            }

            self.log('debug', `${name} Command: ${cmd}`)
            sendUDPMessage(cmd)
         }
      }
   }

	self.setActionDefinitions({
      announcement:  createToggleAction('Announcement'),
      compressor:    createToggleAction('Compressor'),
      crossfade:     createToggleAction('Crossfade'),
      defaultfade:   createToggleAction('Default Fade', 'defaultfade'),
      equalizer:     createToggleAction('Equalizer'),
      loop:          createToggleAction('Loop'),
      pause: {
         name: 'Pause',
         options: [],
         callback: async (event) => {
            let cmd = 'pause'
            self.log('debug', 'Pause Command')
            sendUDPMessage(cmd)
         }
      },
      play: {
         name: "Play",
         options: [],
         callback: async (event) => {
            let cmd = 'play'
            self.log('debug', 'Play Command')
            sendUDPMessage(cmd)
         }
      },
      playbutton: {
         name: 'Play Button',
         options: [
            {
               type: 'textinput',
               label: 'Button ID',
               id: 'buttonid',
            },
            {
               type: 'checkbox',
               label: 'Sound Over Sound',
               id: 'sos',
               default: false
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let buttonId = await context.parseVariablesInString(opt.buttonid)
            let sos = opt.sos ? 1 : 0
            let cmd = `playbutton ${buttonId} ${sos}`

            self.log('debug', `Play Button: ${buttonId}`)
            sendUDPMessage(cmd)
         }
      },
      rewind: {
         name: 'Rewind',
         options: [],
         callback: async (event) => {
            let cmd = 'rewind'
            self.log('debug', 'Rewind Command')
            sendUDPMessage(cmd)
         }
      },
      stop: {
         name: 'Stop',
         options: [],
         callback: async (event) => {
            let cmd = 'stop'
            self.log('debug', 'Stop Command')
            sendUDPMessage(cmd)
         }
      },
      stopall: {
        name: 'Stop All',
        options: [],
        callback: async (event) => {
            let cmd = 'stopall'
            self.log('debug', 'Stop All Command')
            sendUDPMessage(cmd)
        } 
      },
      volume: {
         name: 'Volume',
         options: [
            {
               type: 'number',
               label: 'Volume (0-100)',
               id: 'volumelvl',
               default: 50,
               min: 0,
               max: 100
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let vol = opt.volumelvl
            let cmd = `volume ${vol}`

            self.log('debug', `Volume Command: ${vol}`)
            sendUDPMessage(cmd)
         }
      },
      volumedown: {
         name: 'Volume Down',
         options: [
            {
               type: 'number',
               label: 'Volume (0-10)',
               id: 'volumelvl',
               default: 5,
               min: 0,
               max: 10
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let vol = opt.volumelvl
            let cmd = `volumedown ${vol}`

            self.log('debug', `Volume Down Command: ${vol}`)
            sendUDPMessage(cmd)
         }
      },
      volumeup: {
         name: 'Volume Up',
         options: [
            {
               type: 'number',
               label: 'Volume (0-10)',
               id: 'volumelvl',
               default: 5,
               min: 0,
               max: 10
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let vol = opt.volumelvl
            let cmd = `volumeup ${vol}`

            self.log('debug', `Volume Up Command: ${vol}`)
            sendUDPMessage(cmd)
         }
      },
	})
}
