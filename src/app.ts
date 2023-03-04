import { toJpeg } from "html-to-image";

addEventListener("DOMContentLoaded", () => {
  const Prayer = document.getElementById("prayer");
  const Tyeif = document.getElementById("tyeif");
  const Print = document.getElementById("print");
  const printButton = document.getElementById("printButton");
  const saveButton = document.getElementById("saveButton");

  if (Prayer)
    Prayer.addEventListener("keyup", (e: KeyboardEvent) => {
      // Remove disallowed characters in Tyeif font
      const text = (e.target as HTMLTextAreaElement).value
        .toLowerCase()
        .replace(/[^a-z\s\.\,\:]/gi, "");

      // Copy Prayer text to Tyeif input and hidden Print element
      if (Tyeif) Tyeif.textContent = text;
      if (Print) Print.innerText = text;
    });

  if (printButton)
    printButton.addEventListener("click", () => {
      window.print();
    });

  if (saveButton && Tyeif)
    saveButton.addEventListener("click", async () => {
      const dataURL = await toJpeg(Tyeif, { quality: 100 });
      console.log("dataURL", dataURL);
    });
});
