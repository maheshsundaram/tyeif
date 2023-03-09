addEventListener("DOMContentLoaded", () => {
  const Prayer = document.getElementById("prayer");
  const Tyeif = document.getElementById("tyeif");
  const Print = document.getElementById("print");
  const printButton = document.getElementById("printButton");

  if (Prayer) {
    Prayer.addEventListener("keyup", (e: KeyboardEvent) => {
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
  }

  if (printButton)
    printButton.addEventListener("click", () => {
      window.print();
    });
});
