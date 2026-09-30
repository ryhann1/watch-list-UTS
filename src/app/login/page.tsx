export default function Login() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            WATCHLOG
          </a>
        </div>
      </nav>

      <section className="flex justify-center px-6 pt-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold tracking-tight">
            Login
          </h1>

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Masukkan email"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Masukkan password"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />
            </div>

            <a
              href="/watchlist"
              className="block w-full rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Login
            </a>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-white underline underline-offset-4"
            >
              Register
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}