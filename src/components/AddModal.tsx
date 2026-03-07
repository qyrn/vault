import { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from '@heroui/react'
import { Loader2 } from 'lucide-react'
import type { Difficulty } from '../types'

interface SaveData {
  name: string
  url: string
  tag: string
  desc: string
  category: string
  difficulty: Difficulty | null
  isPrivate: boolean
}

interface Prefill {
  name?: string
  url?: string
  tag?: string
  desc?: string
  category?: string
  difficulty?: Difficulty | null
  isPrivate?: boolean
}

interface Props {
  isOpen: boolean
  editMode: boolean
  categories: string[]
  prefill?: Prefill
  onClose: () => void
  onSave: (data: SaveData) => void
}

function isValidUrl(str: string) {
  if (str.startsWith('#') || str.startsWith('/')) return true
  try {
    const u = new URL(str)
    return ['http:', 'https:'].includes(u.protocol)
  } catch { return false }
}

export default function AddModal({ isOpen, editMode, categories, prefill, onClose, onSave }: Props) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [tag, setTag] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState(categories[0] ?? '')
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [newCatInput, setNewCatInput] = useState('')
  const [showNewCat, setShowNewCat] = useState(false)
  const [fetchStatus, setFetchStatus] = useState<{ text: string; type: 'ok' | 'err' | '' }>({ text: '', type: '' })
  const [fetchLoading, setFetchLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setName(prefill?.name ?? '')
      setUrl(prefill?.url ?? '')
      setTag(prefill?.tag ?? '')
      setDesc(prefill?.desc ?? '')
      setCategory(prefill?.category ?? categories[0] ?? '')
      setDifficulty((prefill?.difficulty as Difficulty) ?? '')
      setIsPrivate(prefill?.isPrivate ?? false)
      setNewCatInput('')
      setShowNewCat(false)
      setFetchStatus({ text: '', type: '' })
    }
  }, [isOpen, prefill, categories])

  const handleFetch = async () => {
    let targetUrl = url.trim()
    if (targetUrl && !targetUrl.startsWith('http://') && !targetUrl.startsWith('https://') && !targetUrl.startsWith('#') && !targetUrl.startsWith('/')) {
      targetUrl = 'https://' + targetUrl
      setUrl(targetUrl)
    }
    if (!targetUrl) { setFetchStatus({ text: 'URL requise', type: 'err' }); return }
    setFetchLoading(true)
    setFetchStatus({ text: '', type: '' })
    try {
      const res = await fetch(`/api/extract?url=${encodeURIComponent(targetUrl)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      if (data.title && !name.trim()) setName(data.title)
      if (data.description) setDesc(data.description)
      if (data.tag) setTag(data.tag)
      setFetchStatus({ text: data.source === 'gemini' ? 'Analysé par IA' : 'Récupéré (fallback regex)', type: 'ok' })
    } catch (err) {
      setFetchStatus({ text: 'Erreur: ' + (err instanceof Error ? err.message : 'inconnue'), type: 'err' })
    }
    setFetchLoading(false)
  }

  const handleSave = () => {
    let finalUrl = url.trim()
    if (finalUrl && !finalUrl.startsWith('http://') && !finalUrl.startsWith('https://') && !finalUrl.startsWith('#') && !finalUrl.startsWith('/')) {
      finalUrl = 'https://' + finalUrl
    }
    if (!name.trim() || !finalUrl) return
    if (!isValidUrl(finalUrl)) return

    const finalCategory = showNewCat && newCatInput.trim() ? newCatInput.trim() : category

    onSave({
      name: name.trim(),
      url: finalUrl,
      tag: tag.trim() || 'Autre',
      desc: desc.trim() || 'Pas de description',
      category: finalCategory,
      difficulty: (difficulty as Difficulty) || null,
      isPrivate,
    })
  }

  const inputClass = {
    inputWrapper: 'bg-white/[0.04] border border-white/[0.08] rounded-lg data-[focus=true]:border-violet-600/50 shadow-none hover:bg-white/[0.06]',
    input: 'text-[13px] text-[#e2e2e8] placeholder:text-[#555] font-[Outfit]',
    label: 'text-[11px] text-white/40 tracking-widest uppercase font-[Outfit]',
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: 'bg-[#111118] border border-white/[0.08] rounded-2xl max-w-lg w-full max-h-[90vh]',
        header: 'pb-0',
        body: 'gap-3 py-4',
        footer: 'pt-2',
      }}
      scrollBehavior="inside"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h3 className="text-base" style={{ color: '#a78bfa', fontFamily: 'Syne, sans-serif' }}>
                {editMode ? 'Éditer la ressource' : '+ Nouvelle ressource'}
              </h3>
            </ModalHeader>
            <ModalBody>
              <Input label="Nom" value={name} onValueChange={setName} placeholder="Ex: HackTricks" classNames={inputClass} labelPlacement="outside" />
              <Input label="URL" value={url} onValueChange={setUrl} placeholder="https://..." classNames={inputClass} labelPlacement="outside" />

              <button
                onClick={handleFetch}
                disabled={fetchLoading}
                className="flex items-center gap-1.5 text-[11px] px-3.5 py-2 rounded-lg border transition-all cursor-pointer disabled:opacity-40"
                style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.25)', color: '#a78bfa', fontFamily: 'Outfit, sans-serif' }}
              >
                <Loader2 size={12} className={fetchLoading ? 'lucide-spin' : ''} />
                Analyser avec l'IA
              </button>

              {fetchStatus.text && (
                <span className="text-[10px]" style={{ color: fetchStatus.type === 'ok' ? '#4ade80' : '#f87171' }}>
                  {fetchStatus.text}
                </span>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-[11px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Catégorie</label>
                <select
                  value={showNewCat ? '__new' : category}
                  onChange={e => {
                    if (e.target.value === '__new') { setShowNewCat(true) }
                    else { setShowNewCat(false); setCategory(e.target.value) }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg text-[13px] outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e2e8', fontFamily: 'Outfit, sans-serif' }}
                >
                  {categories.map(c => <option key={c} value={c} style={{ background: '#111118' }}>{c}</option>)}
                  <option value="__new" style={{ background: '#111118' }}>+ Nouvelle catégorie...</option>
                </select>
                {showNewCat && (
                  <Input
                    value={newCatInput}
                    onValueChange={setNewCatInput}
                    placeholder="Nom de la nouvelle catégorie"
                    classNames={inputClass}
                  />
                )}
              </div>

              <Input label="Tag" value={tag} onValueChange={setTag} placeholder="Ex: Outil, CTF, Blog..." classNames={inputClass} labelPlacement="outside" />

              <div className="flex flex-col gap-1">
                <label className="text-[11px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Difficulté</label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value as Difficulty | '')}
                  className="w-full px-3.5 py-2.5 rounded-lg text-[13px] outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e2e8', fontFamily: 'Outfit, sans-serif' }}
                >
                  <option value="" style={{ background: '#111118' }}>Aucune</option>
                  <option value="Débutant" style={{ background: '#111118' }}>Débutant</option>
                  <option value="Intermédiaire" style={{ background: '#111118' }}>Intermédiaire</option>
                  <option value="Avancé" style={{ background: '#111118' }}>Avancé</option>
                </select>
              </div>

              <Textarea label="Description" value={desc} onValueChange={setDesc} placeholder="Description de la ressource..." classNames={inputClass} labelPlacement="outside" minRows={2} />

              <label className="flex items-center gap-2.5 cursor-pointer select-none mt-1">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={e => setIsPrivate(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: '#7c3aed', cursor: 'pointer' }}
                />
                <span className="text-xs" style={{ color: '#888' }}>Ressource privée (visible uniquement par moi)</span>
              </label>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose} className="rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                Annuler
              </Button>
              <Button variant="flat" onPress={handleSave} className="rounded-lg text-xs" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', color: '#a78bfa' }}>
                {editMode ? 'Sauvegarder' : 'Ajouter'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
