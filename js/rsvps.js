void function(){
  'use strict';
  var upcomingUrl = 'http://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=The-Sacramento-Javascript-Meetup&desc=false&offset=0&format=json&page=200&fields=&sig_id=13188390&sig=9041dbac9b59eb70fdc420fb721373c947af147f';

  function injectRSVPs(event) {
    var count = event.yes_rsvp_count;
    var el = document.querySelector('[meetup-id="' + event.id + '"] .RsvpButton--promo');
    el.innerHTML = 'Join ' + count + ' other' + (count === 1 ? '' : 's');
  }

  function parseEvents(response) {
    if(response.results.length) {
      response.results.forEach(injectRSVPs);
      showRsvpButton();
    } else {
      showRsvpButton();
    }
  }

  function handleXhrError() {
    // No-op
  }

  function showRsvpButton() {
    var el = document.querySelector('.RsvpButton');
    if(el) {
      el.classList.add('is-visible');
    }
  }

  function showThanksForComing() {
    var el = document.querySelector('.RsvpButton');
    if(el) {
      el.classList.add('is-visible');
    }
  }

  if(document.querySelector('[tito-event-id]')) {
    showRsvpButton();
  }

  $.ajax({ dataType: 'jsonp', url: upcomingUrl })
    .done(parseEvents)
    .fail(handleXhrError);
}();
