// Scroll animations and micro-interactions
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('show', 'visible');
        }, index * 100); // Stagger animation
      }
    });
  }, observerOptions);

  // Observe all animation elements
  document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-rotate-in, .animate-scale-in, .scroll-reveal').forEach(el => {
    observer.observe(el);
  });

  // Parallax effect for hero elements
  const parallaxElements = document.querySelectorAll('.parallax-slow');
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    parallaxElements.forEach(el => {
      el.style.transform = `translateY(${rate}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);

  // Magnetic cursor effect for buttons
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });

  // Glitch effect on hover for specific elements
  const glitchElements = document.querySelectorAll('.glitch-on-hover');

  glitchElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.classList.add('glitch-effect');
    });

    el.addEventListener('mouseleave', () => {
      setTimeout(() => {
        el.classList.remove('glitch-effect');
      }, 2000);
    });
  });

  // Dynamic border animation
  const animatedBorders = document.querySelectorAll('.interactive-border');

  animatedBorders.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.borderColor = 'var(--accent-primary)';
    });

    el.addEventListener('mouseleave', () => {
      el.style.borderColor = 'var(--border-heavy)';
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});