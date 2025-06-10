'use strict';

document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin around the root
    threshold: 0.1 // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element is in the viewport
        const element = entry.target;
        // Check if it's a list item or directly an animated element
        const parentList = element.closest('ul, ol, .project-list'); // Find closest list or project list
        if (parentList) {
            // If it's part of a list, find its index among its siblings
            const siblings = Array.from(parentList.children).filter(child => child.classList.contains('animate-on-scroll'));
            const index = siblings.indexOf(element);
            if (index > -1) {
                 // Apply staggered delay based on index
                 element.style.transitionDelay = `${index * 0.08}s`; // Adjust delay as needed
            }
        } else {
            // If not part of a specific list container, apply no extra delay or a base delay
            element.style.transitionDelay = '0s';
        }

        // Add the animation class to trigger CSS transition
        element.classList.add('is-visible');

        // Optionally, stop observing the element after it's animated
        observer.unobserve(element);

      }
       else {
        // Element is not in the viewport (optional: remove class if animating out)
         // entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  // Select the elements to observe
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

  // Start observing each element
  elementsToAnimate.forEach(element => {
    // Set initial state (should also be in CSS)
    element.style.opacity = 0;
    element.style.transform = 'translateY(30px) scale(0.97)'; // Match CSS initial state
    observer.observe(element);
  });

}); 