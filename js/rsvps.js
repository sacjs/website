void function(){
  'use strict';
  var upcomingUrl = 'https://api.meetup.com/2/events?member_id=13188390&offset=0&format=json&limited_events=False&photo-host=public&page=200&fields=&order=time&desc=false&status=upcoming&sig_id=13188390&sig=b95cc8677b14087f7797814774cb19dccabc6f5b'

  function injectRSVPs(event) {
    var count = event.yes_rsvp_count;
    var el = document.querySelector('[meetup-id="' + event.id + '"] .RsvpButton--promo');
    if(el) {
      return el.innerHTML = 'Join ' + count + ' other' + (count === 1 ? '' : 's');
    }
  }

  function parseEvents(response) {
    if(response.results && response.results.length) {
      if(response.results.some(injectRSVPs)) {
        return showRsvpButton();
      }
      return showThanksForComing();
    }
    showRsvpButton();
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
    var el = document.querySelector('.LeftPane--thanks');
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
