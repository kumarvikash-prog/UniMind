import { useEffect, useState } from 'react';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

// This component is no longer needed and can be deleted.
// export const CursorTrail = () => {
//   const [particles, setParticles] = useState<TrailParticle[]>([]);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// 
//   useEffect(() => {
//     let particleId = 0;
// 
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//       
//       const newParticle: TrailParticle = {
//         id: particleId++,
//         x: e.clientX,
//         y: e.clientY,
//         opacity: 1,
//       };
// 
//       setParticles(prev => [...prev, newParticle]);
// 
//       // Remove particle after animation
//       setTimeout(() => {
//         setParticles(prev => prev.filter(p => p.id !== newParticle.id));
//       }, 1000);
//     };
// 
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);
// 
//   return (
//     <>
//       {particles.map(particle => (
//         <div
//           key={particle.id}
//           className="cursor-trail"
//           style={{
//             left: particle.x - 10,
//             top: particle.y - 10,
//           }}
//         />
//       ))}
//       <div
//         className="fixed pointer-events-none w-6 h-6 border-2 border-primary rounded-full z-[9999] transition-all duration-100 ease-out mix-blend-difference"
//         style={{
//           left: mousePosition.x - 12,
//           top: mousePosition.y - 12,
//         }}
//       />
//     </>
//   );
// };