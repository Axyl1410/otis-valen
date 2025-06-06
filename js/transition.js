import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  revealTransition();

  function revealTransition() {
    return new Promise((resolve) => {
      gsap.set(".transition-overlay", { scaleY: 1, transformOrigin: "top" });
      gsap.to(".transition-overlay", {
        scaleY: 0,
        duration: 0.6,
        stagger: -0.1,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });
  }

  function animateTransition() {
    return new Promise((resolve) => {
      gsap.set(".transition-overlay", { scaleY: 0, transformOrigin: "bottom" });
      gsap.to(".transition-overlay", {
        scaleY: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });
  }

  function closeMenuIfOpen() {
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    if (menuToggleBtn && menuToggleBtn.classList.contains("menu-open")) {
      menuToggleBtn.click();
    }
  }

  function isSamePage(href) {
    if (!href || href === "#" || href === "") return true;

    const currentPath = window.location.pathname;

    if (href === currentPath) return true;

    if (
      (currentPath === "/" || currentPath === "/index.html") &&
      (href === "/" ||
        href === "/index.html" ||
        href === "index.html" ||
        href === "./index.html")
    ) {
      return true;
    }

    const currentFileName = currentPath.split("/").pop() || "index.html";
    const hrefFileName = href.split("/").pop();

    if (currentFileName === hrefFileName) return true;

    return false;
  }

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      console.log("Link clicked:", href);
      console.log("Current path:", window.location.pathname);

      if (
        href &&
        (href.startsWith("http") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:"))
      ) {
        console.log("External link - allowing default");
        return;
      }

      if (isSamePage(href)) {
        console.log("Same page detected - preventing navigation");
        event.preventDefault();
        closeMenuIfOpen();
        return;
      }

      console.log("Different page - doing transition");
      event.preventDefault();

      animateTransition().then(() => {
        window.location.href = href;
      });
    });
  });
});
