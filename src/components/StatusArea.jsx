import React from 'react';

export const StatusArea = ({ gameState, reactionTime, onStart }) => {
  const getFeedback = (time) => {
    if (time < 220) return '🔥 F1 Pilotu Refleksi!';
    if (time < 320) return '🏎️ Oldukça Hızlı';
    return '⚠️ Biraz Antrenman Lazım';
  };

  return (
    <div className="status-box">
      {gameState === 'idle' && (
        <button className="start-btn" onClick={onStart}>
          TESTİ BAŞLAT
        </button>
      )}

      {gameState === 'arming' && (
        <div className="status-text arming-text">ODAKLAN... IŞIKLARIN SÖNMESİNİ BEKLE</div>
      )}

      {gameState === 'go' && (
        <div className="status-text go-text">BAS! (NOW!)</div>
      )}

      {gameState === 'early' && (
        <div className="alert-box jump-start">
          <h3>JUMP START!</h3>
          <p>Işıklar sönmeden bastın.</p>
          <button className="start-btn retry-btn" onClick={onStart}>
            TEKRAR DENE
          </button>
        </div>
      )}

      {gameState === 'result' && (
        <div className="alert-box success">
          <h2>{reactionTime} ms</h2>
          <p>{getFeedback(reactionTime)}</p>
          <button className="start-btn retry-btn" onClick={onStart}>
            BİR DAHA DENE
          </button>
        </div>
      )}
    </div>
  );
};