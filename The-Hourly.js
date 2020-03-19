/* Magic Mirror
 * Module: Hourly
 *
 * By Cowboysdude
 * MIT Licensed.
 */
Module.register("The-Hourly", {

    // Module config defaults.
    defaults: {
        updateInterval: 30 * 60 * 1000,
        initialLoadDelay: 0  
    },

    // Define required scripts.
    getScripts: function() {
        return ["moment.js"];
    },
    getStyles: function() {
        return ["The-Hourly.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name); 
        this.today = "";
        this.getHourly();		
        this.scheduleUpdate(); 
        this.hourly = null;
    }, 

    getDom: function() {  

        if(this,hourly){		
        var wrapper = document.createElement("div"); 
	          var hours = this.hourly; 
        var midDiv = document.createElement("div"); 
		
        var whours = hours.slice(0, 12);
        for (o = 0; o < whours.length; o++) {
            var fhours = whours[o];  

            var timer = moment.unix(fhours.time).format('h a'); 

            var Icon = "<img class='photo' src=" + fhours.icon + ">";
            var stime = moment(fhours.startTime).format('h a'); 
            var temp = fhours.temperature + "&#730"; 
			midDiv.classList.add("photo","xsmall", "bright");					 
            midDiv.innerHTML +=  `<div style="float: left; width: 6%; Padding-Bottom: 25px;"><figure>
									<figcaption>${stime} <br> ${temp}</figcaption>
									${Icon}
								  </figure></div>`;  
								}
         
		wrapper.appendChild(midDiv);
		}
        return wrapper;
    }, 
     

    scheduleUpdate: function() {
        setInterval(() => {
			this.getHourly();
        }, this.config.updateInterval);
    }, 
	
	processHour: function(data) {
        this.hourly = data;
console.log(this.hourly);		
    },  

    getHourly: function() {
        this.sendSocketNotification('GET_HOURLY');
    },
	
	 socketNotificationReceived: function(notification, payload) {
         if (notification === "HOURLY_RESULT") { 
              this.processHour(payload); 
        }
		if (notification === 'DOM_OBJECTS_CREATED') { 
        this.updateDom(this.config.initialLoadDelay);
		}
    }, 
     
});