args = [ 
  { minSlides : 1, maxSlides : 1, slideWidth : 800, slideMargin : 0, pager : false, auto : true, autoStart : true }
];

$(document).ready(function () {
  $('.event-box .event_item').each(function () {
    $this = $(this);
    t = $this.find('.msl_event_time');
   // t.html( '<span class="date">' + t.text().match(/[0-9]+/g)[0] + '</span><span class="month">' + t.text().match(/\b[A-z]{3}/g)[0] + '</span>' );
  });
});