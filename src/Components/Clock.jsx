import  { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="clock font-custom font-bold text-xl py-4">
      {time}
    </div>
  );
}

export default Clock;
