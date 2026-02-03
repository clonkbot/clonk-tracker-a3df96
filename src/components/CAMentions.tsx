import type { ShareEntry } from '../App';

interface CAMentionsProps {
  shares: ShareEntry[];
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function CAMentions({ shares }: CAMentionsProps) {
  if (shares.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎯</div>
        <p className="empty-text">No CA mentions detected yet. Keep spreading $CLONK!</p>
      </div>
    );
  }

  return (
    <div className="ca-grid">
      {shares.map((share) => (
        <div key={share.id} className="ca-card">
          <div className="ca-card-header">
            <img
              src={share.avatar}
              alt={share.displayName}
              className="ca-card-avatar"
            />
            <div className="ca-card-user">
              <div className="ca-card-name">{share.displayName}</div>
              <div className="ca-card-handle">{share.handle}</div>
            </div>
            <div className="ca-card-followers">{formatNumber(share.followers)}</div>
          </div>
          <div className="ca-card-footer">
            <span className="ca-card-time">{formatTimeAgo(share.timestamp)}</span>
            <a
              href={share.tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="view-link"
            >
              View Tweet →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}