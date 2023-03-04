addEventListener("DOMContentLoaded", () => {
  const English = document.getElementById("english");
  const Tyeif = document.getElementById("tyeif");
  const Print = document.getElementById("print");
  English.addEventListener("keyup", (e) => {
    const text = e.target.value.toLowerCase().replace(/[^a-z\s\.\,\:]/gi, "");
    Tyeif.textContent = text;
    Print.innerText = text;
  });
});
