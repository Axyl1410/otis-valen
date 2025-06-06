document.addEventListener("DOMContentLoaded", () => {
  const isContactPage = document.querySelector(".page.contact-page");
  if (isContactPage) return;

  const footer = document.querySelector("footer");
  const explosionContainer = document.querySelector(".explosion-container");
  let hasExploded = false;

  const config = {
    gravity: 0.25,
    friction: 0.99,
    imageSize: 150,
    horizontalForce: 20,
    verticalForce: 15,
    rotationSpeed: 10,
    resetDelay: 500,
  };

  const imageParticleCount = 10;
  const imagePaths = Array.from(
    { length: imageParticleCount },
    (_, i) => `/images/work-items/work-item-${i + 1}.jpg`
  );

  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });

  const createParticles = () => {
    explosionContainer.innerHTML = "";

    imagePaths.forEach((path) => {
      const particle = document.createElement("img");
      particle.src = path;
      particle.classList.add("explosion-particle-img");
      particle.style.width = `${config.imageSize}px`;
      explosionContainer.appendChild(particle);
    });
  };

  class Particle {
    constructor(element) {
      this.element = element;
      this.x = 0;
      this.y = 0;
      this.vx = (Math.random() - 0.5) * config.horizontalForce;
      this.vy = -config.verticalForce - Math.random() * 10;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
    }

    update() {
      this.vy += config.gravity;
      this.vx *= config.friction;
      this.vy *= config.friction;
      this.rotationSpeed *= config.friction;

      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }
  }

  const explode = () => {
    if (hasExploded) return;
    hasExploded = true;

    createParticles();

    const particleElements = document.querySelectorAll(
      ".explosion-particle-img"
    );
    const particles = Array.from(particleElements).map(
      (element) => new Particle(element)
    );

    let animationId;

    const animate = () => {
      particles.forEach((particle) => particle.update());
      animationId = requestAnimationFrame(animate);

      if (
        particles.every(
          (particle) => particle.y > explosionContainer.offsetHeight / 2
        )
      ) {
        cancelAnimationFrame(animationId);
      }
    };

    animate();
  };

  const checkFooterPosition = () => {
    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (footerRect.top > viewportHeight + 100) {
      hasExploded = false;
    }

    if (!hasExploded && footerRect.top <= viewportHeight + 250) {
      explode();
    }
  };

  let checkTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(checkTimeout);
    checkTimeout = setTimeout(checkFooterPosition, 5);
  });

  window.addEventListener("resize", () => {
    hasExploded = false;
  });

  createParticles();
  setTimeout(checkFooterPosition, 500);
});
