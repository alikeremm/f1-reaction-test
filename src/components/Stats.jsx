import React from 'react';

export const Stats = ({ bestTime, history }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <span className="stat-label">EN İYİ DERECE</span>
        <span className="stat-value">{bestTime ? `${bestTime} ms` : '--'}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">SON DENEMELER</span>
        <div className="history-list">
          {history.length > 0 ? (
            history.map((h, i) => <span key={i}>{h} ms</span>)
          ) : (
            <span>Kayıt yok</span>
          )}
        </div>
      </div>
    </div>
  );
};