import { useEffect, useState, RefObject } from 'react'
import { Button, Input } from '@heroui/react'
import { Search, Shuffle, Send, Download, Plus } from 'lucide-react'

interface Props {
  stats: { total: number; cats: number }
  isAdmin: boolean
  isAuthenticated: boolean
  searchQuery: string
  searchRef: RefObject<HTMLInputElement>
  onSearchChange: (v: string) => void
  onTitleClick: () => void
  onAddClick: () => void
  onSubmitClick: () => void
  onRandomClick: () => void
}

function useClock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Header({
  stats, isAdmin, isAuthenticated, searchQuery, searchRef,
  onSearchChange, onTitleClick, onAddClick, onSubmitClick, onRandomClick,
}: Props) {
  const now = useClock()

  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="relative z-10">
      <header
        className="pt-7 pb-5 mb-6 flex justify-between items-start flex-wrap gap-4"
        style={{ borderBottom: '1px solid rgba(124,58,237,0.2)' }}
      >
        <div>
          <div className="text-[11px] mb-1.5 tracking-[3px] uppercase" style={{ color: 'rgba(167,139,250,0.6)' }}>
            // cybersecurity resource hub
          </div>
          <button
            onClick={onTitleClick}
            className="text-left bg-transparent border-none cursor-pointer p-0"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Vault
            </h1>
          </button>
          <div className="flex gap-5 items-center mt-2">
            <span className="text-[11px] tracking-wide" style={{ color: '#555' }}>
              <strong className="text-sm font-bold" style={{ color: '#a78bfa' }}>{stats.total}</strong>{' '}ressources
            </span>
            <span className="text-[11px] tracking-wide" style={{ color: '#555' }}>
              <strong className="text-sm font-bold" style={{ color: '#a78bfa' }}>{stats.cats}</strong>{' '}catégories
            </span>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="flex items-center gap-2.5">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <>
                    <span
                      className="text-[10px] px-2.5 py-1 rounded-md border"
                      style={{ color: '#a78bfa', background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.25)' }}
                    >
                      Admin
                    </span>
                    <a
                      href="/api/backup"
                      className="text-[10px] px-3 py-1.5 rounded-lg border flex items-center gap-1 no-underline transition-all"
                      style={{ color: '#a78bfa', background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.2)' }}
                    >
                      <Download size={10} /> Backup
                    </a>
                  </>
                )}
                <button
                  className="text-[10px] px-3 py-1.5 rounded-lg border transition-all cursor-pointer"
                  style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.2)', fontFamily: 'Outfit, sans-serif' }}
                  onClick={() => { window.location.href = '/api/auth/logout' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="text-[10px] px-2 py-1 rounded transition-colors cursor-pointer bg-transparent border-none"
                style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Outfit, sans-serif' }}
                onClick={() => { window.location.href = '/api/auth/login' }}
              >
                admin
              </button>
            )}
          </div>

          <div className="text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <div className="text-lg font-semibold" style={{ color: '#a78bfa' }}>{timeStr}</div>
            <div className="text-xs mt-0.5" style={{ color: '#555' }}>{dateStr}</div>
          </div>
        </div>
      </header>

      <div className="flex gap-2.5 mb-4 items-stretch flex-wrap">
        <div className="relative flex-1" style={{ minWidth: 280 }}>
          <Input
            ref={searchRef}
            value={searchQuery}
            onValueChange={onSearchChange}
            placeholder="Rechercher une ressource, un tag..."
            startContent={<Search size={14} style={{ color: '#555' }} />}
            endContent={
              <kbd className="text-[10px] border rounded px-1.5 py-0.5 pointer-events-none" style={{ color: '#333', borderColor: '#222' }}>
                /
              </kbd>
            }
            classNames={{
              base: 'h-full',
              inputWrapper: [
                'bg-white/[0.03]',
                'border border-white/[0.07]',
                'rounded-[10px]',
                'h-full',
                'hover:bg-white/[0.05]',
                'data-[focus=true]:border-violet-600/50',
                'data-[focus=true]:bg-white/[0.04]',
                'shadow-none',
              ].join(' '),
              input: 'text-[13px] text-[#e2e2e8] placeholder:text-[#555] font-[Outfit]',
            }}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="flat"
            size="sm"
            startContent={<Shuffle size={13} />}
            onPress={onRandomClick}
            className="h-auto px-4 py-2.5 rounded-[10px] text-[12px] tracking-wide"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}
          >
            Random
          </Button>

          {!isAdmin && (
            <Button
              variant="flat"
              size="sm"
              startContent={<Send size={13} />}
              onPress={onSubmitClick}
              className="h-auto px-4 py-2.5 rounded-[10px] text-[12px] tracking-wide"
              style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', color: '#a78bfa' }}
            >
              Proposer
            </Button>
          )}

          {isAdmin && (
            <Button
              variant="flat"
              size="sm"
              startContent={<Plus size={13} />}
              onPress={onAddClick}
              className="h-auto px-4 py-2.5 rounded-[10px] text-[12px] tracking-wide"
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa' }}
            >
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
