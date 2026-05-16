import Link from "next/link"
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/5 blur-[120px]" />
      </div>
      
      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
          <FileQuestion className="w-10 h-10 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tight text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/discover">
              <Search className="w-4 h-4" />
              Discover Clubs
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  )
}
