import { useWebflowContext } from "@webflow/react"
import { useEffect } from "react"

/**
 * Transforms bracket-based markup inside .w-richtext elements into real HTML.
 *
 * Syntax:
 *   [.className]text[/.className]   → <span class="className">text</span>
 *   [#idName]text[/#idName]         → <span id="idName">text</span>
 *   [$attr=value]text[/$attr]       → <span attr="value">text</span>
 */

interface Token {
  prefix: string
  tag: string
  attr: string
  regex: RegExp
}

const config = {
  tokens: [
    { prefix: "#", tag: "span", attr: "id" },
    { prefix: ".", tag: "span", attr: "class" },
    {
      prefix: "$",
      tag: "span",
      attr: "$1",
      regex: /\[\$([^=]+)(=([^\]]+))?\](.*?)\[\/\$\1\]/gm,
    },
  ],
  tags: "p, li, h1, h2, h3, h4, h5, h6, blockquote, figcaption",
}

const tokens: Token[] = config.tokens.map((token) => ({
  ...token,
  regex:
    token.regex ||
    new RegExp(`\\[\\${token.prefix}([\\w-]+)\\](.*?)\\[/\\${token.prefix}\\1\\]`, "gm"),
}))

const namedMarks = [
  { name: "button", tag: "button", className: "rt-button" },
  { name: "button-outline", tag: "button", className: "rt-button rt-button-outline" },
]

function processNamedMarks(richText: Element) {
  richText.querySelectorAll(config.tags).forEach((el) => {
    let html = el.innerHTML
    for (const mark of namedMarks) {
      const regex = new RegExp(`\\[${mark.name}\\](.*?)\\[/${mark.name}\\]`, "gm")
      html = html.replace(regex, `<${mark.tag} class="${mark.className}">$1</${mark.tag}>`)
    }
    el.innerHTML = html
  })
}

function processNumberedLists(richText: Element) {
  const children = Array.from(richText.children)

  for (let i = 0; i < children.length; i++) {
    const el = children[i]
    if (el.tagName !== "P" || el.textContent?.trim() !== "[numbered-list]") continue

    const startMarker = el
    const items: { heading: Element; description: Element }[] = []
    let endMarker: Element | null = null

    for (let j = i + 1; j < children.length; j++) {
      const child = children[j]
      if (child.tagName === "P" && child.textContent?.trim() === "[/numbered-list]") {
        endMarker = child
        break
      }

      if (/^H[1-6]$/.test(child.tagName) && children[j + 1]) {
        items.push({ heading: child, description: children[j + 1] })
        j++
      }
    }

    if (items.length === 0) continue

    const wrapper = document.createElement("div")
    wrapper.className = "rt-numbered-list"

    items.forEach((item, index) => {
      const text = item.heading.textContent || ""
      const numberMatch = text.match(/^(\d+)\.?\s*(.*)$/)
      const number = numberMatch ? numberMatch[1] : String(index + 1)
      const title = numberMatch ? numberMatch[2] : text

      const row = document.createElement("div")
      row.className = "rt-numbered-list-item"

      const numberEl = document.createElement("span")
      numberEl.className = "rt-numbered-list-number"
      numberEl.textContent = number

      const titleEl = document.createElement("h4")
      titleEl.className = "rt-numbered-list-title"
      titleEl.textContent = title

      const descEl = document.createElement("p")
      descEl.className = "rt-numbered-list-description"
      descEl.innerHTML = item.description.innerHTML

      row.appendChild(numberEl)
      row.appendChild(titleEl)
      row.appendChild(descEl)
      wrapper.appendChild(row)

      item.heading.remove()
      item.description.remove()
    })

    startMarker.replaceWith(wrapper)
    endMarker?.remove()
  }
}

function processHorizontalRules(richText: Element) {
  richText.querySelectorAll("p").forEach((p) => {
    if (p.textContent?.trim() === "[---]") {
      p.replaceWith(document.createElement("hr"))
    }
  })
}

function processInlineMarks(richText: Element) {
  richText.querySelectorAll(config.tags).forEach((el) => {
    let html = el.innerHTML

    for (const token of tokens) {
      do {
        html =
          token.prefix !== "$"
            ? html.replace(token.regex, `<${token.tag} ${token.attr}="$1">$2</${token.tag}>`)
            : html.replace(token.regex, `<${token.tag} $1="$3">$4</${token.tag}>`)
      } while (token.regex.test(html))
    }

    el.innerHTML = html
  })
}

function processExternalLinks(richText: Element) {
  richText.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach((a) => {
    if (a.closest(".rt-button") || a.querySelector(".rt-button")) return
    a.textContent = `[${a.textContent}]`
  })
}

export function processRichText() {
  document.querySelectorAll(".w-richtext").forEach((richText) => {
    processNumberedLists(richText)
    processHorizontalRules(richText)
    processNamedMarks(richText)
    processInlineMarks(richText)
    processExternalLinks(richText)
  })
}

const STYLE_ID = "rich-text-marks-styles"

const styles = [
  `h1 strong, h2 strong, h3 strong, h4 strong, h5 strong, h6 strong {
    font-weight: 500;
  }`,
  `.w-richtext hr {
    border: none;
    border-top: 1px rgb(18 17 13 / 10%) solid;
    margin: 48px 0;
  }`,
  `@media (min-width: 768px) {
    .w-richtext hr {
      margin: 64px 0;
    }
  }`,
  `.rt-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 3.125rem;
    padding-inline: 1.5rem;
    border-radius: 9999px;
    font-family: var(--font-sans);
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    font-weight: 600;
    font-size: 0.875rem;
    white-space: nowrap;
    text-decoration: none;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    transition: all 0.15s;
    cursor: pointer;
    border: none;
  }`,
  `.rt-button:hover, .rt-button:focus-visible {
    box-shadow: inset 0 0 0 2px var(--color-ring);
  }`,
  `.rt-button:active {
    background-color: var(--color-magma);
    box-shadow: none;
  }`,
  `.rt-button-outline {
    background-color: transparent;
    color: var(--color-accent);
    border: 1px solid var(--color-accent);
    box-shadow: none;
  }`,
  `.rt-button-outline:hover, .rt-button-outline:focus-visible {
    box-shadow: inset 0 0 0 2px var(--color-ring);
  }`,
  `.rt-button-outline:active {
    background-color: transparent;
    color: var(--color-dark-terracotta);
    border-color: var(--color-dark-terracotta);
    box-shadow: none;
  }`,
  `.rt-button a {
    color: inherit;
    text-decoration: none;
    font-family: var(--font-sans);
    font-weight: 600;
  }`,
  `.w-richtext a[target="_blank"]::after {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 4px;
    vertical-align: middle;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.2431 3.75781H7.5293M12.2431 3.75781L12.2428 8.47186M12.2431 3.75781L3.75781 12.2431' stroke='%23E65C32' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
  }`,
  `.rt-button a[target="_blank"]::after,
  a[target="_blank"]:has(.rt-button)::after {
    display: none;
  }`,
  `.rt-numbered-list-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0 1rem;
    border-top: 1px solid var(--color-border);
    padding-top: 2rem;
    padding-bottom: 2rem;
  }`,
  `@media (min-width: 768px) {
    .rt-numbered-list-item {
      grid-template-columns: repeat(9, 1fr);
      gap: 0 1.25rem;
    }
  }`,
  `.rt-numbered-list-number {
    grid-row: span 2;
    grid-column: span 1;
    font-family: var(--font-sans);
    font-weight: 200;
    font-size: 80px;
    line-height: 4.5rem;
    color: var(--color-primary);
  }`,
  `@media (min-width: 768px) {
    .rt-numbered-list-number {
      grid-column: span 2;
    }
  }`,
  `.rt-numbered-list-title {
    font-family: var(--font-serif);
    grid-column: 2 / span 3;
    font-size: 1.5rem;
    line-height: 2rem;
    margin: 0;
  }`,
  `@media (min-width: 768px) {
    .rt-numbered-list-title {
      grid-column: 3 / span 6;
    }
  }`,
  `.rt-numbered-list-description {
    grid-column: 2 / span 3;
    margin-top: 1.5rem;
    margin-bottom: 0;
    font-size: 1.125rem;
    line-height: 2rem;
    letter-spacing: -0.36px;
    color: var(--color-primary);
  }`,
  `@media (min-width: 768px) {
    .rt-numbered-list-description {
      grid-column: 3 / span 6;
    }
  }`,
]

export function injectStyles() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = styles.join("\n")
  document.head.appendChild(style)
}

function removeStyles() {
  document.getElementById(STYLE_ID)?.remove()
}

function reinitWebflow() {
  const wf = (window as any).Webflow
  if (!wf) return
  wf.destroy()
  wf.ready()
  wf.require("ix2").init()
}

export const marks = [
  { syntax: "[button]Link Text[/button]", description: "Wraps a link as a button" },
  { syntax: "[button-outline]Link Text[/button-outline]", description: "Outline style button" },
  { syntax: "[---]", description: "Horizontal rule (must be the only content in a paragraph)" },
  {
    syntax: "[numbered-list]...[/numbered-list]",
    description:
      "Numbered list — use H3s with number prefix (e.g. '1. Title') followed by paragraphs",
  },
]

export function DesignerReference() {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#f5f5f4",
        fontFamily: "monospace",
        fontSize: "12px",
        lineHeight: "1.6",
        color: "#44403c",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: "8px", fontSize: "13px" }}>Rich Text Marks</div>
      {marks.map((mark) => (
        <div key={mark.syntax} style={{ marginBottom: "4px" }}>
          <code style={{ color: "#c2410c" }}>{mark.syntax}</code>
          <span style={{ color: "#78716c" }}>
            {" — "}
            {mark.description}
          </span>
        </div>
      ))}
    </div>
  )
}

export function RichTextMarks() {
  const { mode } = useWebflowContext()
  const isDesigning = mode === "design" || mode === "edit" || mode === "build"

  useEffect(() => {
    if (isDesigning) return
    injectStyles()
    processRichText()
    reinitWebflow()

    return () => removeStyles()
  }, [isDesigning])

  if (isDesigning) {
    return <DesignerReference />
  }

  return <div />
}
