$(function() {

  var hack_for = '';
  var new_word = '';
  var curr_slide = 0;
  var carousel = [{
    "url": "ocean.jpg",
    "hack_for": "change",
    "color": "#94eac5",
    "button_color": "#a9c1b1"
  }, {
    "url": "forest.jpg",
    "hack_for": "the environment",
    "color": "#a5e279",
    "button_color": "#b4d49d"
  }, {
    "url": "government.jpg",
    "hack_for": "open government",
    "color": "#ff8aa7",
    "button_color": "#E39FAE"
  }, {
    "url": "library.jpg",
    "hack_for": "education",
    "color": "#fe944e",
    "button_color": "#EBA575"
  }, {
    "url": "backpack.jpg",
    "hack_for": "new adventures",
    "color": "#ff7b7b",
    "button_color": "#ff9d9d"
  }, {
    "url": "scenic.jpg",
    "hack_for": "nature",
    "color": "#c9af96",
    "button_color": "#BAAC9E"
  }, {
    "url": "street.jpg",
    "hack_for": "better cities",
    "color": "#ff9756",
    "button_color": "#ffa973"
  }];

  changeSlide();

  function changeSlide() {
    console.log('changing slide');
    var slide = carousel[curr_slide];
    $('.hero .underscore').addClass('blink');
    $('.hero').css('background-image', 'url(img/splash/' + slide.url + ')');
    setTimeout(function() {
      $('.hero .underscore').removeClass('blink');
      removeLetter();
    }, 4000);
    curr_slide = (curr_slide + 1) % carousel.length;
  }

  function removeLetter() {
    hack_for = $('.hero-msg .hack-for').html();

    setTimeout(function() {
      hack_for = hack_for.slice(0, -1);
      $('.hero-msg .hack-for').html(hack_for);
      if (hack_for.length > 0) {
        removeLetter();
      } else {
        var slide = carousel[curr_slide];
        $('.hero').css('background-image', 'url(img/splash/' + slide.url + ')');
        $('.hero .underscore').css('color', slide.color);
        $('.hero button').css('background-color', slide.button_color);
        new_word = slide.hack_for;
        addLetter();
        cycleImages();
      }
    }, 70);
  }

  function addLetter() {
    console.log(new_word);
    var letter = new_word.slice(0, 1);
    var curr_word = $('.hero-msg .hack-for').html();
    new_word = new_word.slice(1, new_word.length);

    setTimeout(function() {
      console.log(curr_word, letter);
      $('.hero-msg .hack-for').html(curr_word + letter);

      if (new_word.length > 0) {
        addLetter();
      } else {
        changeSlide();
      }
    }, 70);
  }

  function cycleImages() {
    var $active = $('.hero .active');
    var $next = ($('.hero .active').next('.img').length > 0) ? $('.hero .active').next('.img') : $('.hero .img:first');
    $next.css('z-index', 2); //move the next image up the pile
    $active.fadeOut(1000, function() { //fade out the top image
      $active.css('z-index', 1).show().removeClass('active'); //reset the z-index and unhide the image
      $next.css('z-index', 3).addClass('active'); //make the next image the top one
    });
  }

  $(window).load(function() {
    $('.hero').fadeIn(1500);
  });

  $(window).scroll(function() {
    if ($(document).scrollTop() > 0) {
      $('nav').addClass('condensed');
    } else {
      $('nav').removeClass('condensed');
    }
  });

  $('.scrollto').click(function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(href).offset().top - 70
    }, 1000);
  });

  // Subscription form notifications
  $(function () {
    $("#subscribe-form").submit(function(e) {
      var $input = $('.subscribe-msg');
        if(!$input.is(':empty')) {
          $('.subscribe-msg').stop(true);
        }
        e.preventDefault();
        e.stopImmediatePropagation();

        var email = $("input#subscribe-email").val();

        if (email == "") {
          $(".subscribe-msg").stop(true).html('<i class="fa fa-warning"></i> You must enter a valid email address.');
          $("input#subscribe-email").focus();
        } else if (!validateEmail(email)) {
          $(".subscribe-msg").stop(true).html('<i class="fa fa-warning"></i> Email address is not valid.');
          $("input#subscribe-email").focus();
        } else {
          $(".lj-subscribe-message").html('<i class="fa fa-check"></i> Thanks! We\'ll keep you in the loop!');
          $('input#subscribe-email').val('');
        }
     });
  });

  // Email validation
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

});
