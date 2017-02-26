var timers = [];

$(document).ready(function() {
  $(".slider").each(function() {
    var obj = $(this);
    $(obj).append("<div class='slider_nav'></div>");
    $(obj).find(".slider_unit").each(function() {
      $(obj).find(".slider_nav").append("<span class='slider_control' rel='"+$(this).index()+"'></span>");
      $(this).addClass("slider_unit__"+$(this).index());
    });
    $(obj).find(".slider_control").first().addClass("slider_control__on");
    calcWidth(obj);
  });
});

$(window).resize(function() {
  clearTimers();
  $(".slider").each(function() {
    calcWidth($(this));
  });
});

function clearTimers() {
  timers.forEach(function(timer, i, arr) {
    clearInterval(timer);
  });
}

function nextFrame(slider) {
  var current = $(slider).find(".slider_control__on").attr("rel");
  var max = $(slider).find(".slider_nav").find(".slider_control").length;
  var next = (+current + 1 < max) ? +current + 1 : 0;
  $(slider).find(".slider_control").removeClass("slider_control__on");
  $(slider).find('.slider_control[rel="'+next+'"]').addClass("slider_control__on");
  sliderJS(next, slider);
}

function calcWidth(slider) {
  var trigger_width = $(slider).data("slider-max-width")
  if (!$.isNumeric(trigger_width) || $(window).width() < trigger_width) {
    var w = Math.floor($(slider).width());
    var wm = Math.ceil($(slider).find(".slider_unit").width(w).outerWidth(true));
    $(slider).find(".slider_wrap").width($(slider).find(".slider_unit").length * wm);
    var frame = $(slider).find(".slider_control__on").attr("rel");
    sliderJS(frame, slider);
    timers.push(setInterval(function() {
      nextFrame(slider);
    }, 3000));
  } else {
    $(slider).find(".slider_wrap").removeAttr("style");
    $(slider).find(".slider_unit").removeAttr("style");
  }
}

function sliderJS(obj, sl) {
  var wrap = $(sl).find(".slider_wrap");
  var bl = $(sl).find(".slider_unit.slider_unit__"+obj);
  var step = $(bl).outerWidth(true);
  $(wrap).css("margin-left", -step*obj);
}
$(document).on("click", ".slider .slider_nav .slider_control", function() {
  var sl = $(this).closest(".slider");
  $(sl).find(".slider_control").removeClass("slider_control__on");
  $(this).addClass("slider_control__on");
  var obj = $(this).attr("rel");
  sliderJS(obj, sl);
  return false;
});
