import React from 'react';

export const LightGantry = ({ lightsCount }) => {
  return (
    <div className="gantry">
      {[1, 2, 3, 4, 5].map((index) => {
        const active = lightsCount >= index;
        return (
          <div key={index} className="light-post">
            <div
              className="bulb"
              style={{
                backgroundColor: active ? '#ff0000' : '#1a202c',
                boxShadow: active ? '0 0 25px #ff0000, 0 0 50px #ff0000' : 'none',
                borderColor: active ? '#ff4d4d' : '#2d3748',
              }}
            />
            <div
              className="bulb"
              style={{
                backgroundColor: active ? '#ff0000' : '#1a202c',
                boxShadow: active ? '0 0 25px #ff0000, 0 0 50px #ff0000' : 'none',
                borderColor: active ? '#ff4d4d' : '#2d3748',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};