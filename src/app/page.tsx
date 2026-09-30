import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

// Server Action untuk menghapus data anime
async function deleteAnime(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;

  if (id) {
    await prisma.anime.delete({
      where: { id: Number(id) },
    });
    // Refresh tampilan halaman utama setelah data dihapus
    revalidatePath('/');
  }
}

export default async function HomePage() {
  // Ambil semua data anime dari database
  const animes = await prisma.anime.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-sky-400">My Anime List</h1>
            <p className="text-sm text-slate-400 mt-1">
              Daftar koleksi anime favorit dan status tontonan.
            </p>
          </div>
          
          <div className="flex gap-3">
            {/* Tombol Cek API JSON */}
            <a
              href="/api/animes"
              target="_blank"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Cek API JSON
            </a>

            {/* Tombol Tambah Anime */}
            <Link
              href="/add"
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-md"
            >
              + Tambah Anime
            </Link>
          </div>
        </div>

        {/* Anime List / Card Grid */}
        {animes.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
            <p className="text-slate-400">Belum ada anime yang ditambahkan.</p>
            <Link
              href="/add"
              className="text-sky-400 hover:underline mt-2 inline-block text-sm"
            >
              Klik di sini untuk menambah data pertama
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animes.map((anime) => (
              <div
                key={anime.id}
                className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col justify-between hover:border-slate-600 transition shadow-lg"
              >
                <div>
                  {/* Badge Status & Genre */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-700 text-slate-300">
                      {anime.genre}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                        anime.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : anime.status === 'Watching'
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {anime.status}
                    </span>
                  </div>

                  {/* Title & Rating */}
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {anime.title}
                  </h2>
                  <div className="flex items-center text-amber-400 text-sm font-semibold mb-4">
                    <span className="mr-1">⭐</span>
                    <span>{anime.rating} / 10</span>
                  </div>
                </div>

                {/* Actions: Edit & Hapus */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-700/60 mt-2">
                  {/* Link Edit Dinamis */}
                  <Link
                    href={`/edit/${anime.id}`}
                    className="flex-1 text-center bg-slate-700 hover:bg-slate-600 text-slate-200 py-1.5 rounded-lg text-sm font-medium transition"
                  >
                    Edit
                  </Link>

                  {/* Form Hapus Data */}
                  <form action={deleteAnime} className="flex-1">
                    <input type="hidden" name="id" value={anime.id} />
                    <button
                      type="submit"
                      className="w-full bg-rose-600/80 hover:bg-rose-600 text-white py-1.5 rounded-lg text-sm font-medium transition"
                    >
                      Hapus
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}