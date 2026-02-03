interface TrackerHeaderProps {
  isLive: boolean;
  onToggleLive: () => void;
}

export function TrackerHeader({ isLive, onToggleLive }: TrackerHeaderProps) {
  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo">$CLONK</h1>
      </div>
      <p className="subtitle">Real-time share tracker & CA mention monitor</p>
      <button
        className={`live-indicator ${!isLive ? 'paused' : ''}`}
        onClick={onToggleLive}
        aria-label={isLive ? 'Pause live tracking' : 'Resume live tracking'}
      >
        <span className="live-dot"></span>
        <span className="live-text">{isLive ? 'LIVE' : 'PAUSED'}</span>
      </button>
    </header>
  );
}