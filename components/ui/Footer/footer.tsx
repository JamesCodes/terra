import LinkedInIcon from "@/components/icons/linkedin.svg"
import TerraIcon from "@/components/icons/terra-icon.svg"
import TerraName from "@/components/icons/terra-name.svg"
import YouTubeIcon from "@/components/icons/youtube.svg"
import { Button } from "@/components/ui/Button/button"
import { cn } from "@/lib/utils"

const socialIconMap = {
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
} as const

type SocialPlatform = keyof typeof socialIconMap

interface SocialLink {
  platform: SocialPlatform
  href: string
  target?: string
}

interface FooterProps {
  className?: string
  navColumns?: React.ReactNode
  badges?: React.ReactNode
  socialLinks?: SocialLink[]
  legalLinks?: React.ReactNode
  copyright?: string
}

function Footer({
  className,
  navColumns,
  badges,
  socialLinks = [],
  legalLinks,
  copyright = `© ${new Date().getFullYear()} Terra. All rights reserved.`,
}: FooterProps) {
  return (
    <footer data-slot="footer" className={cn("bg-primary text-white", className)}>
      <div className="">
        {/* Nav area + social */}
        <div className="flex lg:items-start lg:pt-18.5">
          <div data-slot="footer-nav-columns" className="page-grid gap-y-0 md:max-lg:grid-cols-4">
            {navColumns}
            {socialLinks.length > 0 && (
              <div className="lg:col-start-9 lg:col-end-13">
                <div
                  data-slot="footer-social"
                  className="mt-8 flex gap-4 md:mt-10 lg:mt-2 lg:justify-end"
                >
                  {socialLinks.map((link) => {
                    const Icon = socialIconMap[link.platform]
                    return (
                      <a
                        key={link.platform}
                        href={link.href}
                        target={link.target}
                        aria-label={link.platform}
                        className="flex items-center rounded-full bg-[rgba(60,60,60,0.2)] p-4 transition-colors hover:bg-[rgba(60,60,60,0.4)]"
                      >
                        <Button variant="ghost" size="icon" className="size-fit">
                          <Icon className="size-5" />
                        </Button>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="container">
          <div className="mt-8 border-white/10 border-t md:mt-10" />
          <div className="py-8 md:grid md:grid-cols-[auto_1fr] md:py-10 lg:py-12">
            <div className="flex flex-col items-start justify-between md:col-start-1">
              <TerraName className="h-12 text-white md:h-19" />

              {badges && (
                <div
                  data-slot="footer-badges"
                  className="mt-12.5 flex items-center gap-3"
                  style={{ "--item-max-width": "44px" } as React.CSSProperties}
                >
                  {badges}
                </div>
              )}
            </div>

            <div
              data-slot="footer-symbol"
              className="hidden md:col-start-2 md:row-start-1 md:flex md:items-start md:justify-end"
            >
              <TerraIcon className="max-w-77.5" />
            </div>
          </div>

          <div className="border-white/10 border-t" />

          {/* Legal + copyright */}
          <div className="flex flex-col py-8 md:flex-row md:items-center md:py-10">
            <p className="order-last mt-6 text-white/35 text-xs md:order-first md:mt-0">
              {copyright}
            </p>
            {legalLinks && (
              <nav
                data-slot="footer-legal"
                className="flex gap-6 md:ml-auto md:gap-10 lg:gap-12"
                style={
                  {
                    "--link-font-size": "12px",
                    "--link-color": "rgba(255,255,255,0.75)",
                  } as React.CSSProperties
                }
              >
                {legalLinks}
              </nav>
            )}
          </div>

          {/* Mobile-only: extra divider + symbol at bottom */}
          <div className="md:hidden">
            <div className="border-white/10 border-t" />
            <div data-slot="footer-symbol" className="py-8">
              <TerraIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
export type { SocialLink, SocialPlatform }
