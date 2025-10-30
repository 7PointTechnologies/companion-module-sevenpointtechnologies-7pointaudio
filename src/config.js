module.exports = {
	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'settings-info',
				width: 12,
				label: 'General Settings',
				value:
					'For most users the settings below can be left blank to apply default values for 7 Point Audio. Modifying these values for Port and/or IP will send the traffic intended for 7 Point Audio to a purposefully configured endpoint. Only modify these settings if you are familiar with the networking requirements of your installation. If you are having issues, clear these settings to control the instance of 7 Point Audio installed on this computer.',
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Remote Control Port',
				width: 6,
				default: '7788',
				tooltip: 'Default: 7788',
				//regex: Regex.PORT,
			},
			{
				type: 'static-text',
				id: 'port-info',
				width: 6,
				label: 'Port Instructions',
				value:
					'Set the Remote Control Port to the same setting in 7 Point Audio. Leave blank for the default value of 7788.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: '7 Point Audio IP',
				width: 6,
				tooltip: 'Default: 127.0.0.1',
				default: '127.0.0.1',
				//regex: Regex.IP,
			},
			{
				type: 'static-input',
				id: 'ip-info',
				width: 6,
				label: 'IP Instructions',
				value:
					'Leave the IP address field blank if you wish to control the instance of 7 Point Audio installed on this computer. If you need to control a remote instance of 7 Point Audio, enter the IP address manually.',
			},
		]
	},
}
