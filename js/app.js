

// modelData contains the global base variables for the web application
var modelData = {
  title: 'SOMEDAY',         // Title variable for the entire app; placed in the header
};



var viewModel = function() {
  'use strict';
  var self = this;    // Sets up 'self' variable to be used for proper scope in functions

  // The following are the initialization of oberservables for the knockoutjs methodology
  self.pageTitle = ko.observable(modelData.title);  // observable for the title in the header

  self.changeLook = function(){
    console.log(eventList);
  };

};

// This function call initiates the knockoutjs viewModel function and binds it to the web page
$(function() {
    ko.applyBindings(new viewModel());
});