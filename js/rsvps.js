void function(){
  'use strict';
  var emptyAry = [];
  var upcomingUrl = 'http://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=The-Sacramento-Javascript-Meetup&desc=false&offset=0&format=json&page=200&fields=&sig_id=13188390&sig=9041dbac9b59eb70fdc420fb721373c947af147f';

  function injectRSVPs(event) {
    var count = event.yes_rsvp_count;
    emptyAry.forEach.call(
      document.querySelectorAll('[meetup-id="' + event.id + '"] .RsvpButton--promo'),
      function(el) {
        el.innerHTML = 'Join ' + count + ' other' + (count === 1 ? '' : 's');
      }
    );
  }

  function parseEvents(response) {
    response.results.forEach(injectRSVPs);
  }

  function handleXhrError() {
    // No-op
  }

  $.ajax({ dataType: 'jsonp', url: upcomingUrl })
    .done(parseEvents)
    .fail(handleXhrError);
}();
