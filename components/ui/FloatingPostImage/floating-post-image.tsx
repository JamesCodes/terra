import gsap from "gsap"
import { useGSAP } from "@gsap/react"

interface FloatingPostImageProps {
  label?: string
}

const CONTAINER_ID = "floating-post-image"

function getCardFromPath(e: PointerEvent) {
  return e.composedPath().find(
    (el): el is HTMLElement => el instanceof HTMLElement && !!el.dataset.floatingSrc,
  )
}

function FloatingPostImage({ label = "Read Article" }: FloatingPostImageProps) {
  useGSAP(
    () => {
      if (matchMedia("(pointer: coarse)").matches) return
      if (document.getElementById(CONTAINER_ID)) return

      const el = document.createElement("div")
      el.id = CONTAINER_ID
      Object.assign(el.style, {
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "50",
        pointerEvents: "none",
      })

      const slide = document.createElement("div")
      Object.assign(slide.style, {
        position: "relative",
        transform: "translateY(-50%) translateX(40px)",
        transition: "transform 300ms ease-out",
      })

      const imgWrap = document.createElement("div")
      Object.assign(imgWrap.style, {
        width: "414px",
        height: "354px",
        overflow: "hidden",
        borderRadius: "24px",
        backgroundColor: "oklch(0.94 0.032 95)",
        boxShadow: "0px 4px 36px 0px rgba(0,0,0,0.05)",
        opacity: "0",
        transition: "opacity 300ms ease-out",
      })

      const img = document.createElement("img")
      Object.assign(img.style, {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      })

      const pill = document.createElement("span")
      pill.textContent = label
      Object.assign(pill.style, {
        position: "absolute",
        top: "50%",
        left: "0",
        transform: "translateY(-50%) translateX(-50%)",
        whiteSpace: "nowrap",
        borderRadius: "9999px",
        backgroundColor: "rgba(18, 17, 13, 0.3)",
        padding: "16px 24px",
        fontWeight: "600",
        fontSize: "14px",
        fontFamily: "inherit",
        color: "oklch(98.449% 0.00657 97.462)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: "0",
        transition: "opacity 300ms ease-out",
      })

      imgWrap.appendChild(img)
      slide.appendChild(imgWrap)
      slide.appendChild(pill)
      el.appendChild(slide)
      document.body.appendChild(el)

      const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" })
      const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" })
      let active = false

      const show = (src: string, alt: string) => {
        if (img.src !== src) {
          img.src = src
          img.alt = alt
        }
        if (!active) {
          active = true
          imgWrap.style.opacity = "1"
          pill.style.opacity = "1"
          slide.style.transform = "translateY(-50%) translateX(0)"
        }
      }

      const hide = () => {
        if (!active) return
        active = false
        imgWrap.style.opacity = "0"
        pill.style.opacity = "0"
        slide.style.transform = "translateY(-50%) translateX(40px)"
      }

      const handlePointerOver = (e: PointerEvent) => {
        const card = getCardFromPath(e)
        if (card) {
          show(card.dataset.floatingSrc!, card.dataset.floatingAlt ?? "")
        } else {
          hide()
        }
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!active) return
        moveX(e.clientX + 78)
        moveY(e.clientY)
      }

      window.addEventListener("pointerover", handlePointerOver)
      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("pointerover", handlePointerOver)
        window.removeEventListener("mousemove", handleMouseMove)
        document.getElementById(CONTAINER_ID)?.remove()
      }
    },
    { dependencies: [label], revertOnUpdate: true },
  )

  return null
}

export { FloatingPostImage }
