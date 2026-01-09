(() => {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primaryNav");
  if (!btn || !nav) return;

  const setExpanded = (value) => {
    btn.setAttribute("aria-expanded", String(value));
    nav.classList.toggle("open", value);
  };

  btn.addEventListener("click", () => {
    setExpanded(!nav.classList.contains("open"));
  });

  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    const clickedInside = nav.contains(e.target) || btn.contains(e.target);
    if (!clickedInside) setExpanded(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setExpanded(false);
  });
})();


// About page video play
document.addEventListener("click", (e) => {
  const wrapper = e.target.closest("[data-video]");
  if (!wrapper) return;

  const poster = wrapper.querySelector(".video-poster");
  const video = wrapper.querySelector(".video-element");
  const playBtn = wrapper.querySelector(".video-play");

  if (!video) return;

  poster.style.display = "none";
  playBtn.style.display = "none";
  video.style.display = "block";
  video.play();
});
