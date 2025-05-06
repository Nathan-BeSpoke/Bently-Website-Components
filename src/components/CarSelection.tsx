'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Car {
  name: string;
  image: string;
  value: string;
}

interface CarSelectorProps {
  onSelect?: (car: Car) => void;
}

const cars: Car[] = [
  {
    name: 'Bentayga EWB',
    image: 'https://www.bentleymotors.com/content/dam/bm/websites/bmcom/bentleymotors-com/test-drive/EWB_Mulliner_Duo_tone%20test%20drive%20930x522.png/_jcr_content/renditions/original.image_file.752.422.file/EWB_Mulliner_Duo_tone%20test%20drive%20930x522.png',
    value: 'GEN_BTEWB'
  },
  {
    name: 'Bentayga',
    image: 'https://www.bentleymotors.com/content/dam/bm/websites/bmcom/bentleymotors-com/test-drive/SWB%20S%20%20cambrian%20grey%20930x522.png/_jcr_content/renditions/original.image_file.752.422.file/SWB%20S%20%20cambrian%20grey%20930x522.png',
    value: 'GEN_BT'
  },
  {
    name: 'Flying Spur',
    image: 'https://www.bentleymotors.com/content/dam/bm/websites/bmcom/bentleymotors-com/test-drive/S_631_Speed_Side._V2%20930x522.png/_jcr_content/renditions/original.image_file.752.422.file/S_631_Speed_Side._V2%20930x522.png',
    value: 'GEN_FS'
  },
  {
    name: 'Continental GT',
    image: 'https://www.bentleymotors.com/content/dam/bm/websites/bmcom/bentleymotors-com/test-drive/S_MY25_GT_Speed_Side%20930x522%20test_drive.png/_jcr_content/renditions/original.image_file.752.422.file/S_MY25_GT_Speed_Side%20930x522%20test_drive.png',
    value: 'GEN_CTGT'
  },
  {
    name: 'Continental GTC',
    image: 'https://www.bentleymotors.com/content/dam/bm/websites/bmcom/bentleymotors-com/test-drive/S_MY25_GTC_Speed_Side%20930x522.png/_jcr_content/renditions/original.image_file.752.422.file/S_MY25_GTC_Speed_Side%20930x522.png',
    value: 'GEN_CTGTC'
  },
];

export default function CarSelector({ onSelect }: CarSelectorProps) {
  const [selected, setSelected] = useState<string>('Bentayga EWB');

  const handleSelect = (car: Car) => {
    setSelected(car.name);
    onSelect?.(car);
  };

  return (
    <fieldset name="vehicle_of_interest" className="w-full max-w-3xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-10 md:gap-x-10 md:gap-y-10 place-items-center justify-center mx-auto">
        {cars.map((car) => (
          <label 
            key={car.name}
            className={`flex flex-col justify-between cursor-pointer border transition-all
              w-[170px] h-[190px] md:w-[150px] md:h-[190px]
              ${selected === car.name ? 'border-2 border-gray-700' : 'border border-transparent'}
            `}
          >
            <input
              type="radio"
              name="vehicle_of_interest"
              value={car.value}
              className="hidden"
              checked={selected === car.name}
              onChange={() => handleSelect(car)}
            />
            <div className="h-full flex flex-col relative">
              {/* Brownish background for top half */}
              <div 
                className="absolute top-0 left-0 w-full h-full"
                style={{ 
                  background: 'linear-gradient(to bottom, #e6e1cf 0%, #e6e1cf 60%, white 60%, white 100%)'
                }}
              ></div>
              {/* Content positioned above the background */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="pt-2 flex justify-center">
                  <div 
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all
                      ${selected === car.name ? 'bg-gray-700 border-gray-700' : 'border-gray-400 bg-white'}`}
                  >
                    {selected === car.name && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center mt-4">
                  <div className="relative w-36 h-24">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="py-2 px-2 text-center text-gray-700 text-xs break-words w-full">
                  {car.name}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}