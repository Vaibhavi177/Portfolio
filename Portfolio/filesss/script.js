
$(document).ready(function() {
  // Cache jQuery selectors for better performance
  var $window = $(window);
  var $headerArea = $(".header-area");
  var $headerLinks = $(".header ul li a");
  var $sections = $("section");
  var $htmlBody = $("html, body");
  var $form = document.forms['submitToGoogleSheet'];
  var $msg = $("#msg");

  // Function to update the active section in the header
  function updateActiveSection() {
      var scrollPosition = $window.scrollTop();
      
      // Check if scroll position is at the top of the page
      if (scrollPosition === 0) {
          $headerLinks.removeClass("active");
          $(".header ul li a[href='#home']").addClass("active");
          return;
      }

      // Iterate through each section and update the active class in the header
      $sections.each(function() {
          var $this = $(this);
          var target = $this.attr("id");
          var offset = $this.offset().top;
          var height = $this.outerHeight();

          if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
              $headerLinks.removeClass("active");
              $(".header ul li a[href='#" + target + "']").addClass("active");
          }
      });
  }

  // Sticky header on scroll
  $window.scroll(function() {
      if ($(this).scrollTop() > 1) {
          $headerArea.addClass("sticky");
      } else {
          $headerArea.removeClass("sticky");
      }
      
      updateActiveSection();
  });

  // Smooth scroll for header links
  $headerLinks.click(function(e) {
      e.preventDefault();
      
      var target = $(this).attr("href");
      
      if ($(target).hasClass("active-section")) {
          return;
      }
      
      if (target === "#home") {
          $htmlBody.animate({ scrollTop: 0 }, 500);
      } else {
          var offset = $(target).offset().top - 40;
          $htmlBody.animate({ scrollTop: offset }, 500);
      }

      $headerLinks.removeClass("active");
      $(this).addClass("active");
  });

  // Initialize ScrollReveal animations
  ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
  });
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });

  // Contact form submission to Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  
  $form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      fetch(scriptURL, { method: 'POST', body: new FormData($form) })
          .then(response => {
              $msg.html("Message sent successfully");
              setTimeout(() => { $msg.html(""); }, 5000);
              $form.reset();
          })
          .catch(error => console.error('Error!', error.message));
  });
});

  

 