"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Building, Calendar, Users, BarChart3, Bell, Settings, ArrowLeft, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore, useDemoStore } from "@/lib/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const sidebarLinks = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/clubs", label: "Clubs", icon: Building },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: Bell },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const { setDemoMode } = useDemoStore()

  const handleLogout = () => {
    logout()
    setDemoMode(false)
    router.push("/")
  }

  return (
    <div className="flex flex-col h-full p-4">
      {/* Logo */}
      <div className="mb-6">
        <Link href="/admin" className="flex items-center gap-2 group" onClick={onLinkClick}>
          <div className="w-9 h-9 rounded-md bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg">Admin Portal</span>
            <p className="text-xs text-muted-foreground">UniClubs Management</p>
          </div>
        </Link>
      </div>

      {/* Admin User Card */}
      <div className="mb-6 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-purple-500/30">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-purple-400">University Admin</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-purple-600 text-white shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-border space-y-2">
        <Link
          href="/"
          onClick={onLinkClick}
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors rounded-lg w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  )
}

export function AdminSidebar() {
  return (
    <aside className="hidden lg:block w-64 border-r border-border bg-card min-h-screen">
      <SidebarContent />
    </aside>
  )
}

function MobileHeader() {
  const [open, setOpen] = useState(false)
  
  return (
    <header className="lg:hidden sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-purple-600 flex items-center justify-center text-white font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold">Admin</span>
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SidebarContent onLinkClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated } = useAuthStore()
  const { isDemoMode } = useDemoStore()
  const router = useRouter()

  useEffect(() => {
    // Allow access in demo mode or if admin
    if (!isDemoMode && !isAuthenticated) {
      router.push("/login")
    } else if (!isDemoMode && isAuthenticated && user?.role !== 'admin') {
      router.push("/dashboard")
    }
  }, [isDemoMode, isAuthenticated, user, router])

  // Show nothing while redirecting
  if (!isDemoMode && (!isAuthenticated || user?.role !== 'admin')) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MobileHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
