 // determine if we can proceed with testing
if(INIT.status() == true || INIT.runningTest() == true){
  var proceed = false;
	var message = confirm("We would like to record your session while you interact with this page. \nThis information will be used to provide feedback to the developer to help improve user experience. \nPress OK to allow us to record your session, or press cancel to disallow this and interact with the page like normal.")
	message == true ? proceed = true : proceed = proceed;
}

// assigns every element in the body a unique trackId number
// delayed to allow page to load
var idInc=0;
setTimeout( function initializeIDs(){
	var list = [];
    allElements = document.body.getElementsByTagName("*");
    for(var i=0; i<allElements.length; i++){
    	(allElements[i]).setAttribute('trackId', idInc);
    	idInc++;
    }
    return allElements;
}, 100);

//if we can proceed, execute
if(proceed == true){
	// create submission button
	$('body').prepend('<p id="empty"></p>');
  $('body').prepend('<input type="button" id="generator" class="capture" value="Submit Report">');
  $('body').prepend('<p id="instructions">Click this button when you are done interacting with the page.</p>');

  var ins = monitorEvents(window);
  if(INIT.status() == true){
  	toCSV(ins[0], false);
  }
  if(INIT.runningTest() == true){
  	toCSV(ins[1], true);
  }
}

var startTime = 0;
function monitorEvents(element) {
  var userInteractions = [], userLatencies = [];
  var log = function(e) { 
    if(!(INIT.events().includes(e.type))){
      if(INIT.status() == true){
        var date = new Date();
	      var formattedDate = ""+date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear();
	      // time since load event in milliseconds
	      var time = 0;
	      startTime == 0 ? startTime = e.timeStamp : time = e.timeStamp-startTime;
	      var tarId; 
	      try{tarId = e.target.getAttribute('trackId')}catch(e){tarId = null};
	      userInteractions.push(new Array(e.type, formattedDate, time, e.screenX, e.screenY, e.target, tarId, e.key, "automatic"));
      }
      // This if loop measures program latency by recording the difference between the time returned
      // by performance.now() and the event's timestamp. The timestamp is created the moment when the 
      // event is triggered. The command performance.now() is run as soon as the event has completed. 
      // The larger the difference is between these two, the greater the amount of lag.
      if(INIT.runningTest() == true){
        var how = (INIT.status() == true) ? "automatic" : "none";
        var LAG = performance.now() - e.timeStamp;
        userLatencies.push([e.type, LAG, how]);
      }  
    }
  };
  // finds every eventListener in the Javascript file and puts them in events[]  
  var events = [];   
  for(var i in element) {
    if(i.startsWith("on"))
      events.push(i.substr(2)); 
  }
  // for all triggers, add an eventListener to log
	events.forEach(function(eventName) { 
    element.addEventListener(eventName, log); 
  });
  // returns the interactions with the webpage as an array of arrays
  return [userInteractions, userLatencies];
}

// function to merge the automatically and manually collected user interactions
function mergeCollections(arrayToMerge, isLatency){
  if(isLatency == true){
    a = eventPasser.getLatencies();
    for(i=0; i<a.length; i++){
      arrayToMerge.push(a[i]);
    }
  }else{
    b = eventPasser.getEvents();
    for(i=0; i<b.length; i++){
      arrayToMerge.push(b[i]);
    }
  }
}

// function to encode the user interaction array into a csv file
function toCSV(arrayToLog, isLatency){
  var csvContent = "data:text/csv;charset=utf-8,";
  $("#generator").click(function(){
    // stops the program from recording interactions
    proceed = false;
    //retrieve any interactions manually recorded
    mergeCollections(arrayToLog, isLatency);
    arrayToLog.forEach(function(infoArray){
      var dataString = infoArray.join(",");
      csvContent += dataString+ "\n";
    });
    var encodedUri = encodeURI(csvContent);
    var a = document.createElement('a');
    a.href = encodedUri;
    a.target = '_blank';
    var name = !isLatency ? 'events' : (INIT.status() == true) ? 'latency-tracking-interactions' : 'latency-not-tracking-interactions';
    a.download = name + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  });
  return csvContent;
}
