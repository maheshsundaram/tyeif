addEventListener("DOMContentLoaded", () => {
  const Prayer = document.getElementById("prayer");
  const Tyeif = document.getElementById("tyeif");
  const Print = document.getElementById("print");
  const NoPrint = document.getElementById("no-print");

  const openPrintModal = document.getElementById("openPrintModal");
  const openSaveModal = document.getElementById("openSaveModal");
  const saveButton = document.getElementById("saveButton");
  const printButton = document.getElementById("printButton");
  const printModal = document.getElementById("printModal");
  const saveModal = document.getElementById("saveModal");

  // prettier-ignore
  const fontSizeInput = document.getElementById("fontSizeInput") as HTMLInputElement;

  Prayer?.addEventListener("keyup", (e: KeyboardEvent) => {
    const text = (e.target as HTMLTextAreaElement).value
      .toLowerCase()
      // Remove characters disallowed in Tyeif font
      .replace(/[^a-z\s\.\,\:0-9]/gi, "")
      .split("\n")
      // Preserve line breaks
      .map((line) =>
        line.length === 0 ? "<br />" : `<p class="prayer-block">${line}</p>`
      )
      .join("");

    // Copy Prayer text to Tyeif input and hidden Print element
    if (Tyeif) Tyeif.innerHTML = text;
    if (Print) Print.innerHTML = text;
  });

  printButton?.addEventListener("click", () => {
    window.print();
  });

  saveButton?.addEventListener("click", async () => {
    if (NoPrint) NoPrint.style.display = "none";
    if (Print) Print.style.display = "block";
    // TODO move to module
    // @ts-expect-error
    await html2pdf()
      .set({
        jsPDF: { unit: "in" },
        margin: 0.5,
        filename: `tyeif-prayer-${new Date().toISOString().slice(0, 10)}`,
      })
      .from(Print)
      .save();
    if (NoPrint) NoPrint.style.display = "block";
    if (Print) Print.style.display = "none";
  });

  // Open modals
  openPrintModal?.addEventListener("click", () => {
    printModal?.classList.add("is-active");
  });
  openSaveModal?.addEventListener("click", () => {
    saveModal?.classList.add("is-active");
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
