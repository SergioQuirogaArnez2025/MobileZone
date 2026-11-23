export function StatusToast({ message, type = 'success' }) {
  if (!message) return null

  return (
    <div className={`status-toast${type === 'error' ? ' status-toast--error' : type === 'info' ? ' status-toast--info' : ''}`} role={type === 'error' ? 'alert' : 'status'} aria-live={type === 'error' ? 'assertive' : 'polite'} aria-atomic="true">
      <span className="material-symbols-outlined" aria-hidden="true">{type === 'error' ? 'error' : type === 'info' ? 'info' : 'check_circle'}</span>
      <span>{message}</span>
    </div>
  )
}
