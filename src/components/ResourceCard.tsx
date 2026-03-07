import { Lock, Star } from 'lucide-react'
import type { Resource } from '../types'

const DIFF_COLORS: Record<string, string> = {
  'Débutant': '#4ade80',
  'Intermédiaire': '#fb923c',
  'Avancé': '#f87171',
}

interface Props {
  item: Resource & { category: string; catColor?: string }
  color: string
  isFav: boolean
  isAdmin: boolean
  onFavToggle: (name: string, url: string) => void
  onContextMenu: (e: React.MouseEvent, item: Resource & { category: string; catColor: string; catIcon: string }) => void
  onOpenImg: () => void
  catIcon?: string
}

export default function ResourceCard({ item, color, isFav, isAdmin, onFavToggle, onContextMenu, onOpenImg, catIcon = 'folder' }: Props) {
  const isAcronym = item.special === 'acronym'
  const displayUrl = item.url.replace('https://', '').replace('http://', '').replace('#acronyms', 'Image — cliquer pour agrandir')

  const diffColor = item.difficulty ? DIFF_COLORS[item.difficulty] : null

  const handleContextMenu = (e: React.MouseEvent) => {
    onContextMenu(e, { ...item, catColor: color, catIcon })
  }

  const cardContent = (
    <>
      {isFav && (
        <span className="absolute top-2.5 right-2.5 pointer-events-none" style={{ color: 'var(--yellow)' }}>
          <Star size={12} fill="currentColor" />
        </span>
      )}
      {item.isPrivate && (
        <span className="absolute top-2.5 right-7 pointer-events-none" style={{ color: '#a78bfa' }}>
          <Lock size={11} />
        </span>
      )}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 w-full">
          <span className="card-name font-semibold text-sm" style={{ color: 'rgba(255,255,255,0.85)', transition: 'color 0.2s' }}>
            {item.name}
          </span>
        </div>
        <div className="flex gap-1.5 items-center flex-wrap">
          {diffColor && (
            <span
              className="text-[9px] px-1.5 py-0.5 rounded border"
              style={{ background: `${diffColor}15`, color: diffColor, borderColor: `${diffColor}33`, letterSpacing: '0.3px' }}
            >
              {item.difficulty}
            </span>
          )}
          <span
            className="text-[10px] px-2 py-0.5 rounded"
            style={{ background: `${color}15`, color }}
          >
            {item.tag}
          </span>
        </div>
      </div>
      {item.desc && (
        <div className="text-xs mt-1.5 leading-relaxed" style={{ color: '#888' }}>
          {item.desc}
        </div>
      )}
      <div className="text-[10px] mt-2 overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: '#555' }}>
        {displayUrl}
      </div>
      {isAdmin && (
        <div className="card-actions">
          <button
            className="text-[11px] px-1.5 py-0.5 rounded transition-colors"
            style={{ color: 'var(--yellow)', background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
            onClick={e => { e.preventDefault(); e.stopPropagation(); onFavToggle(item.name, item.url) }}
          >
            <Star size={12} fill={isFav ? 'currentColor' : 'none'} />
          </button>
        </div>
      )}
    </>
  )

  if (isAcronym) {
    return (
      <button
        className={`resource-card text-left w-full ${item.isPrivate ? 'card-private' : ''}`}
        style={{ '--accent': color } as React.CSSProperties}
        onClick={onOpenImg}
        onContextMenu={handleContextMenu}
      >
        {cardContent}
      </button>
    )
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`resource-card ${item.isPrivate ? 'card-private' : ''}`}
      style={{ '--accent': color } as React.CSSProperties}
      onContextMenu={handleContextMenu}
    >
      {cardContent}
    </a>
  )
}
