

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
	count: 10,
	testCount: 0
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
		
		
		
		self.changeLook = function(){
			console.log(eventList);
		};
		
		//console.log(events);
		//checkAuth();
		//Calls the function to display the header section and bio information
		//view.bioDisplay();
		//calls the work experience function to display the work experience information
		//view.workDisplay();
		//calls the projects function to display the projects information
		//view.projectsDisplay();
		//calls the education function to display the education information
		//view.educationDisplay();
		//calls the certification function to display the certification information
		//view.certificationsDisplay();
		//calls the bio.display2 function to display the map and footer
		//view.bioDisplay2();
	 },
	 
	 calendarList: function(){
		  appendPre('Upcoming events:');

          if (eventList.length > 0) {
            for (i = 0; i < eventList.length; i++) {
              var event = eventList[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }
	 }
};

var viewModel = function() {
	'use strict';
	var self = this;    // Sets up 'self' variable to be used for proper scope in functions

  
	// The following are the initialization of oberservables for the knockoutjs methodology
	modelData.pageTitle(modelData.daysOfWeek[modelData.title.getDay()]);  // observable for the title in the header

	console.log(eventList);
	octopus.calendarList();


};

var timer = function() {
	modelData.count=modelData.count-1;
	console.log(modelData.count);
	if (modelData.count <= 0){
		//clearInterval(counter);
		// console.log(viewModel.pageTitle());
		modelData.pageTitle("test " + modelData.testCount++);
		modelData.count = 10;
		return;
	}
};

//This function call initiates the knockoutjs viewModel function and binds it to the web page
$(function() {
    ko.applyBindings(new viewModel());
});


