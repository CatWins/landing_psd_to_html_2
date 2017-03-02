$(document).ready(function() {
  $('.menu-header_toggle').click(function(e) {
    $('.menu-header_list').toggleClass('menu-header__active');
    e.preventDefault();
  });
});
