import type { ShareEntry } from '../App';

interface SharesTableProps {
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

export function SharesTable({ shares }: SharesTableProps) {
  if (shares.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p className="empty-text">No shares tracked yet. Waiting for $CLONK mentions...</p>
      </div>
    );
  }

  return (
    <table className="shares-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Followers</th>
          <th>Time</th>
          <th>CA Mentioned</th>
          <th>Tweet</th>
        </tr>
      </thead>
      <tbody>
        {shares.map((share) => (
          <tr key={share.id}>
            <td>
              <div className="user-cell">
                <img
                  src={share.avatar}
                  alt={share.displayName}
                  className="user-avatar"
                />
                <div className="user-info">
                  <span className="user-name">{share.displayName}</span>
                  <span className="user-handle">{share.handle}</span>
                </div>
              </div>
            </td>
            <td>
              <div className="followers-count">{formatNumber(share.followers)}</div>
              <div className="followers-label">followers</div>
            </td>
            <td>
              <span className="timestamp">{formatTimeAgo(share.timestamp)}</span>
            </td>
            <td>
              <span className={`ca-badge ${share.mentionedCA ? 'yes' : 'no'}`}>
                {share.mentionedCA ? '✓ YES' : '✗ NO'}
              </span>
            </td>
            <td>
              <a
                href={share.tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="view-link"
              >
                View →
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}