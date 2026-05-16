"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles, Calendar, Users, Trophy, ShieldCheck, ArrowRight, Zap, User, Building, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore, useDemoStore } from "@/lib/store"
import { useEffect } from "react"

const features = [
  {
    icon: <Users className="w-5 h-5 text-primary" />,
    title: "Discover clubs",
    description: "Browse student organizations, events, and projects designed for your interests.",
  },
  {
    icon: <Calendar className="w-5 h-5 text-primary" />,
    title: "Stay connected",
    description: "RSVP to events, track deadlines, and keep your campus life organized.",
  },
  {
    icon: <Trophy className="w-5 h-5 text-primary" />,
    title: "Celebrate achievements",
    description: "Showcase your progress, unlock badges, and share your club milestones.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    title: "Admin-ready governance",
    description: "Manage approvals, analytics, and compliance with intelligent tools.",
  },
]

const stats = [
  { value: "120+", label: "Clubs supported" },
  { value: "450+", label: "Events scheduled" },
  { value: "98%", label: "Member satisfaction" },
  { value: "24/7", label: "Campus support" },
]

export default function HomePage() {
  const { isAuthenticated } = useAuthStore()
  const { isDemoMode, switchRole } = useDemoStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && !isDemoMode) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isDemoMode, router])

  const handleQuickDemo = (role: 'student' | 'officer' | 'admin') => {
    switchRole(role)
    const paths = {
      student: '/dashboard',
      officer: '/officer/dashboard',
      admin: '/admin'
    }
    router.push(paths[role])
  }

  return (
    <div className="space-y-16 pt-8">
      {/* Hero Section */}
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20">
            <Sparkles className="w-4 h-4" /> New launch: Seamless campus club engagement.
          </div>
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              University club management made effortless.
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              UniClubs helps students, club officers, and admins discover clubs, manage events, and build community in one polished campus experience.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/register">
              <Button size="lg" className="shadow-glow">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3"
            >
              Already have an account?{" "}
              <span className="text-primary hover:underline">Sign in</span>
            </Link>
          </div>

          {/* Quick Demo Buttons */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-foreground">Try the Demo</span>
              <span className="text-xs text-muted-foreground ml-auto">No signup required</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Explore UniClubs as different user roles to see the full platform in action.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button
                variant="outline"
                onClick={() => handleQuickDemo('student')}
                className="gap-2 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-blue-600 dark:text-blue-400"
              >
                <User className="w-4 h-4" />
                Student
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickDemo('officer')}
                className="gap-2 border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400"
              >
                <Building className="w-4 h-4" />
                Officer
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickDemo('admin')}
                className="gap-2 border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-600 dark:text-purple-400"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Card */}
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-1 shadow-glow">
          <div className="h-full rounded-[1.4rem] bg-background p-6 sm:p-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-2xl bg-card p-4 sm:p-6 border border-border">
                <p className="text-xs uppercase tracking-widest text-primary font-medium">Featured</p>
                <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold">Join the community.</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Discover clubs, events, and projects curated for your campus journey.
                </p>
              </div>
              <div className="rounded-2xl bg-card p-4 sm:p-6 border border-border">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Next big event</p>
                    <h3 className="mt-2 text-lg sm:text-xl font-bold">Spring Innovation Fair</h3>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Open
                  </span>
                </div>
              </div>
              <div className="rounded-2xl bg-card p-4 sm:p-6 border border-border">
                <p className="text-sm text-muted-foreground">Campus spotlight</p>
                <h3 className="mt-2 sm:mt-3 text-lg sm:text-xl font-bold">Cultural Club</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Connect with student creatives, host performances, and celebrate campus culture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Designed for every campus role
          </h2>
          <p className="max-w-2xl text-base sm:text-lg leading-8 text-muted-foreground">
            From first-year students exploring clubs to officers managing events and university admins tracking campus engagement — UniClubs keeps your community aligned with one intuitive platform.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border-border hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 sm:mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_0.65fr] items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-primary font-medium">
              Built for student-led impact
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Launch your club, manage events, and measure success.
            </h2>
            <p className="text-sm sm:text-base leading-7 text-muted-foreground">
              Easily run club programs, keep members engaged, and let campus leadership make smarter decisions with real-time analytics and moderation tools.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-background p-5 border border-border">
              <p className="text-2xl sm:text-3xl font-bold text-primary">Club</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Registration workflow, roles, and announcements.
              </p>
            </div>
            <div className="rounded-2xl bg-background p-5 border border-border">
              <p className="text-2xl sm:text-3xl font-bold text-primary">Survey</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Collect feedback from members and campus stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
