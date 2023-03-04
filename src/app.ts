addEventListener("DOMContentLoaded", () => {
  const English = document.getElementById("english");
  const Tyeif = document.getElementById("tyeif");
  const Print = document.getElementById("print");
  English?.addEventListener("keyup", (e: KeyboardEvent) => {
    // @ts-expect-error TODO
    const text = e.target.value.toLowerCase().replace(/[^a-z\s\.\,\:]/gi, "");
    if (Tyeif) Tyeif.textContent = text;
    if (Print) Print.innerText = text;
  });
});

function save() {}
