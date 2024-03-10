export function createToast() {
  const container = document.createElement("div");

  const containerStyles = [
    "width:100%",
    "z-index:99999",
    "position:fixed",
    "pointer-events:none",
    "display:flex",
    "flex-direction:column",
    "padding:15px",
    "top:0",
    "left:0",
    "right:0",
    "text-align:center",
    "align-items:center",
  ].join(";");

  container.setAttribute("style", containerStyles);

  const toast = document.createElement("div");

  const toastStyles = [
    "width:auto",
    "pointer-events:auto",
    "display:inline-flex",
    "white-space:pre-wrap",
    "opacity:1",
    "padding: 1.25rem 1.5rem",
  ].join(";");

  toast.setAttribute("style", toastStyles);
  toast.className = "notification is-success";
  toast.insertAdjacentHTML("beforeend", "Copied!");

  const destroy = () => {
    toast.remove();
    container.remove();
  };

  let start = Date.now();
  let remaining = 2000;
  let timer = window.setTimeout(destroy, remaining);

  const pause = () => {
    if (typeof document === "undefined") return;
    window.clearTimeout(timer);
    remaining -= Date.now() - start;
  };

  const resume = () => {
    if (typeof document === "undefined") return;
    start = Date.now();
    window.clearTimeout(timer);
    timer = window.setTimeout(destroy, remaining);
  };

  toast.addEventListener("click", () => {
    destroy();
  });
  toast.addEventListener("mouseover", () => {
    pause();
  });
  toast.addEventListener("mouseout", () => {
    resume();
  });

  document.body.appendChild(container);

  container.appendChild(toast);
}
