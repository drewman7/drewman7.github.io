

// modelData contains the global base variables for the web application
var modelData = {
  title: 'SOMEDAY',         // Title variable for the entire app; placed in the header
};



var viewModel = function() {
  'use strict';
  var self = this;    // Sets up 'self' variable to be used for proper scope in functions

  // The following are the initialization of oberservables for the knockoutjs methodology
  self.pageTitle = ko.observable(modelData.title);  // observable for the title in the header



  //*****************************************************************************************
  // Google calandar API Javascript Coe
  // Your Client ID can be retrieved from your project in the Google
  // Developer Console, https://console.developers.google.com

  var CLIENT_ID = '843769279902-c5r8m7millp03vnvnfufnoinooat96lv.apps.googleusercontent.com';

  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

  /**
   * Check if current user has authorized this application.
   */

  //checkAuth();

  self.checkAuth = function() {
    console.log('in function');
    gapi.auth.authorize(
      {
        'client_id': CLIENT_ID,
        'scope': SCOPES,
        'immediate': true
      }, self.handleAuthResult);
  }

  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  self.handleAuthResult = function(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    console.log(authResult);
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      self.loadCalendarApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  }

  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Event} event Button click event.
   */
  self.handleAuthClick = function(event) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      self.handleAuthResult);
    return false;
  }

  /**
   * Load Google Calendar client library. List upcoming events
   * once client library is loaded.
   */
  self.loadCalendarApi = function() {
    gapi.client.load('calendar', 'v3', self.listUpcomingEvents);
  }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  self.listUpcomingEvents = function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) {
      var events = resp.items;
      self.appendPre('Upcoming events:');

      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          console.log(events[i]);
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          self.appendPre(event.summary + ' (' + when + ')')
        }
      } else {
        self.appendPre('No upcoming events found.');
      }

    });
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  self.appendPre = function(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

};

// This function call initiates the knockoutjs viewModel function and binds it to the web page
$(function() {
    ko.applyBindings(new viewModel());
});