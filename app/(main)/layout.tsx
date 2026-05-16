import { MainNav, Footer } from "@/components/layout/main-layout"
import { AIChatbot } from "@/components/ai-chatbot"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainNav />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {children}
      </main>
      <Footer />
      <AIChatbot />
    </div>
  )
}
