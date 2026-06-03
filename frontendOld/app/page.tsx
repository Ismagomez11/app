'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [garages, setGarages] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/garages')
      .then((res) => res.json())
      .then((data) => {
        setGarages(data);
      });
  }, []);

  return (
    <main style={{ padding: '40px' }}>
      <h1>Garajes disponibles 🚗</h1>

      {garages.map((garage) => (
        <div
          key={garage.id}
          style={{
            border: '1px solid gray',
            padding: '20px',
            marginTop: '10px',
            borderRadius: '10px'
          }}
        >
          <h2>{garage.title}</h2>
          <p>{garage.price} €/mes</p>
        </div>
      ))}
    </main>
  );
}