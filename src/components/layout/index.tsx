import { Footer } from './components/footer'
import Header from './components/header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`min-h-screen font-geo bg-slate-50 selection:bg-indigo-100 selection:text-indigo-500`}>
      <Header />
      {children}
      <Footer />
    </main>
  )
}
