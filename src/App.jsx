// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remoteKey, setRemoteKey] = useState('');
  const [clientId, setClientId] = useState('');

  const API_BASE_URL = 'https://api.streamfog.com/api/v2/external-api';

  // Fetch inventory data
  const fetchInventory = async () => {
    if (!remoteKey) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/inventory/${remoteKey}`, {
        headers: {
          'client-id': `${clientId}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch inventory');

      const data = await response.json();
      setInventory(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Control functions
  const activateLens = async (lensId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/activateLens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-id': `${clientId}`,
        },
        body: JSON.stringify({ remoteKey, lensId }),
      });

      if (!response.ok) throw new Error('Failed to activate lens');

    } catch (err) {
      setError(err.message);
    }
  };

  const disableLens = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/disableLens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-id': `${clientId}`,
        },
        body: JSON.stringify({ remoteKey }),
      });

      if (!response.ok) throw new Error('Failed to disable lens');

    } catch (err) {
      setError(err.message);
    }
  };

  const playVideoAnim = async (animId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/playVideoAnim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-id': `${clientId}`,
        },
        body: JSON.stringify({ remoteKey, animId }),
      });

      if (!response.ok) throw new Error('Failed to play animation');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1>AR Control Panel</h1>

      <div className="config-section">
        <input
          type="text"
          placeholder="Remote Key"
          value={remoteKey}
          onChange={(e) => setRemoteKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Client ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
        <button onClick={fetchInventory}>Fetch Inventory</button>
      </div>

      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}

      {inventory && (
        <div className="inventory">
          <div className="section">
            <h2>Snap Lenses</h2>
            <div className="lens-grid">
              {inventory.snapLenses.map((lens) => (
                <div key={lens.id} className="lens-card">
                  <img src={lens.iconUrl} alt={lens.name} />
                  <h3>{lens.name}</h3>
                  <button onClick={() => activateLens(lens.id)}>Activate</button>
                </div>
              ))}
            </div>
            <button onClick={disableLens} className="disable-button">
              Disable Active Lens
            </button>
          </div>

          <div className="section">
            <h2>Animations</h2>
            <div className="animation-grid">
              {inventory.animations.map((anim) => (
                <div key={anim.id} className="animation-card">
                  <img src={anim.thumbnail} alt={anim.name} />
                  <h3>{anim.name}</h3>
                  <button onClick={() => playVideoAnim(anim.id)}>
                    Play Animation
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

