import React, { useEffect, useState } from 'react';

const VisitorCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Get the current count from local storage
    const currentCount = parseInt(localStorage.getItem('visitorCount'), 10);

    // If there's no count in local storage, initialize it to 0
    if (isNaN(currentCount)) {
      localStorage.setItem('visitorCount', 0);
    } else {
      // Increment the count and update the state and local storage
      const newCount = currentCount + 1;
      setCount(newCount);
      localStorage.setItem('visitorCount', newCount);
    }
  }, []);

  return (
    <div>Visitor: {count}</div>
  );
};

export default VisitorCount;
