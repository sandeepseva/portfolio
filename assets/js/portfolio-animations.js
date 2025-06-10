'use strict';

document.addEventListener('DOMContentLoaded', function() {
  const projectItems = document.querySelectorAll('[data-filter-item]');

  // Function to check if an element is in the viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to add animation class with delay
  function animateProjectItems() {
    projectItems.forEach((item, index) => {
      // Only animate if the portfolio page is active and the item is not already animated
      const portfolioPage = document.querySelector('[data-page="portfolio"]');
      if (portfolioPage && portfolioPage.classList.contains('active') && !item.classList.contains('animated')) {
         // Check if item is in viewport before animating (optional, for initial load)
         // if (isInViewport(item)) { // Decided against this for simplicity in initial load
            setTimeout(() => {
              item.style.opacity = 1;
              item.style.transform = 'scale(1)';
              item.classList.add('animated'); // Mark as animated
            }, index * 100); // Stagger delay of 100ms
         // }
      }
    });
  }

  // Initial check when the page loads
  // We need to wait for the portfolio page to potentially become active via navigation
  // A simple way is to observe the page elements or hook into the navigation logic
  // For now, let's rely on the page navigation logic provided in script.js

  // Assuming there's a mechanism in script.js that adds 'active' class to the current page article
  // We can listen for changes that indicate the portfolio page is active

  // A more robust approach would involve IntersectionObserver for scroll-into-view animations
  // But for a simpler staggered entry on page load/navigation, this might suffice depending on existing script.js

  // Let's add a mutation observer to watch for the 'active' class on the portfolio page
  const portfolioPage = document.querySelector('[data-page="portfolio"]');
  if (portfolioPage) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (portfolioPage.classList.contains('active')) {
            animateProjectItems();
          } else {
             // Optional: reset animation state when leaving the page if needed
             // projectItems.forEach(item => { item.classList.remove('animated'); item.style.opacity = 0; item.style.transform = 'scale(0.95)'; });
          }
        }
      });
    });

    observer.observe(portfolioPage, { attributes: true });

    // Also run on initial load if the portfolio page is already active
    if (portfolioPage.classList.contains('active')) {
        animateProjectItems();
    }

  }

});

// We also need to ensure the initial state in CSS sets opacity and transform for the animation
// and remove the general animation on .project-item.active in style.css 