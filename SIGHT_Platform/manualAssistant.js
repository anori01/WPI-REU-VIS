// events in d3 can be manually logged by adding:
// 		.on('event-type', eventPasser.log)

var eventPasser = eventPasser || (function(){
	var eventsToAdd = [];
	var latenciesToAdd = [];
	var startTime = 0; //TODO: NEED TO FIX TIMING TO SYNC UP WITH SIGHT

	return {
		log: function(e){
			if(INIT.status() == true){
				var date = new Date();
		        var formattedDate = ""+date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear();
		        // time since load event in milliseconds
		        var time = 0;
		        startTime == 0 ? startTime = e.timeStamp : time = e.timeStamp-startTime; //TODO: NEED TO FIX TIMING TO SYNC UP WITH SIGHT
		        var tarId; 
		        try{tarId = e.target.getAttribute('trackId')}catch(e){tarId = null};
		        eventsToAdd.push(new Array(e.type, formattedDate, time, e.screenX, e.screenY, e.target, tarId, e.key, "manual"));
			}

			if(INIT.runningTest() == true){
				var LAG = performance.now() - e.timeStamp;
				latenciesToAdd.push([e.type, LAG, "manual"]);
			}
		},

		getEvents: function(){
			return eventsToAdd;
		},

		getLatencies: function(){
			return latenciesToAdd;
		}
	};
}());
