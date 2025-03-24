// Animations for the portfolio
;(() => {
  // Animated background
  const animatedBg = document.getElementById("animated-bg")

  if (animatedBg) {
    const ctx = animatedBg.getContext("2d")

    // Set canvas dimensions
    function resizeCanvas() {
      animatedBg.width = window.innerWidth
      animatedBg.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * animatedBg.width
        this.y = Math.random() * animatedBg.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `rgba(0, 82, 204, ${Math.random() * 0.5})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x > animatedBg.width || this.x < 0) {
          this.speedX = -this.speedX
        }

        if (this.y > animatedBg.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 20))
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, animatedBg.width, animatedBg.height)

      // Draw connections between particles
      ctx.strokeStyle = "rgba(0, 82, 204, 0.05)"
      ctx.lineWidth = 1

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }

  // 3D Animation for hero section
  const hero3d = document.getElementById("hero-3d")

  if (hero3d) {
    const ctx = hero3d.getContext("2d")

    // Set canvas dimensions
    function resizeHero3d() {
      hero3d.width = hero3d.parentElement.clientWidth
      hero3d.height = hero3d.parentElement.clientHeight
    }

    window.addEventListener("resize", resizeHero3d)
    resizeHero3d()

    // Create simple 3D-like animation
    const cubes = []
    const cubeCount = 10

    for (let i = 0; i < cubeCount; i++) {
      cubes.push({
        x: Math.random() * hero3d.width,
        y: Math.random() * hero3d.height,
        z: Math.random() * 200 + 100,
        size: Math.random() * 30 + 20,
        color: `hsl(${Math.random() * 40 + 200}, 100%, 50%)`,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        speedZ: Math.random() * 2 - 1,
        rotationSpeed: Math.random() * 0.02 - 0.01,
      })
    }

    let angle = 0

    function drawCube(cube) {
      // Calculate perspective
      const perspective = 300
      const scale = perspective / (perspective + cube.z)
      const x = cube.x + hero3d.width / 2
      const y = cube.y + hero3d.height / 2

      // Draw cube with perspective
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)
      ctx.rotate(angle * cube.rotationSpeed)

      // Draw cube face
      ctx.fillStyle = cube.color
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.rect(-cube.size / 2, -cube.size / 2, cube.size, cube.size)
      ctx.fill()
      ctx.stroke()

      ctx.restore()
    }

    function animate3d() {
      ctx.clearRect(0, 0, hero3d.width, hero3d.height)

      // Sort cubes by z-index for proper layering
      cubes.sort((a, b) => b.z - a.z)

      // Update and draw cubes
      cubes.forEach((cube) => {
        // Update position
        cube.x += cube.speedX
        cube.y += cube.speedY
        cube.z += cube.speedZ

        // Bounce off edges
        if (cube.x < -hero3d.width / 2 || cube.x > hero3d.width / 2) cube.speedX *= -1
        if (cube.y < -hero3d.height / 2 || cube.y > hero3d.height / 2) cube.speedY *= -1
        if (cube.z < 100 || cube.z > 300) cube.speedZ *= -1

        // Draw cube
        drawCube(cube)
      })

      angle += 0.01
      requestAnimationFrame(animate3d)
    }

    animate3d()
  }

  // Floating icons animation
  const floatingIcons = document.getElementById("floating-icons")

  if (floatingIcons) {
    const icons = [
      { icon: "code", color: "#0052cc" },
      { icon: "palette", color: "#ff8000" },
      { icon: "globe", color: "#0066ff" },
      { icon: "cpu", color: "#0052cc" },
      { icon: "database", color: "#ff8000" },
      { icon: "server", color: "#0066ff" },
    ]

    // Create SVG icons
    icons.forEach((iconData, index) => {
      const iconElement = document.createElement("div")
      iconElement.className = "floating-icon"
      iconElement.innerHTML = getIconSvg(iconData.icon)
      iconElement.style.color = iconData.color

      // Random initial position
      const randomX = Math.random() * 100
      const randomY = Math.random() * 100

      iconElement.style.left = `${randomX}%`
      iconElement.style.top = `${randomY}%`

      // Animation with CSS
      iconElement.style.animation = `float 20s ease-in-out ${index * 2}s infinite alternate`

      floatingIcons.appendChild(iconElement)
    })
  }

  // Helper function to get SVG icons
  function getIconSvg(iconName) {
    const icons = {
      code: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      palette:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>',
      globe:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
      cpu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>',
      database:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
      server:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
    }

    return icons[iconName] || ""
  }

  // Add animation for section elements
  const animateSections = () => {
    const sections = document.querySelectorAll(".section")

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const isInView = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0

      if (isInView) {
        section.classList.add("fade-in")
      }
    })
  }

  // Add CSS for section animations
  const style = document.createElement("style")
  style.textContent = `
    .section {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    @keyframes float {
      0% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(calc(50% - 12px), calc(30% - 12px));
      }
      100% {
        transform: translate(calc(-30% - 12px), calc(20% - 12px));
      }
    }
    
    .floating-icon {
      position: absolute;
      width: 24px;
      height: 24px;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
    
    .typing-cursor {
      display: inline-block;
      animation: blink 1s infinite;
    }
    
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `

  document.head.appendChild(style)

  // Initial check for elements in view
  animateSections()

  // Check on scroll
  window.addEventListener("scroll", animateSections)
})()

