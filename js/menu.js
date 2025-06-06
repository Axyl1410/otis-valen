import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggleBtn = document.querySelector(".menu-toggle-btn");
  const navOverlay = document.querySelector(".nav-overlay");
  const openLabel = document.querySelector(".open-label");
  const closeLabel = document.querySelector(".close-label");
  const navItems = document.querySelectorAll(".nav-item");
  let isMenuOpen = false;
  let isAnimating = false;
  let scrollY = 0;

  menuToggleBtn.addEventListener("click", () => {
    if (isAnimating) {
      gsap.killTweensOf([navOverlay, openLabel, closeLabel, navItems]);
      isAnimating = false;
    }

    if (!isMenuOpen) {
      isAnimating = true;

      navOverlay.style.pointerEvents = "all";
      menuToggleBtn.classList.add("menu-open");
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      gsap.to(openLabel, {
        y: "-1rem",
        duration: 0.3,
      });

      gsap.to(closeLabel, {
        y: "-1rem",
        duration: 0.3,
      });

      gsap.to(navOverlay, {
        opacity: 1,
        duration: 0.3,
        onComplete: () => {
          isAnimating = false;
        },
      });

      gsap.to([navItems, ".nav-footer-item-header", ".nav-footer-item-copy"], {
        opacity: 1,
        y: "0%",
        duration: 0.75,
        stagger: 0.075,
        ease: "power4.out",
      });

      isMenuOpen = true;
    } else {
      isAnimating = true;
      navOverlay.style.pointerEvents = "none";
      menuToggleBtn.classList.remove("menu-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);

      gsap.to(openLabel, {
        y: "0rem",
        duration: 0.3,
      });

      gsap.to(closeLabel, {
        y: "0rem",
        duration: 0.3,
      });

      gsap.to(navOverlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(
            [navItems, ".nav-footer-item-header", ".nav-footer-item-copy"],
            {
              opacity: 0,
              y: "100%",
            }
          );
          isAnimating = false;
        },
      });

      isMenuOpen = false;
    }
  });
});
