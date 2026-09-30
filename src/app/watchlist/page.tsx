import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";

export default async function Watchlist() {
  const films = await prisma.film.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  async function hapusFilm(formData: FormData) {
    "use server";

    const id = formData.get("id")?.toString();

    if (!id) {
      return;
    }

    await prisma.film.delete({
      where: {
        id: Number(id),
      },
    });

    redirect("/watchlist");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800">
        <div className="flex items-center justify-between px-8 py-5">
          <a
            href="/watchlist"
            className="text-xl font-bold tracking-tight"
          >
            WATCHLOG
          </a>

          <a
            href="/"
            className="text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            Logout
          </a>
        </div>
      </nav>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl">

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Watchlist Film
            </h1>

            <p className="mt-2 text-zinc-400">
              Kelola daftar film yang ingin kamu tonton.
            </p>

            <div className="mt-5">
              <a
                href="/tambah"
                className="inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                + Tambah Film
              </a>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-zinc-700 p-6">
            {films.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-zinc-400">
                  Belum ada film di watchlist.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {films.map((film) => (
                  <div
                    key={film.id}
                    className="rounded-3xl border border-zinc-700 bg-zinc-950 p-4 transition hover:border-zinc-500"
                  >
                    <div className="flex min-h-[240px] flex-col">

                      <div>
                        <h2 className="text-lg font-bold">
                          {film.judul}
                        </h2>

                        <p className="mt-1 text-sm text-zinc-400">
                          {film.genre}
                        </p>
                      </div>

                      <div className="mt-auto">

                        <span
                          className={`inline-block rounded-full border px-2.5 py-1 text-xs font-medium ${
                            film.status === "Watched"
                              ? "border-white bg-white text-black"
                              : film.status === "Watching"
                              ? "border-zinc-400 bg-zinc-400 text-black"
                              : "border-zinc-700 bg-zinc-900 text-zinc-300"
                          }`}
                        >
                          {film.status}
                        </span>

                        <div className="mt-4 flex gap-2">

                          <a
                            href={`/edit/${film.id}`}
                            className="flex-1 rounded-lg border border-zinc-700 px-2 py-2 text-center text-xs transition hover:bg-zinc-800"
                          >
                            Edit
                          </a>

                          <form
                            action={hapusFilm}
                            className="flex-1"
                          >
                            <input
                              type="hidden"
                              name="id"
                              value={film.id}
                            />

                            <button
                              type="submit"
                              className="w-full rounded-lg border border-zinc-700 px-2 py-2 text-xs transition hover:bg-zinc-800"
                            >
                              Hapus
                            </button>
                          </form>

                        </div>
                      </div>

                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}