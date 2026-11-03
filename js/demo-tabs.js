export function initializeDemoTabs() {
  const tabList = document.querySelector(".tabs");
  const tabs = [...tabList.querySelectorAll('[role="tab"]')];

  function selectTab(index, shouldFocus = false) {
    tabs.forEach((tab, position) => {
      const isSelected = position === index;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !isSelected;
    });
    if (shouldFocus) tabs[index].focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(index));
    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      selectTab(nextIndex, true);
    });
  });
  document.querySelectorAll("[data-demo-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const index = tabs.findIndex((tab) => tab.id === link.dataset.demoTarget);
      if (index < 0) return;
      selectTab(index);
      const panel = document.getElementById(tabs[index].getAttribute("aria-controls"));
      panel.focus({ preventScroll: true });
    });
  });
  const initialIndex = tabs.findIndex((tab) => `#${tab.getAttribute("aria-controls")}` === window.location.hash);
  selectTab(initialIndex >= 0 ? initialIndex : 0);
  window.addEventListener("hashchange", () => {
    const index = tabs.findIndex((tab) => `#${tab.getAttribute("aria-controls")}` === window.location.hash);
    if (index < 0) return;
    selectTab(index);
    document.getElementById(tabs[index].getAttribute("aria-controls")).scrollIntoView({ block: "start" });
  });
  tabList.hidden = false;
}
