// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active")
      mobileMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        mobileMenu.classList.remove("active")
      })
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        })
      }
    })
  })

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll(".skill-progress")

  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect()
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0

      if (isInView) {
        const progress = bar.getAttribute("data-progress")
        bar.style.width = `${progress}%`
      }
    })
  }

  // Initial check for elements in view
  animateSkillBars()

  // Check on scroll
  window.addEventListener("scroll", animateSkillBars)

  // Animated typing effect for hero text
  const animatedText = document.getElementById("animated-text")
  if (animatedText) {
    const text = animatedText.textContent
    animatedText.textContent = ""

    let charIndex = 0

    function typeText() {
      if (charIndex < text.length) {
        animatedText.textContent += text.charAt(charIndex)
        charIndex++
        setTimeout(typeText, 100)
      } else {
        // Add blinking cursor after typing is complete
        const cursor = document.createElement("span")
        cursor.className = "typing-cursor"
        cursor.textContent = "|"
        animatedText.appendChild(cursor)
      }
    }

    // Start typing animation after a short delay
    setTimeout(typeText, 1000)
  }

  // Form submission
  const contactForm = document.getElementById("contact-form")
  const formStatus = document.getElementById("form-status")

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields"
        formStatus.className = "form-status error"
        return
      }

      // Here you would typically send the form data to a server
      // For this example, we'll just show a success message
      formStatus.textContent = "Thank you for your message! I will get back to you soon."
      formStatus.className = "form-status success"

      // Reset form
      contactForm.reset()

      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = "none"
      }, 5000)
    })
  }

  // Custom cursor functionality
  const cursorDot = document.getElementById("cursor-dot")
  const cursorOutline = document.getElementById("cursor-outline")
  const cursorTrail = document.getElementById("cursor-trail")

  if (cursorDot && cursorOutline && cursorTrail && window.innerWidth >= 768) {
    // Create trail dots
    const trailDotsCount = 5
    const trailDots = []

    for (let i = 0; i < trailDotsCount; i++) {
      const dot = document.createElement("div")
      dot.className = "cursor-trail-dot"
      cursorTrail.appendChild(dot)
      trailDots.push({
        element: dot,
        x: -100,
        y: -100,
      })
    }

    // Variables for cursor position and animation
    let mouseX = -100
    let mouseY = -100
    let outlineX = -100
    let outlineY = -100
    let dotX = -100
    let dotY = -100

    // Track mouse position
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    // Handle cursor state for links and buttons
    const handleLinkHover = () => {
      cursorOutline.style.width = "80px"
      cursorOutline.style.height = "80px"
      cursorOutline.style.borderWidth = "2px"
    }

    const handleButtonHover = () => {
      cursorOutline.style.width = "60px"
      cursorOutline.style.height = "60px"
      cursorOutline.style.borderWidth = "2px"
    }

    const handleDefaultState = () => {
      cursorOutline.style.width = "40px"
      cursorOutline.style.height = "40px"
      cursorOutline.style.borderWidth = "1px"
    }

    // Add event listeners for links and buttons
    document.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("mouseenter", element.tagName === "BUTTON" ? handleButtonHover : handleLinkHover)
      element.addEventListener("mouseleave", handleDefaultState)
    })

    // Animation loop for smooth cursor movement
    function animateCursor() {
      // Smooth movement for dot
      const dotEasing = 0.2
      dotX += (mouseX - dotX) * dotEasing
      dotY += (mouseY - dotY) * dotEasing

      // Smooth movement for outline
      const outlineEasing = 0.1
      outlineX += (mouseX - outlineX) * outlineEasing
      outlineY += (mouseY - outlineY) * outlineEasing

      // Update cursor positions
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`

      // Update trail positions
      for (let i = trailDots.length - 1; i > 0; i--) {
        trailDots[i].x = trailDots[i - 1].x
        trailDots[i].y = trailDots[i - 1].y
      }

      // First trail dot follows the cursor with delay
      if (trailDots.length > 0) {
        trailDots[0].x += (mouseX - trailDots[0].x) * 0.15
        trailDots[0].y += (mouseY - trailDots[0].y) * 0.15
      }

      // Update trail dot positions
      trailDots.forEach((dot, index) => {
        const size = 4 - index * 0.5
        const opacity = 0.5 - index * 0.1

        dot.element.style.width = `${size}px`
        dot.element.style.height = `${size}px`
        dot.element.style.opacity = opacity
        dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`
      })

      requestAnimationFrame(animateCursor)
    }

    // Start animation
    animateCursor()

    // Hide cursor when leaving window
    document.addEventListener("mouseout", () => {
      cursorDot.style.opacity = "0"
      cursorOutline.style.opacity = "0"
      cursorTrail.style.opacity = "0"
    })

    document.addEventListener("mouseover", () => {
      cursorDot.style.opacity = "1"
      cursorOutline.style.opacity = "1"
      cursorTrail.style.opacity = "1"
    })
  }

  // Animated background
  const animatedBg = document.getElementById("animated-bg")

  if (animatedBg) {
    // Create particles
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30))
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.position = "absolute"
      particle.style.width = Math.random() * 5 + 1 + "px"
      particle.style.height = Math.random() * 5 + 1 + "px"
      particle.style.backgroundColor = `rgba(0, 82, 204, ${Math.random() * 0.5})`
      particle.style.borderRadius = "50%"

      // Random initial position
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"

      // Store particle properties
      const props = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: Math.random() * 0.2 - 0.1,
        speedY: Math.random() * 0.2 - 0.1,
      }

      particles.push({ element: particle, props })
      animatedBg.appendChild(particle)
    }

    // Animation loop
    function animateParticles() {
      particles.forEach((particle) => {
        // Update position
        particle.props.x += particle.props.speedX
        particle.props.y += particle.props.speedY

        // Bounce off edges
        if (particle.props.x < 0 || particle.props.x > 100) {
          particle.props.speedX *= -1
        }

        if (particle.props.y < 0 || particle.props.y > 100) {
          particle.props.speedY *= -1
        }

        // Update element position
        particle.element.style.left = particle.props.x + "%"
        particle.element.style.top = particle.props.y + "%"
      })

      requestAnimationFrame(animateParticles)
    }

    animateParticles()

    // Draw connections between particles
    function drawConnections() {
      // Clear previous connections
      const connections = document.querySelectorAll(".particle-connection")
      connections.forEach((conn) => conn.remove())

      // Check distances between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]

          // Calculate distance (in percentage of viewport)
          const dx = p1.props.x - p2.props.x
          const dy = p1.props.y - p2.props.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Draw connection if particles are close enough
          if (distance < 15) {
            const connection = document.createElement("div")
            connection.className = "particle-connection"
            connection.style.position = "absolute"
            connection.style.height = "1px"
            connection.style.backgroundColor = `rgba(0, 82, 204, ${0.1 * (1 - distance / 15)})`
            connection.style.transformOrigin = "left center"

            // Calculate position and dimensions
            const x1 = p1.props.x
            const y1 = p1.props.y
            const x2 = p2.props.x
            const y2 = p2.props.y

            // Position at first particle
            connection.style.left = x1 + "%"
            connection.style.top = y1 + "%"

            // Calculate angle and width
            const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
            const width = distance

            // Apply transformations
            connection.style.width = width + "%"
            connection.style.transform = `rotate(${angle}deg)`

            animatedBg.appendChild(connection)
          }
        }
      }

      requestAnimationFrame(drawConnections)
    }

    drawConnections()
  }

  // 3D Animation for hero section
  const hero3d = document.getElementById("hero-3d")

  if (hero3d) {
    // Create floating cubes
    const cubeCount = 8

    for (let i = 0; i < cubeCount; i++) {
      const cube = document.createElement("div")
      cube.className = "floating-cube"
      cube.style.position = "absolute"
      cube.style.width = Math.random() * 30 + 20 + "px"
      cube.style.height = Math.random() * 30 + 20 + "px"
      cube.style.backgroundColor = i % 2 === 0 ? "#0052cc" : "#ff8000"
      cube.style.opacity = "0.8"
      cube.style.borderRadius = i % 3 === 0 ? "50%" : "0"

      // Random initial position
      cube.style.left = Math.random() * 100 + "%"
      cube.style.top = Math.random() * 100 + "%"

      // Animation
      cube.style.animation = `float ${5 + Math.random() * 10}s ease-in-out ${i}s infinite alternate`

      hero3d.appendChild(cube)
    }
  }

  // Floating icons animation
  const floatingIcons = document.getElementById("floating-icons")

  if (floatingIcons) {
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

    // Create SVG icons
    const iconsArray = [
      { icon: "code", color: "#0052cc" },
      { icon: "palette", color: "#ff8000" },
      { icon: "globe", color: "#0066ff" },
      { icon: "cpu", color: "#0052cc" },
      { icon: "database", color: "#ff8000" },
      { icon: "server", color: "#0066ff" },
    ]

    // Create SVG icons
    iconsArray.forEach((iconData, index) => {
      const iconElement = document.createElement("div")
      iconElement.className = "floating-icon"
      iconElement.innerHTML = icons[iconData.icon]
      iconElement.style.color = iconData.color

      // Random initial position
      const randomX = Math.random() * 100
      const randomY = Math.random() * 100

      iconElement.style.left = `${randomX}%`
      iconElement.style.top = `${randomY}%`

      // Animation with CSS
      iconElement.style.animation = `float ${10 + Math.random() * 10}s ease-in-out ${index * 2}s infinite alternate`

      floatingIcons.appendChild(iconElement)
    })
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

  // Initial check for elements in view
  animateSections()

  // Check on scroll
  window.addEventListener("scroll", animateSections)
})

