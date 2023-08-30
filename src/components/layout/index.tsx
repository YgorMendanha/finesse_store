import { ToastContainer } from 'react-toastify'
import { Footer } from './components/footer'
import Header from './components/header'

export function Layout({ children, lang }: { children: React.ReactNode; lang: 'pt' | 'en' }) {
  return (
    <main
      className={`min-h-screen font-geo bg-slate-50 selection:bg-indigo-100 selection:text-indigo-500`}
    >
      <Header lang={lang} />
      {children}
      <Footer lang={lang} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  )
}
