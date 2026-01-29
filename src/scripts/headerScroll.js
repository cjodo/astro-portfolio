const header = document.getElementById("site-header");
const hero = document.getElementById("hero");

if (header && hero) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Over hero (transparent header)
        header.classList.remove("bg-white", "shadow-sm");
        header.classList.add("bg-transparent");
        header.style.color = "#171717"; // Dark ink
      } else {
        // Past hero (solid white header)
        header.classList.remove("bg-transparent");
        header.classList.add("bg-white", "shadow-sm");
        header.style.color = "#1F4ED8"; // Optional: blue accent text
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(hero);
}
