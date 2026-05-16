import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
  href?: string
}

const sizes = {
  sm: { icon: 24, text: "text-lg" },
  md: { icon: 32, text: "text-xl" },
  lg: { icon: 40, text: "text-2xl" },
}

export function Logo({ className, showText = true, size = "md", href = "/" }: LogoProps) {
  const { icon, text } = sizes[size]
  
  const content = (
    <div className={cn("flex items-center gap-2 group", className)}>
      <div className="relative overflow-hidden rounded-md shadow-md group-hover:shadow-glow transition-all duration-300">
        <Image
          src="/logo.jpg"
          alt="UniClubs Logo"
          width={icon}
          height={icon}
          className="object-cover"
          priority
        />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", text)}>
          Uni<span className="text-primary">Clubs</span>
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    )
  }

  return content
}

// Fallback logo when image fails to load
export function LogoFallback({ className, showText = true, size = "md" }: Omit<LogoProps, "href">) {
  const { icon, text } = sizes[size]
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className="rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold"
        style={{ width: icon, height: icon, fontSize: icon * 0.5 }}
      >
        U
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", text)}>
          Uni<span className="text-primary">Clubs</span>
        </span>
      )}
    </div>
  )
}
