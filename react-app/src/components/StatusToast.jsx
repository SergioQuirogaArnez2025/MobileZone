export function StatusToast({ message }) {
  if (!message) return null

  return (
    <div className="status-toast" role="status" aria-live="polite" aria-atomic="true">
      <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
      <span>{message}</span>
    </div>
  )
}
