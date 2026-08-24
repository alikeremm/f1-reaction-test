import React, { useEffect } from 'react';
import './App.css';
import { useF1Timer } from './hooks/useF1Timer';
import { Header } from './components/Header';
import { LightGantry } from './components/LightGantry';
import { StatusArea } from './components/StatusArea';
import { Stats } from './components/Stats';

export default function App() {
  const {
    gameState,
    lightsCount,
    reactionTime,
    bestTime,
    history,
    startTest,
    triggerReaction,
  } = useF1Timer();

  // Space tus kismi
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'idle' || gameState === 'result' || gameState === 'early') {
          startTest();
        } else {
          triggerReaction();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  return (
    <div className="f1-wrapper" onClick={triggerReaction}>
      <Header />
      <LightGantry lightsCount={lightsCount} />
      <StatusArea
        gameState={gameState}
        reactionTime={reactionTime}
        onStart={(e) => {
          if (e) e.stopPropagation();
          startTest();
        }}
      />
      <Stats bestTime={bestTime} history={history} />
    </div>
  );
}