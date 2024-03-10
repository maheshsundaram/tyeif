import { createToast } from "./toast.js";

addEventListener("DOMContentLoaded", () => {
  const Prayer = document.getElementById("prayer");
  const Tyeif = document.getElementById("tyeif");
  const Print = document.getElementById("print");

  const openPrintModal = document.getElementById("openPrintModal");
  const printButton = document.getElementById("printButton");
  const printModal = document.getElementById("printModal");
  const copyToClipboard = document.getElementById("copyToClipboard");
  const copyToast = document.getElementById("copyToast");

  // prettier-ignore
  const fontSizeInput = document.getElementById("fontSizeInput") as HTMLInputElement;

  Prayer?.addEventListener("keyup", (e: KeyboardEvent) => {
    // Remove characters disallowed in Tyeif font
    const text = (e.target as HTMLTextAreaElement).value
      .toLowerCase()
      .replace(/[^a-z\s\.\,\:0-9]/gi, "")
      .split("\n")
      // Preserve line breaks
      .map((line) => (line.length === 0 ? "<br />" : `<p>${line}</p>`))
      .join("");

    // Copy Prayer text to Tyeif input and hidden Print element
    if (Tyeif) Tyeif.innerHTML = text;
    if (Print) Print.innerHTML = text;
  });

  printButton?.addEventListener("click", () => {
    window.print();
  });

  // Open Modal
  openPrintModal?.addEventListener("click", () => {
    printModal?.classList.add("is-active");
  });

  copyToClipboard?.addEventListener("click", async () => {
    if (Tyeif) {
      const blob = new Blob([Tyeif?.innerHTML], { type: "text/html" });
      const data = [new ClipboardItem({ ["text/html"]: blob })];
      await navigator.clipboard.write(data);
    }
    createToast();
  });

  fontSizeInput?.addEventListener("keyup", (e) => {
    const size = (e.target as HTMLInputElement).value;
    if (Print) Print.style.fontSize = `${size}pt`;
  });

  fontSizeInput?.addEventListener("change", (e) => {
    const size = (e.target as HTMLInputElement).value;
    if (Print) Print.style.fontSize = `${size}pt`;
  });

  // Close Modal
  const closeElements =
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || [];

  closeElements.forEach((el) => {
    const t = el.closest(".modal");
    el.addEventListener("click", () => {
      t?.classList.remove("is-active");
    });
  });
});
