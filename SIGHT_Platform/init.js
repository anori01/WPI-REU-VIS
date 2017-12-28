var INIT = INIT || (function(){
    var _args = {}; 
    var _active = true;
    var _testing = false; //used specifically for testing program latency


    return {
        // CONFIGURATION SETTINGS
        // adds events to be ignored
        ignore : function(Args){
            _args = Args; 
        },
        // returns all events to be ignored
        events : function(){
            return _args;
        },

        // ACTIVATION STATUS 
        // deactivate event listening
        deactivate : function(){
            _active = false;
        },
        // returns activation status of program
        status : function(){
            return _active;
        },

        // TESTING STATUS
        // enable latency testing
        testLatency : function(){
            _testing = true;
        },
        // return testing status of program
        runningTest : function(){
            return _testing;
        }
    };
}());