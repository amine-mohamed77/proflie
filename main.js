// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

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

  // Form submission
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For this example, we'll just show a success message
      alert("Thank you for your message! I will get back to you soon.")

      // Reset form
      contactForm.reset()
    })
  }
})

