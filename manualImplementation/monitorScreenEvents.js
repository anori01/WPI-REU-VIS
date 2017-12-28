  function monitorEvents(element) {
    // number of iterations - for simplicity's sake, this just records the first 500 user interactions
    var iters = 0;
    var userInteractions = [];
    var log = function(e) { 
      if(iters < 500){
        console.log(e.type);
        var date = new Date();
          // logs the type of event, time that it happened, and the data that it happened
          userInteractions.push([e.type, ""+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+":"+date.getMilliseconds(),""+date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()]);
          iters ++;
      }
    };
    // finds every eventListener in the Javascript file and puts them in events[]  
    var events = [];    
    for(var i in element) {
      if(i.startsWith("on")){
        events.push(i.substr(2));
      } 
    }

    // for each eventListener, add another one that is going to log the interaction to the console
    events.forEach(function(eventName) { 
      element.addEventListener(eventName, log); 
    }); 
    // returns the interactions with the webpage as an array of arrays
    // ** a possiblity of sending this to a server would be to stringify it using JSON and then shoot it to 
    //    a server using PHP **
    return userInteractions;
  }
  var user = monitorEvents(window);
