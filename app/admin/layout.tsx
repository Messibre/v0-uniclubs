"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Building, Calendar, Users, BarChart3, Bell, Settings, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/clubs", label: "Clubs", icon: Building },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-card min-h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/admin" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg">Admin Portal</span>
            <p className="text-xs text-muted-foreground">UniClubs Management</p>
          </div>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Back to App */}
      <div className="pt-4 border-t border-border">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </aside>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
