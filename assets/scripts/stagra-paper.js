(function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('#site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  const copyButton = document.querySelector('#copy-citation');
  const citation = document.querySelector('#citation-text');
  const copyStatus = document.querySelector('#copy-status');
  if (copyButton && citation && copyStatus) {
    copyButton.addEventListener('click', async function () {
      const text = citation.innerText;
      try {
        await navigator.clipboard.writeText(text);
        copyStatus.textContent = 'BibTeX copied to clipboard.';
      } catch (error) {
        copyStatus.textContent = 'Select the citation text to copy it manually.';
      }
    });
  }
})();
