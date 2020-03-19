/* Magic Mirror
 * Module: Hourly
 *
 * By Cowboysdude
 * MIT Licensed.
 */
var NodeHelper = require('node_helper');
var request = require('request'); 

module.exports = NodeHelper.create({

    start: function() {
        console.log("Getting module: " + this.name); 
		 
    }, 
 
    getHourly: function(url) {
		request({
            url: "https://api.weather.gov/gridpoints/BGM/35,50/forecast/hourly",
            method: 'GET',
            headers: {
                'token': 'SHIFYpUPJOYdfCbCOUHoueGNTdttXYGe',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0 Chrome/79.0.3945.130 Safari/537.36'
            },
        }, (error, response, body) => {
            var result = JSON.parse(body).properties.periods; 
            this.sendSocketNotification("HOURLY_RESULT", result); 
        });
    }, 
	
	socketNotificationReceived: function(notification) {
        if (notification === 'GET_HOURLY') { 
                this.getHourly(); 
         }  
	},
	
	  
	 
});