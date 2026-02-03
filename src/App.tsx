import { useState, useEffect } from 'react';
import { TrackerHeader } from './components/TrackerHeader';
import { StatsPanel } from './components/StatsPanel';
import { SharesTable } from './components/SharesTable';
import { CAMentions } from './components/CAMentions';
import { Footer } from './components/Footer';
import './styles.css';

export interface ShareEntry {
  id: string;
  handle: string;
  displayName: string;
  followers: number;
  timestamp: Date;
  tweetUrl: string;
  mentionedCA: boolean;
  avatar: string;
}

// Mock data for demonstration
const mockShares: ShareEntry[] = [
  { id: '1', handle: '@cryptowhale_', displayName: 'Crypto Whale 🐋', followers: 892400, timestamp: new Date(Date.now() - 120000), tweetUrl: '#', mentionedCA: true, avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=whale' },
  { id: '2', handle: '@degen_trader99', displayName: 'DEGEN TRADER', followers: 45600, timestamp: new Date(Date.now() - 340000), tweetUrl: '#', mentionedCA: false, avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=degen' },
  { id: '3', handle: '@solana_maxi', displayName: 'SOL MAXI ☀️', followers: 234100, timestamp: new Date(Date.now() - 890000), tweetUrl: '#', mentionedCA: true, avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=solana' },
  { id: '4', handle: '@memecoin_hunter', displayName: 'Memecoin Hunter', followers: 78900, timestamp: new Date(Date.now() - 1200000), tweetUrl: '#', mentionedCA: true, avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=meme' },
  { id: '5', handle: '@alpha_calls', displayName: 'ALPHA CALLS 📢', followers: 567000, timestamp: new Date(Date.now() - 2400000), tweetUrl: '#', mentionedCA: false, avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=alpha' },
  { id: '6', handle: '@ct_insider', displayName: 'CT Insider', followers: 123400, timestamp: new Date(Date.now() - 3600000), tweetUrl: '#', mentionedCA: true, avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=insider' },
  { id: '7', handle: '@pump_detective', displayName: 'Pump Detective 🔍', followers: 34200, timestamp: new Date(Date.now() - 5000000), tweetUrl: '#', mentionedCA: false, avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=pump' },
  { id: '8', handle: '@based_anon', displayName: 'based anon', followers: 12100, timestamp: new Date(Date.now() - 7200000), tweetUrl: '#', mentionedCA: true, avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=based' },
];

function App() {
  const [shares, setShares] = useState<ShareEntry[]>(mockShares);
  const [activeTab, setActiveTab] = useState<'all' | 'ca'>('all');
  const [isLive, setIsLive] = useState(true);

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const handles = ['@new_degen', '@whale_alert', '@gem_finder', '@sol_builder'];
      const randomHandle = handles[Math.floor(Math.random() * handles.length)];
      const newShare: ShareEntry = {
        id: Date.now().toString(),
        handle: randomHandle,
        displayName: randomHandle.replace('@', '').replace('_', ' ').toUpperCase(),
        followers: Math.floor(Math.random() * 500000) + 1000,
        timestamp: new Date(),
        tweetUrl: '#',
        mentionedCA: Math.random() > 0.5,
        avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Date.now()}`
      };
      setShares(prev => [newShare, ...prev.slice(0, 49)]);
    }, 8000);

    return () => clearInterval(interval);
  }, [isLive]);

  const totalShares = shares.length;
  const caShares = shares.filter(s => s.mentionedCA).length;
  const totalReach = shares.reduce((acc, s) => acc + s.followers, 0);
  const topSharer = shares.reduce((max, s) => s.followers > max.followers ? s : max, shares[0]);

  return (
    <div className="app-container">
      <div className="noise-overlay"></div>
      <div className="grid-bg"></div>

      <main className="main-content">
        <TrackerHeader isLive={isLive} onToggleLive={() => setIsLive(!isLive)} />

        <StatsPanel
          totalShares={totalShares}
          caShares={caShares}
          totalReach={totalReach}
          topSharer={topSharer}
        />

        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span className="tab-icon">📡</span>
            ALL SHARES
            <span className="tab-count">{totalShares}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'ca' ? 'active' : ''}`}
            onClick={() => setActiveTab('ca')}
          >
            <span className="tab-icon">🎯</span>
            CA MENTIONS
            <span className="tab-count">{caShares}</span>
          </button>
        </div>

        <div className="content-panel">
          {activeTab === 'all' ? (
            <SharesTable shares={shares} />
          ) : (
            <CAMentions shares={shares.filter(s => s.mentionedCA)} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;