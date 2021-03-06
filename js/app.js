

// modelData contains the global base variables for the web application
var modelData = {
  //title: 'SOMEDAY',         // Title variable for the entire app; placed in the header
	title: new Date(),
	pageTitle: ko.observable(),
	pageTime: ko.observable(),
	time: {
		hour: 0,
		minute: 0,
		ampm: ""
	},
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
		  //appendPre('Upcoming events:');
		  $("#rtitle").append("<div class='blockAll events'>Upcoming events:</div>");
		  $("#rtitle").attr("style","display: inline");
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
			  //console.log(whenYear + " " + whenMonth + " " + whenDay)
			  var eventDate = new Date(whenYear, whenMonth - 1, whenDay);
			  var whenColon = ":";
			  if (!event.start.dateTime) {
                var whenHour = "All Day";
				var whenMin = "";
				var whenColon = "";
              } else {
				var whenHour = when.slice(11, 13);
				var whenMin = when.slice(14, 16);
				console.log(whenHour);
				if (whenHour < 12) {
					whenMin = whenMin + " am";
					if (whenHour === 0) {
						whenHour = 12;
					}
					if (whenHour < 10) {
						whenHour = whenHour.slice(1);
					}
					//whenHour = whenHour + ":";
					console.log(whenHour);
				} else {
					if (whenHour > 12) {
						whenHour = whenHour - 12;
					}
					whenMin = whenMin + " pm";
					//whenHour = whenHour+ ":";
				}
			  }
			  var eventSummary = event.summary;
			  if (event.summary.length > 31) {
				  eventSummary = eventSummary.slice(0, 29) + "...";
			  }
			  while(eventSummary.length < 32) {
				  eventSummary = eventSummary + " ";
			  }
			  
			  //console.log(eventDate);
			  //console.log(eventDate.getDay())
			  //console.log(when);
			  //appendPre(eventSummary + '(' + modelData.daysOfWeek[eventDate.getDay()] + ", " + modelData.daysOfMonth[eventDate.getMonth()] + " " + whenDay + " -- " + whenHour + whenMin + ')')
              $("#r0" + i).append("<div class='blockSummary events'>" + eventSummary + "</div>");
			  $("#r0" + i).append("<div class='blockTime events'>" + whenHour + whenColon + whenMin + "</div>");
			  
			  modelData.title = new Date();
			  //console.log(modelData.daysOfMonth[eventDate.getMonth()]);
			  //console.log(modelData.daysOfMonth[modelData.title.getMonth()]); 
			  console.log(+whenDay + 1);
			  console.log(modelData.title.getDate() + 2); 
			  
	//		  If (modelData.daysOfMonth[eventDate.getMonth()] === modelData.daysOfMonth[modelData.title.getMonth()]) {
			  if (modelData.daysOfMonth[eventDate.getMonth()] === modelData.daysOfMonth[modelData.title.getMonth()]) {
				  console.log("the month is now!");
					if (modelData.title.getDate() === +whenDay) {
						$("#r0" + i).append("<div class='blockDate events'>" + "**Today!**" + "</div>");
					}					
					if (modelData.title.getDate() + 1 === +whenDay) {
						$("#r0" + i).append("<div class='blockDate events'>" + "Tomorrow" + "</div>");
					}
					if (modelData.title.getDate() !== +whenDay && modelData.title.getDate() + 1 !== +whenDay) {
						$("#r0" + i).append("<div class='blockDate events'>" + modelData.daysOfWeek[eventDate.getDay()] + ", " + modelData.daysOfMonth[eventDate.getMonth()] + " " + whenDay + "</div>");
					}
 			  } else {	
				$("#r0" + i).append("<div class='blockDate events'>" + modelData.daysOfWeek[eventDate.getDay()] + ", " + modelData.daysOfMonth[eventDate.getMonth()] + " " + whenDay + "</div>");
			  }
			  $("#r0" + i).attr("style","display: inline");
			  if (i == eventList.length - 1) {
				$("<br><br>").insertAfter("#r0" + i);
				//$("#r0" + i).append("<br><br>");
			  }
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
	//modelData.pageTitle("Today is " + modelData.daysOfWeek[modelData.title.getDay()] + ", " + modelData.daysOfMonth[modelData.title.getMonth()] + " " + modelData.title.getDate());  // observable for the title in the header
	modelData.pageTitle(modelData.daysOfWeek[modelData.title.getDay()] + ", " + modelData.daysOfMonth[modelData.title.getMonth()] + " " + modelData.title.getDate());  // observable for the title in the header	

	console.log(eventList);
	console.log("here");
	//octopus.calendarList();


};

var timer = function() {
	modelData.count=modelData.count-1;
	//console.log(modelData.count);
	modelData.counterText("Reload in " + modelData.count + " secs");
	modelData.title = new Date();
	modelData.time.hour = modelData.title.getHours();
	modelData.time.minute = modelData.title.getMinutes();
	if (modelData.time.hour < 12) {
		modelData.time.ampm = " am";
		if (modelData.time.hour === 00) {
			modelData.time.hour = 12;
		}
		if (modelData.time.hour < 10) {
			//modelData.time.hour = modelData.time.hour.slice(1);
			modelData.time.hour = +modelData.time.hour;
		}
	} else {
		if (modelData.time.hour !== 12) {
			modelData.time.hour = modelData.time.hour - 12;
		}
		modelData.time.ampm = " pm";
	}
	if (modelData.time.minute < 10) {
		modelData.time.minute = "0" + modelData.time.minute;
	}
	modelData.pageTime(modelData.time.hour + ":" + modelData.time.minute + " " + modelData.time.ampm);
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


