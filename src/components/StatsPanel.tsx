import type { ShareEntry } from '../App';

interface StatsPanelProps {
  totalShares: number;
  caShares: number;
  totalReach: number;
  topSharer: ShareEntry;
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

export function StatsPanel({ totalShares, caShares, totalReach, topSharer }: StatsPanelProps) {
  const caPercentage = totalShares > 0 ? Math.round((caShares / totalShares) * 100) : 0;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">📡</div>
        <div className="stat-value">{totalShares}</div>
        <div className="stat-label">Total Shares</div>
      </div>

      <div className="stat-card highlight">
        <div className="stat-icon">🎯</div>
        <div className="stat-value">{caShares}</div>
        <div className="stat-label">CA Mentions ({caPercentage}%)</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">👁️</div>
        <div className="stat-value">{formatNumber(totalReach)}</div>
        <div className="stat-label">Total Reach</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🐋</div>
        <div className="stat-value">{formatNumber(topSharer.followers)}</div>
        <div className="stat-label">Top Sharer: {topSharer.handle}</div>
      </div>
    </div>
  );
}