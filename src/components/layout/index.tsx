import { Footer } from './components/footer'
import Header from './components/header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`h-screen font-geo`}>
      <Header />
      {children}
      <Footer />
    </main>
  )
}
