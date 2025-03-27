import React, { useState } from 'react';

const JokeGenerator = () => {
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error('Error fetching the joke:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchJoke}>Get a Random Joke</button>
      <p>{joke}</p>
    </div>
  );
};

export default JokeGenerator;