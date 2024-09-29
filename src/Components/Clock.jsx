import { useState } from "react";

function Clock() {
  const [times, setTimes] = useState("");
  const time = new Date();
  const formateDate = time.toLocaleDateString();
  const formatedTime = time.toLocaleTimeString();

  setInterval(() => {
    setTimes(`${formateDate} - ${formatedTime}`);
  }, 1000);

  return <>{times}</>;
}

export default Clock;
