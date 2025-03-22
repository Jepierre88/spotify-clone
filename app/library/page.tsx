import { Suspense } from 'react'
import LibraryContent from './library-content'

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="p-6">Cargando...</div>}>
      <LibraryContent />
    </Suspense>
  )
}