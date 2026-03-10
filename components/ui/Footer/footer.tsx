import * as React from "react"
import { cn } from "@/lib/utils"

function TerraWordmark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      className={cn("h-12 w-auto", className)}
      viewBox="0 0 73.5 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>terra</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.40574 1.75316C4.64542 1.19734 4.76876 0.601618 4.76876 0H8.9056C8.9056 1.1235 8.67522 2.23596 8.22767 3.27395C8.05958 3.6638 7.86207 4.0403 7.63715 4.40053C7.55991 4.52423 7.72685 4.69283 7.85929 4.62499C9.13733 3.97045 10.5744 3.619 12.0492 3.619V7.59313C10.7844 7.59313 9.57145 8.07578 8.67713 8.93493C7.78281 9.79409 7.28036 10.9593 7.28036 12.1743C7.28036 13.3893 7.78281 14.5546 8.67713 15.4137C9.57145 16.2729 10.7844 16.7555 12.0492 16.7555V20.7296C9.68731 20.7296 7.4221 19.8283 5.75192 18.2238C4.08183 16.6194 3.14352 14.4433 3.14352 12.1743C3.14352 10.6112 3.58886 9.09219 4.41197 7.77379C4.48912 7.65018 4.32227 7.48149 4.18983 7.54933C3.93578 7.67943 3.67492 7.79783 3.40802 7.90407C2.3275 8.33397 1.16945 8.55532 0 8.55532V4.58119C0.626175 4.58119 1.24631 4.4627 1.82495 4.23248C2.4035 4.00227 2.92924 3.6648 3.37199 3.23939C3.81484 2.81397 4.16606 2.30901 4.40574 1.75316ZM69.0298 5.21827C69.0298 5.41941 68.7586 5.5134 68.6139 5.36794C67.3259 4.07212 65.6201 3.43605 63.4743 3.43605C61.1906 3.43605 59.2471 4.28743 57.6113 5.95738C56.0089 7.62732 55.1915 9.6574 55.1915 12.0804C55.1915 14.5036 56.0089 16.5664 57.6113 18.2363C59.2471 19.9063 61.1906 20.7248 63.4743 20.7248C65.6201 20.7248 67.3259 20.0889 68.6139 18.793C68.7586 18.6476 69.0298 18.7416 69.0298 18.9427V20.2665H73.4266V3.89447H69.0298V5.21827ZM64.2918 16.6974C62.9291 16.6974 61.804 16.2717 60.9175 15.4203C60.0311 14.5363 59.5883 13.423 59.5883 12.0804C59.5883 10.738 60.0311 9.62467 60.9175 8.77338C61.804 7.88926 62.9291 7.46357 64.2918 7.46357C65.6555 7.46357 66.7806 7.88926 67.6661 8.77338C68.5871 9.62467 69.0298 10.738 69.0298 12.0804C69.0298 13.423 68.5871 14.5363 67.6661 15.4203C66.7806 16.2717 65.6555 16.6974 64.2918 16.6974ZM31.2165 13.8159H18.944C18.6529 13.8159 18.4403 14.0826 18.5461 14.3432C19.2401 16.0518 20.7822 16.8938 23.1725 16.8938C24.8427 16.8938 26.1379 16.3372 26.99 15.2567L30.5348 17.2213C28.8646 19.5461 26.3765 20.7248 23.1044 20.7248C20.2754 20.7248 18.0258 19.9063 16.3215 18.2691C14.6173 16.6318 13.7651 14.569 13.7651 12.0804C13.7651 9.62467 14.6173 7.56176 16.2874 5.92464C17.9575 4.2547 20.139 3.43605 22.7635 3.43605C25.2517 3.43605 27.3308 4.2547 28.9329 5.92464C30.5689 7.59459 31.3869 9.62467 31.3869 12.0804C31.3869 12.6371 31.3187 13.1938 31.2165 13.8159ZM18.4549 10.019C18.3606 10.2816 18.5752 10.5415 18.8643 10.5415H26.4317C26.7183 10.5415 26.9325 10.2853 26.843 10.0237C26.201 8.14718 24.6118 7.23436 22.7635 7.23436C20.6146 7.23436 19.0917 8.24583 18.4549 10.019ZM38.078 6.2825C38.0641 5.42078 38.0957 3.97557 38.0957 3.97557H33.748V20.1642H38.0957V12.426C38.0957 10.8719 38.6012 9.77105 39.6461 9.09118C40.6908 8.41123 41.9041 8.15221 43.2185 8.31413V3.65182C41.1907 3.65182 38.8557 5.10334 38.243 6.30654C38.2179 6.35582 38.0789 6.33735 38.078 6.2825ZM49.5332 3.90782C49.5332 3.90782 49.5018 5.35294 49.5156 6.21475C49.5164 6.2696 49.6554 6.28807 49.6805 6.23879C50.2932 5.0355 52.6282 3.58398 54.6558 3.58398V8.24638C53.3417 8.08446 52.1284 8.34348 51.0836 9.02343C50.0388 9.7033 49.5332 10.8042 49.5332 12.3583V20.0964H45.1855V3.90782H49.5332Z"
        fill="currentColor"
      />
    </svg>
  )
}

function YoutubeIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" fill="currentColor" {...props}>
      <path d="M19.8008 3.03516C19.8008 3.03516 19.6055 1.65625 19.0039 1.05078C18.2422 0.253906 17.3906 0.25 17 0.203125C14.2031 0 10.0039 0 10.0039 0H9.99609C9.99609 0 5.79687 0 3 0.203125C2.60938 0.25 1.75781 0.253906 0.996094 1.05078C0.394531 1.65625 0.203125 3.03516 0.203125 3.03516C0.203125 3.03516 0 4.65625 0 6.27344V7.78906C0 9.40625 0.199219 11.0273 0.199219 11.0273C0.199219 11.0273 0.394531 12.4063 0.992187 13.0117C1.75391 13.8086 2.75391 13.7813 3.19922 13.8672C4.80078 14.0195 10 14.0664 10 14.0664C10 14.0664 14.2031 14.0586 17 13.8594C17.3906 13.8125 18.2422 13.8086 19.0039 13.0117C19.6055 12.4063 19.8008 11.0273 19.8008 11.0273C19.8008 11.0273 20 9.41016 20 7.78906V6.27344C20 4.65625 19.8008 3.03516 19.8008 3.03516ZM7.93359 9.62891V4.00781L13.3359 6.82812L7.93359 9.62891Z" />
    </svg>
  )
}

function LinkedinIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42187 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z" />
    </svg>
  )
}

const socialIconMap = {
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
} as const

type SocialPlatform = keyof typeof socialIconMap

interface FooterLink {
  label: string
  href: string
  target?: string
}

interface SocialLink {
  platform: SocialPlatform
  href: string
  target?: string
}

interface FooterProps {
  className?: string
  badges?: React.ReactNode
  symbol?: React.ReactNode
  navLinks?: FooterLink[]
  legalLinks?: FooterLink[]
  socialLinks?: SocialLink[]
  copyright?: string
}

function Footer({
  className,
  badges,
  symbol,
  navLinks = [],
  legalLinks = [],
  socialLinks = [],
  copyright = `© ${new Date().getFullYear()} Terra. All rights reserved.`,
}: FooterProps) {
  return (
    <footer data-slot="footer" className={cn("bg-primary text-white", className)}>
      <div className="container">
        {/* Top: badges + nav links */}
        <div className="flex items-start justify-between pb-8 pt-12 md:items-center md:pb-20 md:pt-20">
          {badges && (
            <div
              data-slot="footer-badges"
              className="order-last flex items-center gap-3 md:order-first"
            >
              {badges}
            </div>
          )}
          {navLinks.length > 0 && (
            <nav
              data-slot="footer-nav"
              className="flex flex-col gap-8 md:ml-auto md:flex-row md:gap-12"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  data-slot="footer-nav-link"
                  className="text-xl font-semibold transition-opacity hover:opacity-70"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="border-t border-white/10" />

        {/* Main content — grid on desktop: symbol left, content right */}
        <div className="flex flex-col pt-8 md:grid md:grid-cols-[43%_1fr] md:pt-12 md:pb-8">
          {/* Right column */}
          <div className="flex flex-col md:col-start-2 md:row-start-1">
            <div className="md:flex md:justify-end">
              <TerraWordmark className="h-12 text-white md:h-[76px]" />
            </div>

            {socialLinks.length > 0 && (
              <div
                data-slot="footer-social"
                className="mt-16 flex gap-6 md:mt-[101px] md:justify-end"
              >
                {socialLinks.map((link) => {
                  const Icon = socialIconMap[link.platform]
                  return (
                    <a
                      key={link.platform}
                      href={link.href}
                      target={link.target}
                      aria-label={link.platform}
                      className="text-white/75 transition-colors hover:text-white"
                    >
                      <Icon className="size-5" />
                    </a>
                  )
                })}
              </div>
            )}

            {/* Legal + copyright */}
            <div className="mt-20 flex flex-col md:mt-[149px] md:flex-row md:items-center">
              <p className="order-last mt-8 text-xs text-white/35 md:order-first md:mt-0">
                {copyright}
              </p>
              {legalLinks.length > 0 && (
                <nav data-slot="footer-legal" className="flex gap-6 md:ml-auto md:gap-12">
                  {legalLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.target}
                      data-slot="footer-legal-link"
                      className="text-xs text-white/75 transition-opacity hover:opacity-70"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </div>

          {/* Symbol — bottom on mobile, left column on desktop */}
          {symbol && (
            <>
              <div className="mt-4 border-t border-white/10 md:hidden" />
              <div
                data-slot="footer-symbol"
                className="mt-12 md:col-start-1 md:row-start-1 md:mt-0 md:self-start"
              >
                {symbol}
              </div>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}

export { Footer, TerraWordmark }
export type { FooterLink, SocialLink, SocialPlatform }
