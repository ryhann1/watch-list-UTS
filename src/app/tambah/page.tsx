import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";

export default function TambahFilm() {
  async function tambahFilm(formData: FormData) {
    "use server";

    const judul = formData.get("judul")?.toString().trim();
    const genre = formData.get("genre")?.toString().trim();

    if (!judul || !genre) {
      return;
    }

    await prisma.film.create({
      data: {
        judul,
        genre,
      },
    });

    redirect("/watchlist");
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <a
            href="/watchlist"
            className="text-xl font-bold tracking-tight"
          >
            WATCHLOG
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-2xl px-6 pt-16">
        <h1 className="text-3xl font-bold tracking-tight">
          Tambah Film
        </h1>

        <p className="mt-2 text-zinc-400">
          Tambahkan film baru ke dalam watchlist.
        </p>

        <form action={tambahFilm} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="judul"
              className="mb-2 block text-sm font-medium"
            >
              Judul Film
            </label>

            <input
              id="judul"
              type="text"
              name="judul"
              placeholder="Masukkan judul film"
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />
          </div>

          <div>
            <label
              htmlFor="genre"
              className="mb-2 block text-sm font-medium"
            >
              Genre
            </label>

            <input
              id="genre"
              type="text"
              name="genre"
              placeholder="Contoh: Action, Drama, Sci-Fi"
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <a
              href="/watchlist"
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm transition hover:bg-zinc-900"
            >
              Batal
            </a>

            <button
              type="submit"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Simpan Film
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}