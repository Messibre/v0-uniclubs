"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, Menu, User, LogOut, Settings, Sun, Moon, Shield, Building, Bell, X, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuthStore, useDemoStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { DemoModeToggle, DemoBanner, RoleSwitcher } from "@/components/demo-mode"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { isDemoMode, setDemoMode } = useDemoStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setDemoMode(false)
    router.push("/")
  }

  return (
    <>
      <DemoBanner />
      <nav className={cn(
        "sticky z-50 w-full bg-card/80 backdrop-blur-md border-b border-border",
        isDemoMode ? "top-10" : "top-0"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left: Logo & Search */}
            <div className="flex items-center gap-6 flex-1">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:shadow-glow transition-all">
                  U
                </div>
                <span className="font-bold text-xl tracking-tight hidden sm:block">
                  Uni<span className="text-primary">Clubs</span>
                </span>
              </Link>

              <div className="hidden md:flex max-w-md w-full relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search clubs, events..."
                  className="w-full bg-muted border border-border rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:shadow-glow transition-all"
                />
              </div>
            </div>

            {/* Right: Nav items */}
            <div className="flex items-center gap-3">
              {/* Demo Mode Toggle */}
              <DemoModeToggle />

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/discover"
                    className={`text-sm font-medium hidden sm:block transition-colors ${
                      pathname === "/discover" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Discover
                  </Link>

                  <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                    <span className="sr-only">Notifications</span>
                  </Button>

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                          <AvatarImage src={user?.avatar} alt={user?.firstName} />
                          <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                          {user?.role && (
                            <span className="text-xs mt-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full w-fit capitalize">
                              {user.role}
                            </span>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      {/* Role-specific dashboard links */}
                      {user?.role === 'student' && (
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            My Dashboard
                          </Link>
                        </DropdownMenuItem>
                      )}
                      
                      {user?.role === 'officer' && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/officer/dashboard" className="cursor-pointer">
                              <Building className="mr-2 h-4 w-4" />
                              Officer Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/officer/manage" className="cursor-pointer">
                              <Settings className="mr-2 h-4 w-4" />
                              Manage Club
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      {user?.role === 'admin' && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="cursor-pointer">
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Portal
                          </Link>
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sign In
                  </Link>
                  <Button size="sm" onClick={() => router.push("/register")}>
                    Get Started
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card p-4 animate-slide-up">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search clubs, events..."
                className="w-full bg-muted border border-border rounded-full py-2 pl-10 pr-4 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/discover" className="px-4 py-2 text-sm hover:bg-muted rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Discover Clubs
              </Link>
              <Link href="/events" className="px-4 py-2 text-sm hover:bg-muted rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Events
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      {/* Role Switcher - only shows in demo mode */}
      <RoleSwitcher />
    </>
  )
}

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
            U
          </div>
          <span className="font-semibold text-sm">UniClubs</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} UniClubs Platform. Addis Ababa University.
        </p>
      </div>
    </footer>
  )
}
