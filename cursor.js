// Custom cursor functionality
;(() => {
  // Only enable custom cursor on desktop
  if (window.innerWidth < 768) return

  const cursorDot = document.getElementById("cursor-dot")
  const cursorOutline = document.getElementById("cursor-outline")
  const cursorTrail = document.getElementById("cursor-trail")

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
    cursorOutline.style.mixBlendMode = "difference"
  }

  const handleButtonHover = () => {
    cursorOutline.style.width = "60px"
    cursorOutline.style.height = "60px"
    cursorOutline.style.borderWidth = "2px"
    cursorOutline.style.mixBlendMode = "difference"
  }

  const handleDefaultState = () => {
    cursorOutline.style.width = "40px"
    cursorOutline.style.height = "40px"
    cursorOutline.style.borderWidth = "1px"
    cursorOutline.style.mixBlendMode = "difference"
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
})()

