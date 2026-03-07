import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { HeroUIProvider } from '@heroui/react'
import { Star } from 'lucide-react'
import { BUILTIN, CAT_MIGRATION } from './data/builtin'
import type { CustomResource, EditedBuiltin, DeletedBuiltin, FavItem, ResourceWithMeta, Resource, MergedCategory, Difficulty } from './types'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import CardSection from './components/CardSection'
import ResourceCard from './components/ResourceCard'
import AddModal from './components/AddModal'
import SubmitModal from './components/SubmitModal'
import ConfirmModal from './components/ConfirmModal'
import RandomModal from './components/RandomModal'
import ImgModal from './components/ImgModal'
import Toast from './components/Toast'
import ContextMenu from './components/ContextMenu'

function loadStorage<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback } catch { return fallback }
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [customItems, setCustomItems] = useState<CustomResource[]>(() => {
    const items = loadStorage<CustomResource[]>('vault_custom', [])
    let migrated = false
    items.forEach(ci => { if (CAT_MIGRATION[ci.category]) { ci.category = CAT_MIGRATION[ci.category]; migrated = true } })
    if (migrated) { try { localStorage.setItem('vault_custom', JSON.stringify(items)) } catch {} }
    return items
  })
  const [favorites, setFavorites] = useState<FavItem[]>(() => loadStorage('vault_favs', []))
  const [deletedBuiltins, setDeletedBuiltins] = useState<DeletedBuiltin[]>(() => loadStorage('vault_deleted_builtins', []))
  const [editedBuiltins, setEditedBuiltins] = useState<EditedBuiltin[]>(() => loadStorage('vault_edited_builtins', []))

  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null)
  const [favOnly, setFavOnly] = useState(false)
  const [toast, setToast] = useState({ message: '', show: false })

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [submitModalOpen, setSubmitModalOpen] = useState(false)
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; name: string; callback: () => void }>({ open: false, name: '', callback: () => {} })
  const [randomItem, setRandomItem] = useState<ResourceWithMeta | null>(null)
  const [imgModalOpen, setImgModalOpen] = useState(false)
  const [editState, setEditState] = useState<{ mode: boolean; originalName: string | null; originalUrl: string | null; isCustom: boolean; prefill?: Partial<CustomResource> }>({ mode: false, originalName: null, originalUrl: null, isCustom: false })
  const [ctxMenu, setCtxMenu] = useState<{ open: boolean; x: number; y: number; target: ResourceWithMeta | null }>({ open: false, x: 0, y: 0, target: null })

  const searchRef = useRef<HTMLInputElement>(null)
  const syncTimer = useRef<ReturnType<typeof setTimeout>>()
  const toastTimer = useRef<ReturnType<typeof setTimeout>>()

  const showToast = useCallback((msg: string) => {
    setToast({ message: msg, show: true })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 2500)
  }, [])

  const syncToCloud = useCallback((items: CustomResource[], favs: FavItem[], deleted: DeletedBuiltin[], edited: EditedBuiltin[], admin: boolean) => {
    if (!admin) return
    clearTimeout(syncTimer.current)
    syncTimer.current = setTimeout(async () => {
      try {
        await fetch('/api/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ custom: items, favorites: favs, deletedBuiltins: deleted, editedBuiltins: edited }) })
      } catch {}
    }, 1500)
  }, [])

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' })
        const data = await res.json()
        setIsAuthenticated(data.authenticated)
        setIsAdmin(data.isAdmin)
        if (data.isAdmin) {
          try {
            const sync = await fetch('/api/sync')
            const sd = await sync.json()
            if (sd.custom && Array.isArray(sd.custom)) { setCustomItems(sd.custom); localStorage.setItem('vault_custom', JSON.stringify(sd.custom)) }
            if (sd.favorites && Array.isArray(sd.favorites)) { setFavorites(sd.favorites); localStorage.setItem('vault_favs', JSON.stringify(sd.favorites)) }
            if (sd.deletedBuiltins && Array.isArray(sd.deletedBuiltins)) { setDeletedBuiltins(sd.deletedBuiltins); localStorage.setItem('vault_deleted_builtins', JSON.stringify(sd.deletedBuiltins)) }
            if (sd.editedBuiltins && Array.isArray(sd.editedBuiltins)) { setEditedBuiltins(sd.editedBuiltins); localStorage.setItem('vault_edited_builtins', JSON.stringify(sd.editedBuiltins)) }
          } catch {}
        }
      } catch { setIsAuthenticated(false); setIsAdmin(false) }
    }
    init()
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault(); searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const mergedData = useMemo((): MergedCategory[] => {
    const merged: MergedCategory[] = BUILTIN.map(cat => {
      const items = cat.items
        .filter(i => !i.adminOnly || isAdmin)
        .filter(i => !deletedBuiltins.some(d => d.name === i.name && d.url === i.url))
        .map(i => {
          const edited = editedBuiltins.find(e => e.originalName === i.name && e.originalUrl === i.url)
          if (edited) return { ...i, name: edited.name, url: edited.url, tag: edited.tag, desc: edited.desc, difficulty: edited.difficulty !== undefined ? edited.difficulty : i.difficulty, category: edited.category || cat.category, builtinEdited: true }
          return { ...i }
        })
      return { ...cat, items }
    })

    editedBuiltins.forEach(edited => {
      if (edited.category) {
        const originalCat = BUILTIN.find(c => c.items.some(i => i.name === edited.originalName && i.url === edited.originalUrl))
        if (originalCat && edited.category !== originalCat.category) {
          const src = merged.find(s => s.category === originalCat.category)
          if (src) {
            const idx = src.items.findIndex(i => i.name === edited.name && i.url === edited.url)
            if (idx !== -1) {
              const [moved] = src.items.splice(idx, 1)
              let dest = merged.find(s => s.category === edited.category)
              if (!dest) { dest = { category: edited.category, icon: 'folder', color: '#888', items: [] }; merged.push(dest) }
              dest.items.push(moved)
            }
          }
        }
      }
    })

    customItems.forEach(ci => {
      if (ci.isPrivate && !isAdmin) return
      let section = merged.find(s => s.category === ci.category)
      if (!section) { section = { category: ci.category, icon: 'folder', color: '#888', items: [] }; merged.push(section) }
      section.items.push({ ...ci, custom: true })
    })

    return merged.filter(cat => cat.items.length > 0)
  }, [customItems, deletedBuiltins, editedBuiltins, isAdmin])

  const isFav = useCallback((name: string, url: string) => favorites.some(f => f.name === name && f.url === url), [favorites])

  const toggleFav = useCallback((name: string, url: string) => {
    setFavorites(prev => {
      const next = isFav(name, url) ? prev.filter(f => !(f.name === name && f.url === url)) : [...prev, { name, url }]
      try { localStorage.setItem('vault_favs', JSON.stringify(next)) } catch {}
      syncToCloud(customItems, next, deletedBuiltins, editedBuiltins, isAdmin)
      return next
    })
  }, [isFav, syncToCloud, customItems, deletedBuiltins, editedBuiltins, isAdmin])

  const favItems = useMemo((): ResourceWithMeta[] => {
    const result: ResourceWithMeta[] = []
    mergedData.forEach(cat => {
      cat.items.forEach(item => {
        if (isFav(item.name, item.url)) result.push({ ...item, category: cat.category, catColor: cat.color, catIcon: cat.icon })
      })
    })
    return result
  }, [mergedData, isFav])

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    const match = (i: { name: string; desc: string; tag: string }) => !q || i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q) || i.tag.toLowerCase().includes(q)
    const diffMatch = (i: { difficulty?: string | null }) => !activeDifficulty || i.difficulty === activeDifficulty
    const favMatch = (i: { name: string; url: string }) => !favOnly || isFav(i.name, i.url)
    return mergedData
      .map(s => ({ ...s, items: s.items.filter(i => match(i) && diffMatch(i) && favMatch(i)) }))
      .filter(s => (!activeFilter || s.category === activeFilter) && s.items.length > 0)
  }, [mergedData, searchQuery, activeDifficulty, activeFilter, favOnly, isFav])

  const stats = useMemo(() => {
    let total = 0; mergedData.forEach(c => total += c.items.length)
    return { total, cats: mergedData.length }
  }, [mergedData])

  const getAllCategories = useCallback(() => {
    const cats = BUILTIN.map(c => c.category)
    customItems.forEach(ci => { if (!cats.includes(ci.category)) cats.push(ci.category) })
    return cats
  }, [customItems])

  const handleContextMenu = useCallback((e: React.MouseEvent, item: Resource & { category: string; catColor: string; catIcon: string }) => {
    e.preventDefault()
    setCtxMenu({ open: true, x: Math.min(e.clientX, window.innerWidth - 160), y: Math.min(e.clientY, window.innerHeight - 120), target: item as ResourceWithMeta })
  }, [])

  const handleEdit = useCallback(() => {
    const target = ctxMenu.target; if (!target) return
    setCtxMenu(m => ({ ...m, open: false }))
    const isCustom = !!target.custom
    const origName = target.builtinEdited ? (editedBuiltins.find(e => e.name === target.name && e.url === target.url)?.originalName ?? target.name) : target.name
    const origUrl = target.builtinEdited ? (editedBuiltins.find(e => e.name === target.name && e.url === target.url)?.originalUrl ?? target.url) : target.url
    setEditState({ mode: true, originalName: origName, originalUrl: origUrl, isCustom, prefill: { name: target.name, url: target.url, tag: target.tag, desc: target.desc, difficulty: target.difficulty ?? undefined, category: target.category, isPrivate: target.isPrivate } })
    setAddModalOpen(true)
  }, [ctxMenu.target, editedBuiltins])

  const handleDelete = useCallback(() => {
    const target = ctxMenu.target; if (!target) return
    setCtxMenu(m => ({ ...m, open: false }))
    const { name, url } = target; const isCustom = !!target.custom
    setConfirmModal({
      open: true, name,
      callback: () => {
        if (isCustom) {
          setCustomItems(prev => {
            const next = prev.filter(c => !(c.name === name && c.url === url))
            try { localStorage.setItem('vault_custom', JSON.stringify(next)) } catch {}
            syncToCloud(next, favorites, deletedBuiltins, editedBuiltins, isAdmin)
            return next
          })
        } else {
          const origName = target.builtinEdited ? (editedBuiltins.find(e => e.name === name && e.url === url)?.originalName ?? name) : name
          const origUrl = target.builtinEdited ? (editedBuiltins.find(e => e.name === name && e.url === url)?.originalUrl ?? url) : url
          setDeletedBuiltins(prev => {
            const nextDeleted = [...prev, { name: origName, url: origUrl }]
            setEditedBuiltins(eb => {
              const nextEb = eb.filter(e => !(e.originalName === origName && e.originalUrl === origUrl))
              try { localStorage.setItem('vault_deleted_builtins', JSON.stringify(nextDeleted)) } catch {}
              try { localStorage.setItem('vault_edited_builtins', JSON.stringify(nextEb)) } catch {}
              syncToCloud(customItems, favorites, nextDeleted, nextEb, isAdmin)
              return nextEb
            })
            return nextDeleted
          })
        }
        showToast('Ressource supprimée')
      },
    })
  }, [ctxMenu.target, editedBuiltins, favorites, deletedBuiltins, customItems, syncToCloud, isAdmin, showToast])

  const handleAddSave = useCallback((data: { name: string; url: string; tag: string; desc: string; category: string; difficulty: Difficulty | null; isPrivate: boolean }) => {
    if (editState.mode && editState.originalName) {
      if (editState.isCustom) {
        setCustomItems(prev => {
          const next = [...prev]
          const idx = next.findIndex(c => c.name === editState.originalName && c.url === editState.originalUrl)
          if (idx !== -1) next[idx] = { ...data }
          try { localStorage.setItem('vault_custom', JSON.stringify(next)) } catch {}
          syncToCloud(next, favorites, deletedBuiltins, editedBuiltins, isAdmin)
          return next
        })
      } else {
        setEditedBuiltins(prev => {
          const entry: EditedBuiltin = { originalName: editState.originalName!, originalUrl: editState.originalUrl!, name: data.name, url: data.url, tag: data.tag, desc: data.desc, category: data.category, difficulty: data.difficulty }
          const idx = prev.findIndex(e => e.originalName === editState.originalName && e.originalUrl === editState.originalUrl)
          const next = idx !== -1 ? [...prev.slice(0, idx), entry, ...prev.slice(idx + 1)] : [...prev, entry]
          try { localStorage.setItem('vault_edited_builtins', JSON.stringify(next)) } catch {}
          syncToCloud(customItems, favorites, deletedBuiltins, next, isAdmin)
          return next
        })
      }
      showToast('Ressource modifiée')
    } else {
      setCustomItems(prev => {
        const next = [...prev, { ...data }]
        try { localStorage.setItem('vault_custom', JSON.stringify(next)) } catch {}
        syncToCloud(next, favorites, deletedBuiltins, editedBuiltins, isAdmin)
        return next
      })
      showToast('Ressource ajoutée !')
    }
    setAddModalOpen(false)
    setEditState({ mode: false, originalName: null, originalUrl: null, isCustom: false })
  }, [editState, favorites, deletedBuiltins, editedBuiltins, customItems, syncToCloud, isAdmin, showToast])

  const showRandom = useCallback(() => {
    const all: ResourceWithMeta[] = []
    mergedData.forEach(s => s.items.forEach(i => {
      if (i.url !== '#acronyms' && (!activeDifficulty || i.difficulty === activeDifficulty))
        all.push({ ...i, category: s.category, catColor: s.color, catIcon: s.icon })
    }))
    if (!all.length) { showToast('Aucune ressource disponible'); return }
    setRandomItem(all[Math.floor(Math.random() * all.length)])
  }, [mergedData, activeDifficulty, showToast])

  const progressionSection = filteredData.find(s => s.category === 'Ma Progression')
  const otherSections = filteredData.filter(s => s.category !== 'Ma Progression')
  const filteredFavItems = favItems.filter(item => {
    const q = searchQuery.toLowerCase().trim()
    return (!q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)) && (!activeDifficulty || item.difficulty === activeDifficulty)
  })
  const totalVisible = filteredData.reduce((acc, s) => acc + s.items.length, 0)

  return (
    <HeroUIProvider>
      <div className="relative min-h-screen overflow-hidden" style={{ background: '#0a0a0f' }}>
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />
        <div className="orb pointer-events-none fixed" style={{ top: '-15%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)' }} />
        <div className="orb-2 pointer-events-none fixed" style={{ bottom: '-20%', right: '-10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)' }} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-12 pt-0">
          <Header
            stats={stats}
            isAdmin={isAdmin}
            isAuthenticated={isAuthenticated}
            searchQuery={searchQuery}
            searchRef={searchRef}
            onSearchChange={setSearchQuery}
            onTitleClick={() => { setActiveFilter(null); setFavOnly(false); setSearchQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            onAddClick={() => { setEditState({ mode: false, originalName: null, originalUrl: null, isCustom: false }); setAddModalOpen(true) }}
            onSubmitClick={() => setSubmitModalOpen(true)}
            onRandomClick={showRandom}
          />

          <FilterBar
            data={mergedData}
            activeFilter={activeFilter}
            activeDifficulty={activeDifficulty}
            favOnly={favOnly}
            onFilterChange={setActiveFilter}
            onDifficultyChange={setActiveDifficulty}
            onFavOnlyChange={setFavOnly}
          />

          <div>
            {progressionSection && (
              <CardSection
                section={progressionSection}
                variant="progression"
                isFav={isFav}
                isAdmin={isAdmin}
                onFavToggle={toggleFav}
                onContextMenu={handleContextMenu}
                onOpenImg={() => setImgModalOpen(true)}
              />
            )}

            {!favOnly && filteredFavItems.length > 0 && !activeFilter && (
              <div className="mb-8 p-4 rounded-2xl border" style={{ background: 'rgba(251,191,36,0.03)', borderColor: 'rgba(251,191,36,0.1)' }}>
                <div className="flex items-center gap-2.5 mb-3" style={{ borderBottom: '1px solid rgba(251,191,36,0.08)', paddingBottom: 10 }}>
                  <span style={{ color: 'var(--yellow)' }}><Star size={18} fill="currentColor" /></span>
                  <h2 className="section-title" style={{ color: 'var(--yellow)' }}>Favoris</h2>
                  <span className="ml-auto text-[11px] px-2.5 py-0.5 rounded-full" style={{ color: '#555', background: 'rgba(255,255,255,0.03)' }}>
                    {filteredFavItems.length}
                  </span>
                </div>
                <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                  {filteredFavItems.map(item => (
                    <ResourceCard
                      key={`fav-${item.name}-${item.url}`}
                      item={item}
                      color={item.catColor}
                      isFav
                      isAdmin={isAdmin}
                      onFavToggle={toggleFav}
                      onContextMenu={handleContextMenu}
                      onOpenImg={() => setImgModalOpen(true)}
                      catIcon={item.catIcon}
                    />
                  ))}
                </div>
              </div>
            )}

            {otherSections.map(section => (
              <CardSection
                key={section.category}
                section={section}
                isFav={isFav}
                isAdmin={isAdmin}
                onFavToggle={toggleFav}
                onContextMenu={handleContextMenu}
                onOpenImg={() => setImgModalOpen(true)}
              />
            ))}

            {totalVisible === 0 && (
              <div className="text-center py-12 px-5" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                <div className="text-3xl mb-2.5" style={{ color: 'rgba(124,58,237,0.4)' }}>⌕</div>
                {searchQuery
                  ? `Aucune ressource trouvée pour "${searchQuery}"`
                  : favOnly ? 'Aucun favori pour le moment' : 'Aucune ressource'}
              </div>
            )}
          </div>
        </div>

        <AddModal
          isOpen={addModalOpen}
          editMode={editState.mode}
          categories={getAllCategories()}
          prefill={editState.prefill}
          onClose={() => { setAddModalOpen(false); setEditState({ mode: false, originalName: null, originalUrl: null, isCustom: false }) }}
          onSave={handleAddSave}
        />
        <SubmitModal
          isOpen={submitModalOpen}
          onClose={() => setSubmitModalOpen(false)}
          onSubmit={async data => {
            const res = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Erreur') }
            showToast('Proposition envoyée, merci !')
          }}
        />
        <ConfirmModal
          isOpen={confirmModal.open}
          name={confirmModal.name}
          onClose={() => setConfirmModal(m => ({ ...m, open: false }))}
          onConfirm={() => { confirmModal.callback(); setConfirmModal(m => ({ ...m, open: false })) }}
        />
        <RandomModal
          item={randomItem}
          isOpen={!!randomItem}
          onClose={() => setRandomItem(null)}
          onAgain={showRandom}
        />
        <ImgModal isOpen={imgModalOpen} onClose={() => setImgModalOpen(false)} />
        <Toast message={toast.message} show={toast.show} />
        <ContextMenu
          open={ctxMenu.open}
          x={ctxMenu.x}
          y={ctxMenu.y}
          isAdmin={isAdmin}
          onClose={() => setCtxMenu(m => ({ ...m, open: false }))}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCopy={() => { navigator.clipboard.writeText(ctxMenu.target?.url ?? '').then(() => showToast('URL copiée')); setCtxMenu(m => ({ ...m, open: false })) }}
        />
      </div>
    </HeroUIProvider>
  )
}
