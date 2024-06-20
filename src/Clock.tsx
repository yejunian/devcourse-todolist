import { useEffect, useState } from 'react';

import './Clock.css';

function Timer() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="clock">
      <h2>현재 시각</h2>
      <div className="clock-now">
        {date.toLocaleTimeString('ko', { hour12: false, timeStyle: 'medium' })}
      </div>
    </div>
  );
}

export default Timer;
