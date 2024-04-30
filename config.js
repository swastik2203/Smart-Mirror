
let config = {
	address: "localhost",
	port: 8080,
	basePath: "/",
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],
	useHttps: false,
	httpsPrivateKey: "",	
	httpsCertificate: "",	

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], 
	timeFormat: 24,
	units: "metric",

	modules: [
		
		{
			module: "clock",
			position: "top_bar",
			config: {
				timeFormat: '12',
				displayType: 'both',
				analogSize: '100px',
				analogFace: 'simple',
				showSunTimes: 'true',
				secondsColor: "#888888"
			  },

		},
		{
			module: "calendar",
			header: "Holidays in India",
			position: "top_left",
			config: {
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						url: "https://www.officeholidays.com/ics-clean/india/odisha"
					}
				]
			}
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Bhubaneswar",
				locationID: "1275817", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz;
				apiKey: "ef3d41bb4e6969378203c1f8087d1d83"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Bhubaneswar",
				locationID: "1275817", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz;
				apiKey: "ef3d41bb4e6969378203c1f8087d1d83"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "TOI recent stories",
						url: "https://timesofindia.indiatimes.com/rssfeedmostrecent.cms"
					}
				],
				showSourceTitle: true,
				broadcastNewsFeeds: true,
			}
		},
	]
};


if (typeof module !== "undefined") { module.exports = config; }
