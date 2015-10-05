

// modelData contains the global base variables for the web application
var modelData = {
  //title: 'SOMEDAY',         // Title variable for the entire app; placed in the header
	title: new Date(),
	pageTitle: ko.observable(),
	daysOfWeek: [
		"Sunday", 
		"Monday", 
		"Tuesday", 
		"Wednesday", 
		"Thursday", 
		"Friday", 
		"Saturday"
		],
	daysOfMonth: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
		],
	count: 300,
	testCount: 0,
	counterText: ko.observable()
};

var octopus = {
	 
	 
	 init: function(){
		var self2 = this;
		var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
		//var testCount = 0;
		
		console.log("octopus");
		console.log(eventList);
		console.log(modelData.title.getDay());
		modelData.title = modelData.daysOfWeek[modelData.title.getDay()];
		console.log(modelData.title);
		
		octopus.calendarList();
		

	 },
	 
	 calendarList: function(){
		  appendPre('Upcoming events:');
		  console.log(eventList.length);
          if (eventList.length > 0) {
            for (i = 0; i < eventList.length; i++) {
              var event = eventList[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              var whenYear = when.slice(0,4);
			  var whenMonth = when.slice(5,7);
			  var whenDay = when.slice(8,10);
			  console.log(whenYear + " " + whenMonth + " " + whenDay)
			  var eventDate = new Date(whenYear, whenMonth, whenDay);
			  if (!event.start.dateTime) {
                var whenHour = "All Day";
				var whenMin = "";
              } else {
				var whenHour = when.slice(11, 13);
				var whenMin = when.slice(14, 16);
				if (whenHour < 12) {
					whenMin = whenMin + "AM";
					if (whenHour === "00") {
						whenHour = "12";
					}
					if (whenHour < 10) {
						whenHour = whenHour.slice(1);
					}
					whenHour = whenHour+ ":";
				} else {
					if (whenHour !== 12) {
						whenHour = whenHour - 12;
					}
					whenMin = whenMin + "PM";
					whenHour = whenHour+ ":";
				}
			  }
			  var eventSummary = event.summary;
			  if (event.summary.length > 25) {
				  eventSummary = eventSummary.slice(0, 23) + "...";
			  }
			  while(eventSummary.length < 26) {
				  eventSummary = eventSummary + " ";
			  }
			  console.log(eventDate);
			  console.log(eventDate.getDay())
			  console.log(when);
			  appendPre(eventSummary + '(' + modelData.daysOfWeek[eventDate.getDay()] + ", " + modelData.daysOfMonth[eventDate.getMonth()] + " " + whenDay + " -- " + whenHour + whenMin + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }
	 },
	 
	 changeColor: function(){
		 
		 if (modelData.title.getHours() < 8 || modelData.title.getHours() > 9){
			 
		 }
		 
	 }
};

var viewModel = function() {
	'use strict';
	var self = this;    // Sets up 'self' variable to be used for proper scope in functions

  
	// The following are the initialization of oberservables for the knockoutjs methodology
	modelData.pageTitle("Today is " + modelData.daysOfWeek[modelData.title.getDay()] + ", " + modelData.daysOfMonth[modelData.title.getMonth()] + " " + modelData.title.getDate());  // observable for the title in the header
	
	console.log(eventList);
	console.log("here");
	//octopus.calendarList();


};

var timer = function() {
	modelData.count=modelData.count-1;
	//console.log(modelData.count);
	modelData.counterText("Reload in " + modelData.count + " secs");
	if (modelData.count <= 0){
		//clearInterval(counter);
		// console.log(viewModel.pageTitle());
		//modelData.pageTitle("test " + modelData.testCount++);
		window.location.reload();
		modelData.count = 10;
		return;
	}
};

//This function call initiates the knockoutjs viewModel function and binds it to the web page
$(function() {
    ko.applyBindings(new viewModel());
});


