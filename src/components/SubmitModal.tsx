import { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from '@heroui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { url: string; description: string; contact: string }) => Promise<void>
}

export default function SubmitModal({ isOpen, onClose, onSubmit }: Props) {
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState<{ text: string; type: 'err' | '' }>({ text: '', type: '' })
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setUrl(''); setDescription(''); setContact(''); setStatus({ text: '', type: '' })
    onClose()
  }

  const handleSend = async () => {
    if (!url.trim()) { setStatus({ text: 'URL requise.', type: 'err' }); return }
    setLoading(true); setStatus({ text: '', type: '' })
    try {
      await onSubmit({ url: url.trim(), description: description.trim(), contact: contact.trim() })
      handleClose()
    } catch (err) {
      setStatus({ text: err instanceof Error ? err.message : 'Erreur lors de l\'envoi.', type: 'err' })
    }
    setLoading(false)
  }

  const inputClass = {
    inputWrapper: 'bg-white/[0.04] border border-white/[0.08] rounded-lg data-[focus=true]:border-violet-600/50 shadow-none hover:bg-white/[0.06]',
    input: 'text-[13px] text-[#e2e2e8] placeholder:text-[#555] font-[Outfit]',
    label: 'text-[11px] text-white/40 tracking-widest uppercase font-[Outfit]',
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      classNames={{
        base: 'bg-[#111118] border border-white/[0.08] rounded-2xl max-w-lg w-full',
        body: 'gap-3 py-4',
        footer: 'pt-2',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h3 className="text-base" style={{ color: '#a78bfa', fontFamily: 'Syne, sans-serif' }}>
                Proposer une ressource
              </h3>
            </ModalHeader>
            <ModalBody>
              <Input
                label="URL"
                value={url}
                onValueChange={setUrl}
                placeholder="https://..."
                isRequired
                classNames={inputClass}
                labelPlacement="outside"
              />
              <Textarea
                label={<>Description <span className="text-white/30 normal-case tracking-normal">(optionnel)</span></>}
                value={description}
                onValueChange={setDescription}
                placeholder="Pourquoi tu recommandes cette ressource ?"
                classNames={inputClass}
                labelPlacement="outside"
                minRows={2}
              />
              <Input
                label={<>Ton contact <span className="text-white/30 normal-case tracking-normal">(optionnel — Discord, X...)</span></>}
                value={contact}
                onValueChange={setContact}
                placeholder="@pseudo"
                classNames={inputClass}
                labelPlacement="outside"
              />
              {status.text && (
                <span className="text-[10px]" style={{ color: '#f87171' }}>{status.text}</span>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={handleClose} className="rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                Annuler
              </Button>
              <Button variant="flat" onPress={handleSend} isLoading={loading} className="rounded-lg text-xs" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', color: '#a78bfa' }}>
                Envoyer
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
