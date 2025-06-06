import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

document.addEventListener("DOMContentLoaded", () => {
  const isProjectPage = document.querySelector(".page.project-page");
  if (!isProjectPage) return;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const initHeroAnimations = () => {
    const heroTitle = SplitText.create(".project-hero-header-h1 h1", {
      type: "lines",
      mask: "lines",
    });

    const projectTags = SplitText.create(".project-tags p", {
      type: "lines",
      mask: "lines",
    });

    const heroDescription = SplitText.create(".project-hero-description p", {
      type: "lines",
      mask: "lines",
    });

    gsap.set([heroTitle.lines, projectTags.lines, heroDescription.lines], {
      position: "relative",
      y: "120%",
      willChange: "transform",
    });

    gsap.set(".project-hero-header-h1 img", {
      scale: 0,
      willChange: "transform",
    });

    const heroTl = gsap.timeline({ delay: 0.85 });

    heroTl.to(heroTitle.lines, {
      y: "0%",
      duration: 1,
      ease: "power4.out",
    });

    heroTl.to(
      ".project-hero-header-h1 img",
      {
        scale: 1,
        duration: 1,
        ease: "power4.out",
      },
      "-=1"
    );

    heroTl.to(
      projectTags.lines,
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      },
      "-=0.9"
    );

    heroTl.to(
      heroDescription.lines,
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      },
      "-=0.9"
    );
  };

  initHeroAnimations();

  ScrollTrigger.create({
    trigger: ".project-page-whitespace",
    start: "top bottom",
    end: "bottom bottom",
    scrub: 1,
    onUpdate: (self) => {
      const projectPreviewWrapper = document.querySelector(
        ".project-preview-wrapper"
      );
      const previewCols = document.querySelectorAll(
        ".preview-col:not(.main-preview-col)"
      );
      const mainPreviewImg = document.querySelector(
        ".preview-img.main-preview-img img"
      );

      const previewScreenWidth = window.innerWidth;
      const previewMaxScale = previewScreenWidth < 900 ? 4 : 2.65;

      const scale = 1 + self.progress * previewMaxScale;
      const yPreviewColTranslate = self.progress * 300;
      const mainPreviewImgScale = 2 - self.progress * 0.85;

      projectPreviewWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;

      previewCols.forEach((previewCol) => {
        previewCol.style.transform = `translateY(${yPreviewColTranslate}px)`;
      });

      mainPreviewImg.style.transform = `scale(${mainPreviewImgScale})`;
    },
  });
});
