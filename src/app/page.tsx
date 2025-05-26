// pages/index.tsx or app/page.tsx
'use client'; // Add this if using App Router

import React from 'react';
import CardSlider from '@/components/CardSlider';

// Sample card data
const cardsData = [
  {
    id: 1,
    title: "Bentayga EWB",
    subtitle: "Extended luxury for extraordinary journeys",
    description: "The Bentayga Extended Wheelbase redefines the benchmark for luxury SUVs, extending both its physical dimensions and the very concept of luxury.",
    fullDescription: "The Bentayga Extended Wheelbase redefines the benchmark for luxury SUVs, extending both its physical dimensions and the very concept of luxury. With a focus on rear cabin space, Bentley's flagship SUV combines the pinnacle of craftsmanship with cutting-edge technology, creating an environment of unparalleled comfort and refinement for its occupants. Every detail has been meticulously crafted to deliver an exceptional experience that transcends traditional automotive boundaries.",
    image: "https://placehold.co/800x500/111827/FFFFFF?text=Bentayga%20EWB", // Replace with your image path
    actionText: "EXPLORE",
    actionLink: "#"
  },
  {
    id: 2,
    title: "Continental GT",
    subtitle: "The definitive grand tourer",
    description: "The Continental GT represents the pinnacle of Bentley's design and engineering achievements.",
    fullDescription: "The Continental GT represents the pinnacle of Bentley's design and engineering achievements. This iconic grand tourer combines breathtaking performance with handcrafted luxury and cutting-edge technology, creating an extraordinary driving experience without compromise. From its sculpted exterior to its meticulously appointed interior, every element reflects Bentley's commitment to excellence and innovation in automotive design.",
    image: "https://placehold.co/800x500/111827/FFFFFF?text=Continental%20GT", // Replace with your image path
    actionText: "EXPLORE",
    actionLink: "#"
  },
  {
    id: 3,
    title: "Flying Spur",
    subtitle: "The ultimate luxury four-door grand tourer",
    description: "The Flying Spur is the definitive four-door grand tourer, blending sports sedan performance with limousine refinement.",
    fullDescription: "The Flying Spur is the definitive four-door grand tourer, blending sports sedan performance with limousine refinement. Every element of this exceptional vehicle has been crafted to deliver the perfect driving experience for both driver and passengers alike. With its commanding presence and sophisticated engineering, the Flying Spur sets new standards for luxury performance sedans worldwide.",
    image: "https://placehold.co/800x500/111827/FFFFFF?text=Flying%20Spur", // Replace with your image path
    actionText: "EXPLORE",
    actionLink: "#"
  },
  {
    id: 4,
    title: "Continental GTC",
    subtitle: "Open-top luxury without compromise",
    description: "The Continental GTC represents the pinnacle of open-top grand touring.",
    fullDescription: "The Continental GTC represents the pinnacle of open-top grand touring. With its sleek, sculptural design, innovative technology and powerful performance, it delivers an exhilarating driving experience with the added thrill of open-air motoring. The sophisticated soft-top mechanism and refined interior create an unmatched convertible experience that embodies the spirit of freedom and luxury.",
    image: "https://placehold.co/800x500/111827/FFFFFF?text=Continental%20GTC", // Replace with your image path
    actionText: "EXPLORE",
    actionLink: "#"
  },
  {
    id: 5,
    title: "Bentayga",
    subtitle: "The extraordinary SUV",
    description: "The Bentayga brings the luxury and performance expected of a Bentley to the world of SUVs.",
    fullDescription: "The Bentayga brings the luxury and performance expected of a Bentley to the world of SUVs. Its powerful stance and dynamic lines create an unmistakable presence, while its exceptional handling and remarkable power delivery ensure an engaging driving experience in any environment. This extraordinary SUV redefines what it means to combine luxury, performance, and versatility in one exceptional vehicle.",
    image: "https://placehold.co/800x500/111827/FFFFFF?text=Bentayga", // Replace with your image path
    actionText: "EXPLORE",
    actionLink: "#"
  },
  {
    id: 6,
    title: "Mulliner",
    subtitle: "The ultimate expression of personalization",
    description: "Bentley Mulliner represents the pinnacle of luxury and personalization.",
    fullDescription: "Bentley Mulliner represents the pinnacle of luxury and personalization. As Bentley's in-house bespoke division, Mulliner offers customers the opportunity to create truly unique vehicles that reflect their individual style and preferences, with access to exclusive materials, finishes and features not available in the standard model range. Each Mulliner creation is a testament to exceptional craftsmanship and individual expression.",
    image: "https://placehold.co/800x500/111827/FFFFFF?text=Mulliner", // Replace with your image path
    actionText: "EXPLORE",
    actionLink: "#"
  }
];

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <CardSlider cards={cardsData} />
    </div>
  );
}