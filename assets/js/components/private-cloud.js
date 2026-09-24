/* Progressive enhancement: placement panels remain visible without JavaScript. */
(() => {
  const root = document.querySelector('.pc-page');
  if (!root) return;
  root.querySelectorAll('[data-pc-tabs]').forEach((group) => {
    const tablist = group.querySelector('.pc-tablist');
    const tabs = Array.from(tablist.querySelectorAll('button'));
    const panels = tabs.map((tab) => document.getElementById(tab.dataset.panel));
    if (panels.some((panel) => !panel)) return;
    const activate = (index, focus = false) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      if (focus) tabs[index].focus();
    };
    tablist.setAttribute('role', 'tablist');
    tabs.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panels[index].id);
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tab.id);
      panels[index].tabIndex = 0;
      tab.addEventListener('click', () => activate(index));
      tab.addEventListener('keydown', (event) => {
        const keys = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 };
        if (!(event.key in keys)) return;
        event.preventDefault();
        activate(keys[event.key], true);
      });
    });
    activate(0);
    group.classList.add('pc-tabs-ready');
    tablist.hidden = false;
  });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('pc-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  root.querySelectorAll('.pc-reveal').forEach((element) => {
    if (element.getBoundingClientRect().top <= window.innerHeight) return;
    element.classList.add('pc-will-reveal');
    observer.observe(element);
  });
  reducedMotion.addEventListener('change', (event) => {
    if (!event.matches) return;
    observer.disconnect();
    root.querySelectorAll('.pc-will-reveal').forEach((element) => element.classList.add('pc-visible'));
  });
})();
