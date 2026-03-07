import { Star } from 'lucide-react'
import { getIcon } from '../utils/icons'
import type { MergedCategory } from '../types'

interface Props {
  data: MergedCategory[]
  activeFilter: string | null
  activeDifficulty: string | null
  favOnly: boolean
  onFilterChange: (cat: string | null) => void
  onDifficultyChange: (diff: string | null) => void
  onFavOnlyChange: (v: boolean) => void
}

const DIFFICULTIES = [
  { key: 'Débutant', color: '#4ade80' },
  { key: 'Intermédiaire', color: '#fb923c' },
  { key: 'Avancé', color: '#f87171' },
]

export default function FilterBar({ data, activeFilter, activeDifficulty, favOnly, onFilterChange, onDifficultyChange, onFavOnlyChange }: Props) {
  return (
    <div
      className="flex flex-col gap-2.5 mb-6 px-4 py-3.5 rounded-xl border"
      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center gap-2">
        <span className="text-[10px] tracking-[1.5px] uppercase min-w-[72px]" style={{ color: '#555' }}>
          Catégorie
        </span>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
          {data.map(section => {
            const Icon = getIcon(section.icon)
            const active = activeFilter === section.category
            return (
              <button
                key={section.category}
                className="filter-pill"
                style={active ? {
                  color: section.color,
                  borderColor: `${section.color}50`,
                  background: `${section.color}12`,
                } : {
                  borderColor: `${section.color}25`,
                  color: `${section.color}99`,
                }}
                onClick={() => onFilterChange(active ? null : section.category)}
              >
                <Icon size={13} />
                {section.category}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-[1.5px] uppercase min-w-[72px]" style={{ color: '#555' }}>
            Niveau
          </span>
          <div className="flex gap-1.5">
            {DIFFICULTIES.map(({ key, color }) => {
              const active = activeDifficulty === key
              return (
                <button
                  key={key}
                  className="filter-pill"
                  style={active ? {
                    color,
                    borderColor: `${color}50`,
                    background: `${color}10`,
                  } : {
                    color,
                    borderColor: `${color}30`,
                  }}
                  onClick={() => onDifficultyChange(active ? null : key)}
                >
                  {key}
                </button>
              )
            })}
          </div>
        </div>

        <button
          className="filter-pill"
          style={favOnly ? {
            color: 'var(--yellow)',
            borderColor: 'rgba(251,191,36,0.5)',
            background: 'rgba(251,191,36,0.1)',
          } : {
            color: 'var(--yellow)',
            borderColor: 'rgba(251,191,36,0.2)',
          }}
          onClick={() => onFavOnlyChange(!favOnly)}
        >
          <Star size={13} fill={favOnly ? 'currentColor' : 'none'} />
          Favoris
        </button>
      </div>
    </div>
  )
}
