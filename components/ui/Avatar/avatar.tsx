import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { tv, type VariantProps } from "tailwind-variants"
import type React from "react"

import { cn } from "@/lib/utils"

const avatarVariants = tv({
  base: "relative flex shrink-0 overflow-hidden rounded-full",
  variants: {
    size: {
      default: "size-8",
      sm: "size-6",
      lg: "size-10",
      xl: "size-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface AvatarProps // Export AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

function Avatar({ className, size, children, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={avatarVariants({ size, class: className })}
      {...props}
    >
      {children}
    </AvatarPrimitive.Root>
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
