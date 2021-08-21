$(function() {
    var isMobile;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isMobile = true;
  
      // Mobile height fix
      $('.height-fix').each(function() {
        var h = $(this).height();
        $(this).height(h);
      });
    }

    // Sticky Nav on Mobile
    if (isMobile) {
      $('nav').addClass('fixed');
    } else {
      $('nav').addClass('desk');
    }
  
    // NAV POSITION
    var navPos = $('nav').position().top;
    var lastPos = 0;
    var lockTimer;
  
    $(window).on('scroll', function() {
      var pos = $(window).scrollTop();
      var pos2 = pos + 50;
      var scrollBottom = pos + $(window).height();
  
      if (!isMobile) {
        if (pos >= navPos + $('nav').height() && lastPos < pos) {
          $('nav').addClass('fixed');
        }
        if (pos < navPos && lastPos > pos) {
          $('nav').removeClass('fixed');
        }
        lastPos = pos;
      }
  
      // Link Highlighting
      if (pos2 > $('#home').offset().top) {
        highlightLink('home');
      }
      if (pos2 > $('#portfolio').offset().top) {
        highlightLink('portfolio');
      }
      if (pos2 > $('#about').offset().top) {
        highlightLink('about');
      }
      if (
        pos2 > $('#contact').offset().top ||
        pos + $(window).height() === $(document).height()
      ) {
        highlightLink('contact');
      }
  
      // Prevent Hover on Scroll
      clearTimeout(lockTimer);
      if (!$('body').hasClass('disable-hover')) {
        $('body').addClass('disable-hover');
      }
  
      lockTimer = setTimeout(function() {
        $('body').removeClass('disable-hover');
      }, 500);
    });
  
    function highlightLink(anchor) {
      $('nav .active').removeClass('active');
      $('nav')
        .find('[dest="' + anchor + '"]')
        .addClass('active');
    }
  
    // EVENT HANDLERS
    $('.page-link').click(function() {
      var anchor = $(this).attr('dest');
      $('.link-wrap').removeClass('visible');
  
      $('nav span').removeClass('active');
      $('nav')
        .find('[dest="' + anchor + '"]')
        .addClass('active');
  
      $('html, body').animate(
        {
          scrollTop: $('#' + anchor).offset().top
        },
        400
      );
    });
  
    $('.fa-bars').click(function() {
      $('.link-wrap').toggleClass('visible');
    });

    var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        status.innerHTML = "Thanks for your submission!";
        form.reset()
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)

})
