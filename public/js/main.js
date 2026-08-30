document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      const isOpen = navList.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when clicking a link
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Newsletter success message
  if (window.location.hash === '#newsletter-success') {
    const msg = document.getElementById('newsletter-success-msg');
    if (msg) {
      msg.style.display = 'block';
      msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Clean up the URL hash without triggering navigation
      history.replaceState(null, '', window.location.pathname);
    }
  }

  // --- Viewport Reveal Scroll Animations (GPU-Accelerated Intersection Observer) ---
  const revealElements = document.querySelectorAll('.viewport-reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Animates once
        }
      });
    }, {
      threshold: 0.05, // Trigger when 5% of element is visible
      rootMargin: '0px 0px -40px 0px' // Adjust trigger offset slightly
    });

    revealElements.forEach(el => {
      // Add initial viewport-reveal state immediately if it doesn't already have it
      el.classList.add('viewport-reveal');
      revealObserver.observe(el);
    });
  }

  // --- Dog Inquiry Modal Dialog Handling ---
  const inquiryDialog = document.getElementById('inquiry-dialog');
  const openInquiryBtn = document.getElementById('open-inquiry-btn');
  const closeInquiryBtn = document.getElementById('close-inquiry-btn');
  const successCloseBtn = document.getElementById('success-close-btn');
  const inquiryForm = document.getElementById('inquiry-form');
  const formContainer = document.getElementById('dialog-form-container');
  const successContainer = document.getElementById('dialog-success-container');

  if (inquiryDialog) {
    // Open Dialog
    if (openInquiryBtn) {
      openInquiryBtn.addEventListener('click', () => {
        // Reset dialog view to form
        if (formContainer && successContainer) {
          formContainer.style.display = 'block';
          successContainer.style.display = 'none';
        }
        if (inquiryForm) {
          inquiryForm.reset();
        }
        inquiryDialog.showModal();
      });
    }

    // Close Dialog Buttons
    const closeDialog = () => {
      inquiryDialog.close();
    };

    if (closeInquiryBtn) {
      closeInquiryBtn.addEventListener('click', closeDialog);
    }
    if (successCloseBtn) {
      successCloseBtn.addEventListener('click', closeDialog);
    }

    // Close Dialog by clicking on the backdrop
    inquiryDialog.addEventListener('click', (e) => {
      const rect = inquiryDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        inquiryDialog.close();
      }
    });

    // Form submission inside Dialog using AJAX (fetch)
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Retrieve form fields manually to support JSON submission
        const nameInput = document.getElementById('inquiry-name');
        const emailInput = document.getElementById('inquiry-email');
        const msgInput = document.getElementById('inquiry-message');
        const subjectInput = inquiryForm.querySelector('input[name="subject"]');

        const data = {
          name: nameInput ? nameInput.value : '',
          email: emailInput ? emailInput.value : '',
          subject: subjectInput ? subjectInput.value : 'Adoption Inquiry',
          message: msgInput ? msgInput.value : ''
        };

        // Submit via AJAX
        try {
          const response = await fetch(inquiryForm.action, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            // Show Success Container
            if (formContainer && successContainer) {
              formContainer.style.display = 'none';
              successContainer.style.display = 'block';
            }
          } else {
            alert('Something went wrong. Please try submitting again or emailing us directly.');
          }
        } catch (err) {
          console.error('Submission error:', err);
          // If fetch fails, fall back to standard form submit
          inquiryForm.submit();
        }
      });
    }
  }
});
