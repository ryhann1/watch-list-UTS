export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <nav className="border-b border-zinc-800">
        <div className="flex items-center justify-between px-8 py-5">
          <a
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            WATCHLOG
          </a>

          <a
            href="/login"
            className="text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            Login
          </a>
        </div>
      </nav>

      <section className="px-8 pt-16">
        <div className="text-left">
          <h1 className="text-3xl font-bold tracking-tight">
            WATCHLOG
          </h1>

          <p className="mt-2 text-zinc-400">
            Easy way to make your movie watchlist
          </p>
        </div>
      </section>
    </main>
  );
}