"use client"

import { useRouter, usePathname } from "next/navigation"
import { User, Shield, Building, X, Zap } from "lucide-react"
import { useDemoStore, useAuthStore } from "@/lib/store"
import { DEMO_USERS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const ROLE_CONFIG = {
  student: {
    icon: User,
    label: "Student",
    name: "Abebe Kebede",
    description: "Browse clubs, join events, view dashboard",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20",
    activeColor: "bg-blue-500 text-white",
    dashboardPath: "/dashboard",
  },
  officer: {
    icon: Building,
    label: "Officer",
    name: "Senait Negash",
    description: "Manage club, approve members, create events",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20",
    activeColor: "bg-amber-500 text-white",
    dashboardPath: "/officer/dashboard",
  },
  admin: {
    icon: Shield,
    label: "Admin",
    name: "Yonas Tadesse",
    description: "Platform admin, approve clubs, manage users",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20",
    activeColor: "bg-purple-500 text-white",
    dashboardPath: "/admin",
  },
} as const

export function DemoBanner() {
  const { isDemoMode, setDemoMode } = useDemoStore()
  const { user } = useAuthStore()

  if (!isDemoMode) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Zap className="w-4 h-4" />
          <span>DEMO MODE</span>
          <span className="hidden sm:inline">- All data is simulated</span>
          {user && (
            <span className="hidden md:inline ml-2 px-2 py-0.5 bg-amber-600/30 rounded text-xs">
              Viewing as: {user.firstName} {user.lastName} ({user.role})
            </span>
          )}
        </div>
        <button
          onClick={() => setDemoMode(false)}
          className="p-1 hover:bg-amber-600/30 rounded transition-colors"
          aria-label="Exit demo mode"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function DemoModeToggle() {
  const { isDemoMode, setDemoMode } = useDemoStore()

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground hidden sm:inline">Demo</span>
      <button
        onClick={() => setDemoMode(!isDemoMode)}
        className={cn(
          "relative w-10 h-5 rounded-full transition-colors",
          isDemoMode ? "bg-amber-500" : "bg-muted"
        )}
        aria-label="Toggle demo mode"
      >
        <span
          className={cn(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
            isDemoMode ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  )
}

export function RoleSwitcher() {
  const { isDemoMode, currentRole, switchRole } = useDemoStore()
  const router = useRouter()
  const pathname = usePathname()

  if (!isDemoMode) return null

  const handleRoleSwitch = (role: 'student' | 'officer' | 'admin') => {
    switchRole(role)
    // Navigate to the appropriate dashboard
    const targetPath = ROLE_CONFIG[role].dashboardPath
    if (pathname !== targetPath) {
      router.push(targetPath)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-card border border-border rounded-xl shadow-xl p-4 space-y-3 min-w-[280px]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-foreground">Switch Role</h3>
          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">
            Demo Mode
          </span>
        </div>
        
        <div className="space-y-2">
          {(Object.keys(ROLE_CONFIG) as Array<keyof typeof ROLE_CONFIG>).map((role) => {
            const config = ROLE_CONFIG[role]
            const Icon = config.icon
            const isActive = currentRole === role
            const user = DEMO_USERS[role]

            return (
              <button
                key={role}
                onClick={() => handleRoleSwitch(role)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg border transition-all",
                  isActive
                    ? config.activeColor + " border-transparent"
                    : config.color
                )}
              >
                <Avatar className="w-10 h-10 border-2 border-white/20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    <Icon className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{config.label}</span>
                    {isActive && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-white/20 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    "text-xs",
                    isActive ? "text-white/80" : "text-muted-foreground"
                  )}>
                    {config.name}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-[10px] text-muted-foreground text-center">
            Click a role to instantly switch and view their dashboard
          </p>
        </div>
      </div>
    </div>
  )
}

export function QuickDemoStart() {
  const { isDemoMode, switchRole } = useDemoStore()
  const router = useRouter()

  if (isDemoMode) return null

  const handleQuickDemo = (role: 'student' | 'officer' | 'admin') => {
    switchRole(role)
    router.push(ROLE_CONFIG[role].dashboardPath)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <p className="text-sm text-muted-foreground text-center sm:hidden mb-2">
        Try the demo:
      </p>
      {(Object.keys(ROLE_CONFIG) as Array<keyof typeof ROLE_CONFIG>).map((role) => {
        const config = ROLE_CONFIG[role]
        const Icon = config.icon
        return (
          <Button
            key={role}
            variant="outline"
            onClick={() => handleQuickDemo(role)}
            className={cn("gap-2", config.color)}
          >
            <Icon className="w-4 h-4" />
            Try as {config.label}
          </Button>
        )
      })}
    </div>
  )
}
