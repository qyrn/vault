import { useEffect } from 'react'
import { X } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ImgModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.88)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <button
        className="fixed top-4 right-5 z-[1101] transition-colors cursor-pointer bg-transparent border-none p-0"
        style={{ color: '#888' }}
        onClick={onClose}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#888' }}
      >
        <X size={24} />
      </button>
      <img
        src="https://i.imgur.com/iPY8RJF.png"
        alt="Cyber Security Acronyms"
        className="max-w-[95vw] max-h-[90vh] rounded-lg border"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      />
    </div>
  )
}
