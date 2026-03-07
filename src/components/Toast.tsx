interface Props {
  message: string
  show: boolean
}

export default function Toast({ message, show }: Props) {
  return (
    <div
      className="fixed bottom-6 left-1/2 z-[2000] px-5 py-2.5 rounded-[10px] text-[12px] pointer-events-none transition-transform duration-300"
      style={{
        transform: `translateX(-50%) translateY(${show ? '0' : '80px'})`,
        background: '#111118',
        border: '1px solid rgba(124,58,237,0.35)',
        color: '#a78bfa',
        fontFamily: 'Outfit, sans-serif',
      }}
    >
      {message}
    </div>
  )
}
