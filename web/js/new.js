document.addEventListener("DOMContentLoaded", function() {
  var options = {
    defaultDate: new Date().setHours(0, 0, 0),
    setDefaultDate: false
  };
  var elems = document.querySelector(".datepicker");
  var instance = M.Datepicker.init(elems, options);
  // instance.open();
});

document.addEventListener("DOMContentLoaded", function() {
  var options = {};
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, options);
});

document.addEventListener("DOMContentLoaded", function() {
  var options = {
    direction: "buttom" //delete
  };
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems, options);
});

/* Carrusel*/
document.addEventListener("DOMContentLoaded", function() {
  var options = {};
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, options);
});

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".slider");
  var instances = M.Slider.init(elems, options);
});

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(elems, options);
});
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems, options);
});
$(document).ready(function(){
  $('.slider').slider();
});
$(document).ready(function(){
  $('.parallax').parallax();
});

$(".dropdown-trigger").dropdown();



$(document).ready(function(){
  $('.sidenav').sidenav();
});

$(document).ready(function(){
  $('.materialboxed').materialbox();
});


var mySwiper = new Swiper(".swiper-container", {
  direction: "vertical",
  loop: true,
  pagination: ".swiper-pagination",
  grabCursor: true,
  speed: 1000,
  paginationClickable: true,
  parallax: true,
  autoplay: false,
  effect: "slide",
  mousewheelControl: 1
});


const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});

// Slider
const slider = document.querySelector('.slider');
M.Slider.init(slider, {
    indicators: false,
    height: 500,
    transition: 500,
    interval: 6000
  });

// Scrollspy
const ss = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(ss, {});

// Material Boxed
const mb = document.querySelectorAll('.materialboxed');
M.Materialbox.init(mb, {});

// Auto Complete
const ac = document.querySelector('.autocomplete');
M.Autocomplete.init(ac, {
    data: {
      "Aruba": null,
      "Cancun Mexico": null,
      "Hawaii": null,
      "Florida": null,
      "California": null,
      "Jamaica": null,
      "Europe": null,
      "The Bahamas": null,
    }
  });
