export function initializeRevealAnimations() {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const elements = [...document.querySelectorAll("[data-reveal]")];
  let observer;
  try {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-pending");
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => {
      element.classList.add("reveal-pending");
      observer.observe(element);
    });
  } catch {
    observer?.disconnect();
    elements.forEach((element) => element.classList.remove("reveal-pending"));
  }
}
