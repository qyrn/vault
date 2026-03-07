import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react'
import { Shuffle } from 'lucide-react'
import type { ResourceWithMeta } from '../types'

const DIFF_COLORS: Record<string, string> = {
  'Débutant': '#4ade80',
  'Intermédiaire': '#fb923c',
  'Avancé': '#f87171',
}

interface Props {
  isOpen: boolean
  item: ResourceWithMeta | null
  onClose: () => void
  onAgain: () => void
}

export default function RandomModal({ isOpen, item, onClose, onAgain }: Props) {
  if (!item) return null

  const diffColor = item.difficulty ? DIFF_COLORS[item.difficulty] : null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: 'bg-[#111118] border border-white/[0.08] rounded-2xl max-w-md w-full',
        body: 'py-4',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h3 className="text-base flex items-center gap-2" style={{ color: '#a78bfa', fontFamily: 'Syne, sans-serif' }}>
                <Shuffle size={16} /> Random Challenge
              </h3>
            </ModalHeader>
            <ModalBody>
              <div className="py-2">
                <div className="text-lg font-bold mb-2.5 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {item.name}
                </div>
                <div className="flex gap-1.5 flex-wrap items-center mb-2.5">
                  <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: `${item.catColor}15`, color: item.catColor }}>
                    {item.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: `${item.catColor}15`, color: item.catColor }}>
                    {item.tag}
                  </span>
                  {diffColor && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded border" style={{ background: `${diffColor}15`, color: diffColor, borderColor: `${diffColor}33` }}>
                      {item.difficulty}
                    </span>
                  )}
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: '#888' }}>{item.desc}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose} className="rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                Fermer
              </Button>
              <Button variant="flat" startContent={<Shuffle size={13} />} onPress={onAgain} className="rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}>
                Autre
              </Button>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg text-xs no-underline transition-all"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', color: '#a78bfa' }}
              >
                Ouvrir
              </a>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
