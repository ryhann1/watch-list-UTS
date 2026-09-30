import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditFilm({ params }: Props) {
  const { id } = await params;

  const film = await prisma.film.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!film) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="text-2xl font-bold">
          Film tidak ditemukan
        </h1>

        <a
          href="/watchlist"
          className="mt-4 inline-block text-zinc-400 hover:text-white"
        >
          ← Kembali ke Watchlist
        </a>
      </main>
    );
  }

  const filmId = film.id;

  async function editFilm(formData: FormData) {
    "use server";

    const judul = formData.get("judul")?.toString().trim();
    const genre = formData.get("genre")?.toString().trim();
    const status = formData.get("status")?.toString();

    if (!judul || !genre || !status) {
      return;
    }

    await prisma.film.update({
      where: {
        id: filmId,
      },
      data: {
        judul,
        genre,
        status,
      },
    });

    redirect("/watchlist");
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <nav className="border-b border-zinc-800">
        <div className="flex items-center px-8 py-5">
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
          Edit Film
        </h1>

        <p className="mt-2 text-zinc-400">
          Ubah informasi dan status film.
        </p>

        <form action={editFilm} className="mt-8 space-y-5">

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
              defaultValue={film.judul}
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
              defaultValue={film.genre}
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              defaultValue={
                film.status === "Watchlist"
                  ? "Watching"
                  : film.status
              }
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            >
              <option value="Watching">
                Watching
              </option>

              <option value="Watched">
                Watched
              </option>
            </select>
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
              Simpan Perubahan
            </button>
          </div>

        </form>
      </section>
    </main>
  );
}