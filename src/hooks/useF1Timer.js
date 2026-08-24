import { useState, useRef } from 'react';

export const useF1Timer = () => {
  const [gameState, setGameState] = useState('idle');
  const [lightsCount, setLightsCount] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('f1_best_time');
    return saved ? Number(saved) : null;
  });
  const [history, setHistory] = useState([]);

  const startTimeRef = useRef(0);
  const timeoutsRef = useRef([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const startTest = () => {
    clearAllTimeouts();
    setReactionTime(null);
    setLightsCount(0);
    setGameState('arming');

    [1, 2, 3, 4, 5].forEach((num) => {
      const t = setTimeout(() => {
        setLightsCount(num);

        if (num === 5) {
          const randomDelay = Math.floor(Math.random() * 1500) + 1000;
          const goTimeout = setTimeout(() => {
            setLightsCount(0);
            setGameState('go');
            startTimeRef.current = performance.now();
          }, randomDelay);
          timeoutsRef.current.push(goTimeout);
        }
      }, num * 1000);
      timeoutsRef.current.push(t);
    });
  };

  const triggerReaction = () => {
    if (gameState === 'arming') {
      clearAllTimeouts();
      setLightsCount(0);
      setGameState('early');
    } else if (gameState === 'go') {
      const delta = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(delta);
      setGameState('result');

      setHistory((prev) => [delta, ...prev.slice(0, 4)]);
      if (!bestTime || delta < bestTime) {
        setBestTime(delta);
        localStorage.setItem('f1_best_time', delta.toString());
      }
    }
  };

  return {
    gameState,
    lightsCount,
    reactionTime,
    bestTime,
    history,
    startTest,
    triggerReaction,
  };
};