import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Footer } from "./footer"
import "../../../app/globals.css"

const defaultNavLinks = [
  { label: "Product", href: "#product" },
  { label: "About Us", href: "#about" },
  { label: "Stories", href: "#stories" },
  { label: "Resources", href: "#resources" },
  { label: "Partners", href: "#partners" },
]

const defaultLegalLinks = [
  { label: "DPA", href: "#dpa" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "SLA", href: "#sla" },
  { label: "Terms of Service", href: "#terms" },
]

const defaultSocialLinks = [
  { platform: "youtube" as const, href: "#youtube" },
  { platform: "linkedin" as const, href: "#linkedin" },
]

const meta = {
  title: "UI/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    controls: { include: [] },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  args: {
    navLinks: defaultNavLinks,
    legalLinks: defaultLegalLinks,
    socialLinks: defaultSocialLinks,
    copyright: "© 2026 Terra. All rights reserved.",
  },
}

export const WithBadges: Story = {
  args: {
    navLinks: defaultNavLinks,
    legalLinks: defaultLegalLinks,
    socialLinks: defaultSocialLinks,
    copyright: "© 2026 Terra. All rights reserved.",
    badges: (
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white">
          SOC 2
        </div>
        <div className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white">
          SOC 2
        </div>
      </div>
    ),
  },
}

export const WithSymbol: Story = {
  args: {
    navLinks: defaultNavLinks,
    legalLinks: defaultLegalLinks,
    socialLinks: defaultSocialLinks,
    copyright: "© 2026 Terra. All rights reserved.",
    symbol: (
      <svg
        viewBox="0 0 32 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full text-white"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.5948 4.58196C12.2255 3.1293 12.55 1.57235 12.55 0H23.4369C23.4369 2.93631 22.8307 5.84388 21.6529 8.55665C21.1956 9.60982 20.6557 10.6255 20.0389 11.5956C19.8469 11.8977 20.2554 12.3076 20.5814 12.1399C23.9702 10.3956 27.8198 9.4874 31.7403 9.4874V19.8739C28.4118 19.8739 25.1893 21.1064 22.8356 23.3518C20.8644 25.2325 19.6166 27.6745 19.2633 30.284H8.32822C8.58601 26.706 9.74107 23.2583 11.6708 20.2226C11.8628 19.9205 11.4544 19.5105 11.1285 19.6783C10.4278 20.0389 9.70715 20.3659 8.96892 20.6577C6.12542 21.7813 3.07778 22.3597 0 22.3597L1.6362e-06 11.9732C1.6481 11.9732 3.28007 11.6636 4.80271 11.0618C6.32535 10.4601 7.70887 9.57818 8.87425 8.46632C10.0396 7.35454 10.9641 6.03462 11.5948 4.58196Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
}

export const Mobile: Story = {
  args: {
    ...WithSymbol.args,
    badges: (WithBadges.args as any).badges,
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}
