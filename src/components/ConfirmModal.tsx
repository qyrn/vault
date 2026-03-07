import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react'

interface Props {
  isOpen: boolean
  name: string
  onClose: () => void
  onConfirm: () => void
}

export default function ConfirmModal({ isOpen, name, onClose, onConfirm }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: 'bg-[#111118] border border-white/[0.08] rounded-2xl max-w-sm w-full',
        body: 'py-4',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h3 className="text-base" style={{ color: '#f87171', fontFamily: 'Syne, sans-serif' }}>
                Confirmer la suppression
              </h3>
            </ModalHeader>
            <ModalBody>
              <p className="text-[13px]" style={{ color: '#888' }}>
                Supprimer «{' '}<span style={{ color: '#e2e2e8' }}>{name}</span>{' '}» ?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose} className="rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                Annuler
              </Button>
              <Button variant="flat" onPress={onConfirm} className="rounded-lg text-xs" style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.35)', color: '#f87171' }}>
                Supprimer
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
