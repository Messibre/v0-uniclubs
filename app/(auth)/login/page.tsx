"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogIn, AlertCircle } from "lucide-react"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const router = useRouter()
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    clearError()
  }, [email, password, clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
      router.push("/dashboard")
    }
  }

  const setDemoCredentials = (type: "student" | "officer" | "admin") => {
    if (type === "admin") {
      setEmail("admin@aau.edu.et")
      setPassword("Admin@1234")
    } else {
      setEmail("abebe@aau.edu.et")
      setPassword("Abebe123")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 z-10 group">
        <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl group-hover:shadow-glow transition-all duration-300">
          U
        </div>
        <span className="font-bold text-3xl tracking-tight">
          Uni<span className="text-primary">Clubs</span>
        </span>
      </Link>

      <Card className="w-full max-w-md z-10 animate-slide-up border-border/50 bg-card/80 backdrop-blur-xl">
        <CardHeader className="space-y-2 pb-6 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive/90 leading-tight">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Student ID</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <div className="flex justify-end">
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary focus:ring-offset-background"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none text-muted-foreground cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button type="submit" className="w-full shadow-glow py-3" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Sign up here
            </Link>
          </div>

          {/* Quick Demo Logins */}
          <div className="mt-6 pt-6 border-t border-border space-y-3">
            <p className="text-xs text-muted-foreground text-center font-medium uppercase tracking-wider">
              Quick Demo Login
            </p>
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>Admin: admin@aau.edu.et / Admin@1234</p>
              <p>Student: abebe@aau.edu.et / Abebe123</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDemoCredentials("student")}
                className="px-3 py-2 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-primary/10 border border-border hover:border-primary/40 transition-all"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials("officer")}
                className="px-3 py-2 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-secondary/10 border border-border hover:border-secondary/40 transition-all"
              >
                Officer
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials("admin")}
                className="px-3 py-2 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all"
              >
                Admin
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-muted-foreground/60 text-xs mt-8 text-center z-10">
        {"By logging in, you agree to your University's Terms of Service and Privacy Policy."}
      </p>
    </div>
  )
}
