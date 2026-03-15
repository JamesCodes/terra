import { cn } from "@/lib/utils"

interface SiteLinkProps extends React.ComponentProps<"a"> {
  label?: string
}

function SiteLink({ label, className, children, ...props }: SiteLinkProps) {
  return (
    <a
      data-slot="site-link"
      className={cn("transition-opacity hover:opacity-70", className)}
      style={
        {
          fontSize: "var(--link-font-size)",
          fontWeight: "var(--link-font-weight)",
          lineHeight: "var(--link-line-height)",
          color: "var(--link-color, currentColor)",
          letterSpacing: "var(--link-letter-spacing, normal)",
          whiteSpace: "var(--link-whitespace, normal)",
          paddingBlock: "var(--link-padding-block, 0)",
          borderBottom: "1px solid var(--link-border-color, transparent)",
          width: "var(--link-width, auto)",
        } as React.CSSProperties
      }
      {...props}
    >
      {label ?? children}
    </a>
  )
}

export { SiteLink }
