const { Regex } = require('@companion-module/base')
module.exports = function (self) {

   const sendUDPMessage = (msg) => {
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

	self.setActionDefinitions({
      announcement: {
         name: 'Announcement',
         options: [
            {
               type: 'dropdown',
               label: 'Announcement Control',
               id: 'announceState',
               default: 'toggle',
               choices: [
                  { id: 'toggle', label: 'Toggle Announcement' },
                  { id: 'on', label: 'Announcement On' },
                  { id: 'off', label: 'Announcement Off' }
               ]
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let cmd = 'announcement'

            switch (opt.announceState) {
               case 'on':
                  cmd += ' 1'
                  break
               case 'off':
                  cmd += ' 0'
                  break
            }

            self.log('debug', `Announcement Command: ${cmd}`)
            sendUDPMessage(cmd)
         }
      },
      compressor: {
         name: 'Compressor',
         options: [
            {
               type: 'dropdown',
               label: 'Compressor Control',
               id: 'compState',
               default: 'toggle',
               choices: [
                  { id: 'toggle', label: 'Toggle Compressor' },
                  { id: 'on', label: 'Compressor On' },
                  { id: 'off', label: 'Compressor Off' }
               ]
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let cmd = 'compressor'

            switch (opt.compState) {
               case 'on':
                  cmd += ' 1'
                  break
               case 'off':
                  cmd += ' 0'
                  break
            }

            self.log('debug', `Compressor Command: ${cmd}`)
            sendUDPMessage(cmd)
         }
      },
      crossfade: {
         name: 'Crossfade',
         options: [
            {
               type: 'dropdown',
               label: 'Default Crossfade',
               id: 'cfState',
               default: 'toggle',
               choices: [
                  { id: 'toggle', label: 'Toggle Crossfade Fade' },
                  { id: 'on', label: 'Crossfade Fade On' },
                  { id: 'off', label: 'Crossfade Fade Off' }
               ]
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let cmd = 'crossfade'

            switch (opt.cfState) {
               case 'on':
                  cmd += ' 1'
                  break
               case 'off':
                  cmd += ' 0'
                  break
            }

            self.log('debug', `Crossfade Command: ${cmd}`)
            sendUDPMessage(cmd)
         }
      },
      defaultfade: {
         name: 'Default Fade',
         options: [
            {
               type: 'dropdown',
               label: 'Default Fade Control',
               id: 'dfState',
               default: 'toggle',
               choices: [
                  { id: 'toggle', label: 'Toggle Default Fade' },
                  { id: 'on', label: 'Default Fade On' },
                  { id: 'off', label: 'Default Fade Off' }
               ]
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let cmd = 'defaultfade'

            switch (opt.dfState) {
               case 'on':
                  cmd += ' 1'
                  break
               case 'off':
                  cmd += ' 0'
                  break
            }

            self.log('debug', `Default Fade Command: ${cmd}`)
            sendUDPMessage(cmd)
         }
      },
      equalizer: {
         name: 'Equalizer',
         options: [
            {
               type: 'dropdown',
               label: 'Equalizer Control',
               id: 'eqState',
               default: 'toggle',
               choices: [
                  { id: 'toggle', label: 'Toggle Equalizer' },
                  { id: 'on', label: 'Equalizer On' },
                  { id: 'off', label: 'Equalizer Off' }
               ]
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let cmd = 'equalizer'

            switch (opt.eqState) {
               case 'on':
                  cmd += ' 1'
                  break
               case 'off':
                  cmd += ' 0'
                  break
            }

            self.log('debug', `Equalizer Command: ${cmd}`)
            sendUDPMessage(cmd)
         }
      },
      loop: {
         name: 'Loop',
         options: [
            {
               type: 'dropdown',
               label: 'Loop Control',
               id: 'loopState',
               default: 'toggle',
               choices: [
                  { id: 'toggle', label: 'Toggle Loop' },
                  { id: 'on', label: 'Loop On' },
                  { id: 'off', label: 'Loop Off' }
               ]
            }
         ],
         callback: async (event, context) => {
            let opt = event.options
            let cmd = 'loop'

            switch (opt.loopState) {
               case 'on':
                  cmd += ' 1'
                  break
               case 'off':
                  cmd += ' 0'
                  break
            }

            self.log('debug', `Loop Command: ${cmd}`)
            sendUDPMessage(cmd)
         }
      },
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

            self.log('debug', `Volume: ${vol}`)
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

            self.log('debug', `Volume Down: ${vol}`)
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

            self.log('debug', `Volume Up: ${vol}`)
            sendUDPMessage(cmd)
         }
      },
	})
}
