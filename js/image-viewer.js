export function initializeImageViewer() {
  const dialog = document.querySelector("#image-dialog");
  if (typeof dialog.showModal !== "function") return;

  const expandedImage = document.querySelector("#expanded-image");
  const viewport = document.querySelector("#image-viewport");
  const sizeButton = document.querySelector("#toggle-image-size");
  let opener;

  function setOriginalSize(original) {
    viewport.classList.toggle("is-original", original);
    sizeButton.setAttribute("aria-pressed", String(original));
    sizeButton.textContent = original ? "Ajustar à tela" : "Ver em tamanho original";
    viewport.scrollTo(0, 0);
  }

  sizeButton.addEventListener("click", () => {
    setOriginalSize(sizeButton.getAttribute("aria-pressed") !== "true");
  });
  dialog.addEventListener("close", () => {
    setOriginalSize(false);
    opener?.focus({ preventScroll: true });
  });
  document.querySelectorAll("[data-zoom]").forEach((link) => {
    link.addEventListener("click", (event) => {
      // Preserva a navegação nativa com teclas modificadoras.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const image = link.querySelector("img");
      expandedImage.src = link.href;
      expandedImage.alt = image.alt;
      expandedImage.width = image.dataset.originalWidth || image.getAttribute("width");
      expandedImage.height = image.dataset.originalHeight || image.getAttribute("height");
      opener = link;
      setOriginalSize(false);
      dialog.showModal();
    });
  });
  document.querySelector("#close-image").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
