import React, { useState, useEffect } from 'react';

const timezones = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];

const DigitalClock = () => {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      timezones.forEach(tz => {
        newTimes[tz] = new Date().toLocaleString("en-US", { timeZone: tz });
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {timezones.map(tz => (
        <div key={tz}>
          <h2>{tz}</h2>
          <p>{times[tz]}</p>
        </div>
      ))}
    </div>
  );
};

export default DigitalClock;