var CustomizeList = function(){
    this.oldList = [];
    this.newList = [];


    ////////////////////////////////////////////////
    // Events listening interface
    //

    this.allHandlers = new Array();
    
    /**
     * Dispatch a new event to all the event listeners of a given event type
     */
    this.dispatchTimelineEvent = function(type, details){
        var newEvent = new TimelineEvent(type, details);
        if (this.allHandlers[type]){
            for (var i in this.allHandlers[type]){
                this.allHandlers[type][i](newEvent);
            }
        }
    }

    /**
     * Add a new event listener for a given event type
     * the parameter 'handler' has to be a function with one parameter which is an event object
     */
    this.addEventListener = function(eventType, handler){
        if (!this.allHandlers[eventType])
            this.allHandlers[eventType] = [];
        this.allHandlers[eventType].push(handler);
    }

}