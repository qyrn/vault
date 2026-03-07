import { getIcon } from '../utils/icons'
import ResourceCard from './ResourceCard'
import type { MergedCategory, Resource } from '../types'

interface Props {
  section: MergedCategory
  variant?: 'default' | 'progression' | 'pinned'
  isFav: (name: string, url: string) => boolean
  isAdmin: boolean
  onFavToggle: (name: string, url: string) => void
  onContextMenu: (e: React.MouseEvent, item: Resource & { category: string; catColor: string; catIcon: string }) => void
  onOpenImg: () => void
}

export default function CardSection({ section, variant = 'default', isFav, isAdmin, onFavToggle, onContextMenu, onOpenImg }: Props) {
  const Icon = getIcon(section.icon)

  const wrapperClass =
    variant === 'progression'
      ? 'mb-8 p-4 rounded-2xl border'
      : 'mb-8'

  const wrapperStyle =
    variant === 'progression'
      ? { background: 'rgba(124,58,237,0.04)', borderColor: 'rgba(124,58,237,0.15)' }
      : {}

  const headerBorderStyle =
    variant === 'progression'
      ? { borderBottom: '1px solid rgba(124,58,237,0.1)', paddingBottom: 10, marginBottom: 14 }
      : {}

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <div className="flex items-center gap-2.5 mb-3" style={headerBorderStyle}>
        <span style={{ color: section.color }}>
          <Icon size={18} />
        </span>
        <h2 className="section-title" style={{ color: section.color }}>
          {section.category}
        </h2>
        <span
          className="ml-auto text-[11px] px-2.5 py-0.5 rounded-full"
          style={{ color: '#555', background: 'rgba(255,255,255,0.03)' }}
        >
          {section.items.length}
        </span>
      </div>
      <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {section.items.map(item => (
          <ResourceCard
            key={`${item.name}-${item.url}`}
            item={{ ...item, category: section.category }}
            color={section.color}
            isFav={isFav(item.name, item.url)}
            isAdmin={isAdmin}
            onFavToggle={onFavToggle}
            onContextMenu={onContextMenu}
            onOpenImg={onOpenImg}
            catIcon={section.icon}
          />
        ))}
      </div>
    </div>
  )
}
