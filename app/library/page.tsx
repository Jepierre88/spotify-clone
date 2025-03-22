// app/library/page.tsx
export default function LibraryPage() {
    // En futuras versiones conectamos esto al estado global de "favoritos"
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tu biblioteca</h1>
        <p className="text-neutral-400">Aquí se mostrarán tus canciones guardadas y playlists.</p>
      </main>
    )
  }
  