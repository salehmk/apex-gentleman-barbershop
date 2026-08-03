/**
 * APEX GENTLEMAN - BARBER SHOP & GROOMING LOUNGE
 * Core Client Interactivity (Vanilla JS - Zero Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. STICKY HEADER & SCROLL BEHAVIOR
     ========================================================================== */
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow & background blur on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     3. SERVICES CATEGORY TAB FILTERING
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all tabs
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-tab');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     4. INTERACTIVE BEFORE & AFTER SLIDER (TOUCH & MOUSE DRAG)
     ========================================================================== */
  const sliderContainer = document.getElementById('before-after-slider');
  const afterImage = sliderContainer ? sliderContainer.querySelector('.image-after') : null;
  const sliderHandle = sliderContainer ? sliderContainer.querySelector('.slider-handle') : null;

  if (sliderContainer && afterImage && sliderHandle) {
    let isDragging = false;

    const setSliderPosition = (xPosition) => {
      const containerRect = sliderContainer.getBoundingClientRect();
      let offsetX = xPosition - containerRect.left;

      // Clamp between 0% and 100%
      if (offsetX < 0) offsetX = 0;
      if (offsetX > containerRect.width) offsetX = containerRect.width;

      const percentage = (offsetX / containerRect.width) * 100;
      afterImage.style.width = `${percentage}%`;
      sliderHandle.style.left = `${percentage}%`;
    };

    // Mouse Events
    sliderContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Events for Mobile & Tablet
    sliderContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      setSliderPosition(e.touches[0].clientX);
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  /* ==========================================================================
     5. INTERSECTION OBSERVER ANIMATIONS
     ========================================================================== */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .metric-card, .gallery-card, .contact-info-card, .map-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    fadeObserver.observe(el);
  });

  // Global handler for visible elements
  document.addEventListener('scroll', () => {
    document.querySelectorAll('.service-card.visible, .metric-card.visible, .gallery-card.visible, .contact-info-card.visible, .map-card.visible').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });

});
