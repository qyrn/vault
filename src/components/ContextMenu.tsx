import { useEffect, useRef } from 'react'

interface Props {
  open: boolean
  x: number
  y: number
  isAdmin: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
  onCopy: () => void
}

export default function ContextMenu({ open, x, y, isAdmin, onClose, onEdit, onDelete, onCopy }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = () => onClose()
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [open, onClose])

  if (!open) return null

  const itemClass = 'block w-full px-3.5 py-2 text-left text-[12px] rounded-md cursor-pointer transition-colors bg-transparent border-none'

  return (
    <div
      ref={ref}
      className="fixed z-[1200] rounded-[10px] p-1 min-w-[150px]"
      style={{
        top: y,
        left: x,
        background: '#111118',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.08)',
        fontFamily: 'Outfit, sans-serif',
      }}
      onClick={e => e.stopPropagation()}
    >
      {isAdmin && (
        <button
          className={itemClass}
          style={{ color: '#e2e2e8' }}
          onClick={onEdit}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          Éditer
        </button>
      )}
      {isAdmin && (
        <button
          className={itemClass}
          style={{ color: '#f87171' }}
          onClick={onDelete}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.1)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          Supprimer
        </button>
      )}
      <button
        className={itemClass}
        style={{ color: '#e2e2e8' }}
        onClick={onCopy}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
      >
        Copier URL
      </button>
    </div>
  )
}
