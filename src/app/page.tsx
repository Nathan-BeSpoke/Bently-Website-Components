'use client';

import { useState } from 'react';
import CarSelector from '../components/CarSelection';

interface SelectedCar {
  name: string;
  color: string;
  image: string;
}

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<SelectedCar | null>(null);

  const handleCarSelect = (car: SelectedCar) => {
    setSelectedCar(car);
    console.log('Selected car:', car);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        
        <CarSelector onSelect={handleCarSelect} />

        
      </div>
    </main>
  );
} 