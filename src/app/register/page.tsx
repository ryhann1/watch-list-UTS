export default function Register() {
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
            Register
          </h1>

          <p className="mt-2 text-zinc-400">
            Buat akun untuk menggunakan Watchlog.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Nama
              </label>

              <input
                type="text"
                placeholder="Masukkan nama"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />
            </div>

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

            <div>
            <label className="mb-2 block text-sm font-medium">
                Konfirmasi Password
            </label>

            <input
                type="password"
                placeholder="Masukkan ulang password"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />
            </div>

            <a
              href="/login"
              className="block w-full rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Register
            </a>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Sudah punya akun?{" "}
            <a
              href="/login"
              className="text-white underline underline-offset-4"
            >
              Login
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}