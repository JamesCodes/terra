document.querySelectorAll("[data-custom-select]").forEach((dropdown) => {
  const name = dropdown.getAttribute("data-custom-select")
  const input = document.querySelector(`[data-custom-select-input="${name}"]`)
  const toggle = dropdown.querySelector(".w-dropdown-toggle")
  const list = dropdown.querySelector(".w-dropdown-list")
  const links = dropdown.querySelectorAll(".w-dropdown-link")

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const value = link.getAttribute("data-value") || link.textContent.trim()
      input.value = value

      // Update trigger text
      const textEl = toggle.querySelector("[data-custom-select-label]") || toggle
      textEl.textContent = link.textContent.trim()

      // Close the dropdown (remove Webflow's open class)
      toggle.classList.remove("w--open")
      list.classList.remove("w--open")
      toggle.setAttribute("aria-expanded", "false")
    })
  })
})
