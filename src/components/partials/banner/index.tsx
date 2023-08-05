export function Banner({ title, className }: { title: string; className: string }) {
  return (
    <section
      className={`w-full bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-800 text-white h-20 flex items-center justify-center ${className}`}
    >
      <h1 className="text-3xl">{title}</h1>
    </section>
  )
}
