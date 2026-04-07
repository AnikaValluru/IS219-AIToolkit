const elements = Array.from(document.querySelectorAll('.reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = Math.min(index * 120, 600);
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

elements.forEach((element) => observer.observe(element));
