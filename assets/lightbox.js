(() => {
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  const lbImg = document.getElementById("lightboxImg");
  const lbCaption = document.getElementById("lightboxCaption");

  // Only images you tag with data-lightbox will open the lightbox
  const imgs = Array.from(document.querySelectorAll('img[data-lightbox]'));

  if (!imgs.length) return;

  let index = 0;
  let lastFocused = null;

  const open = (i) => {
    index = i;
    lastFocused = document.activeElement;

    const img = imgs[index];
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || "Gallery image";
    lbCaption.textContent = img.alt || "";

    lb.hidden = false;
    document.body.style.overflow = "hidden";

    // focus close button for accessibility
    const closeBtn = lb.querySelector("[data-lb-close]");
    closeBtn && closeBtn.focus();
  };

  const close = () => {
    lb.hidden = true;
    document.body.style.overflow = "";
    lbImg.src = ""; // helps memory
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  };

  const show = (i) => {
    index = (i + imgs.length) % imgs.length;
    const img = imgs[index];
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || "Gallery image";
    lbCaption.textContent = img.alt || "";
  };

  const next = () => show(index + 1);
  const prev = () => show(index - 1);

  // Click on any tagged image opens
  imgs.forEach((img, i) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => open(i));
  });

  // Controls
  lb.addEventListener("click", (e) => {
    if (e.target.matches("[data-lb-close]")) close();
    if (e.target.matches("[data-lb-next]")) next();
    if (e.target.matches("[data-lb-prev]")) prev();
  });

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;

    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
})();
