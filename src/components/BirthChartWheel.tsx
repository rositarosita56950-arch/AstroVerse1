import React, { useState } from 'react';
import { BirthChartResult, PlanetaryPosition } from '../types';

interface Props {
  chart: BirthChartResult;
}

export const BirthChartWheel: React.FC<Props> = ({ chart }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryPosition | null>(null);

  const radius = 170;
  const innerRadius = 120;
  const centerRadius = 60;
  const center = 210;

  // 12 Zodiac signs starting from Ascendant
  const signs = [
    { name: 'Aries', symbol: '♈', element: '#ef4444' },
    { name: 'Taurus', symbol: '♉', element: '#10b981' },
    { name: 'Gemini', symbol: '♊', element: '#f59e0b' },
    { name: 'Cancer', symbol: '♋', element: '#38bdf8' },
    { name: 'Leo', symbol: '♌', element: '#eab308' },
    { name: 'Virgo', symbol: '♍', element: '#14b8a6' },
    { name: 'Libra', symbol: '♎', element: '#a855f7' },
    { name: 'Scorpio', symbol: '♏', element: '#9333ea' },
    { name: 'Sagitarius', symbol: '♐', element: '#f97316' },
    { name: 'Capricorn', symbol: '♑', element: '#64748b' },
    { name: 'Aquarius', symbol: '♒', element: '#06b6d4' },
    { name: 'Pisces', symbol: '♓', element: '#8b5cf6' },
  ];

  // Helper for polar coordinates
  function polarToCartesian(centerX: number, centerY: number, r: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  }

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center p-2">
        <svg
          viewBox="0 0 420 420"
          className="w-full h-full drop-shadow-[0_0_25px_rgba(168,85,247,0.25)] select-none"
        >
          <defs>
            <radialGradient id="wheelCenterGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1b0f38" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#0c071a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#05030a" stopOpacity="1" />
            </radialGradient>
            <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Outer circle ring */}
          <circle cx={center} cy={center} r={radius + 20} fill="none" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx={center} cy={center} r={radius} fill="url(#wheelCenterGrad)" stroke="#d97706" strokeWidth="2" strokeOpacity="0.8" />
          <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="#7e22ce" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 3" />
          <circle cx={center} cy={center} r={centerRadius} fill="#0d071a" stroke="#d97706" strokeWidth="1.5" strokeOpacity="0.6" />

          {/* 12 Sectors & House Lines */}
          {signs.map((sign, index) => {
            const angle = index * 30;
            const startP = polarToCartesian(center, center, centerRadius, angle);
            const endP = polarToCartesian(center, center, radius, angle);
            const textP = polarToCartesian(center, center, radius - 15, angle + 15);
            const houseTextP = polarToCartesian(center, center, centerRadius + 22, angle + 15);

            return (
              <g key={sign.name}>
                {/* House line */}
                <line
                  x1={startP.x}
                  y1={startP.y}
                  x2={endP.x}
                  y2={endP.y}
                  stroke="#a855f7"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                />

                {/* Sign Glyph */}
                <text
                  x={textP.x}
                  y={textP.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#fcd34d"
                  fontSize="14"
                  fontWeight="bold"
                  className="transition-colors hover:fill-white cursor-pointer"
                >
                  {sign.symbol}
                </text>

                {/* House Number */}
                <text
                  x={houseTextP.x}
                  y={houseTextP.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {index + 1}
                </text>
              </g>
            );
          })}

          {/* Major Aspect Lines inside wheel */}
          {chart.aspects.slice(0, 8).map((asp, i) => {
            const p1 = chart.planets.find((p) => p.name === asp.planet1);
            const p2 = chart.planets.find((p) => p.name === asp.planet2);
            if (!p1 || !p2) return null;

            // Approximate angle by house + degree
            const a1 = (p1.house - 1) * 30 + (p1.degree % 30);
            const a2 = (p2.house - 1) * 30 + (p2.degree % 30);

            const pt1 = polarToCartesian(center, center, centerRadius + 10, a1);
            const pt2 = polarToCartesian(center, center, centerRadius + 10, a2);

            const isHarmonious = asp.nature === 'Harmonis';
            return (
              <line
                key={i}
                x1={pt1.x}
                y1={pt1.y}
                x2={pt2.x}
                y2={pt2.y}
                stroke={isHarmonious ? '#34d399' : '#f87171'}
                strokeWidth="1"
                strokeOpacity="0.45"
              />
            );
          })}

          {/* Plotted Planet Glyphs */}
          {chart.planets.map((planet, idx) => {
            // Angle on wheel
            const planetAngle = (planet.house - 1) * 30 + (planet.degree % 30);
            // Stagger radius slightly if multiple planets are close
            const rOffset = (idx % 2 === 0) ? 0 : -14;
            const pos = polarToCartesian(center, center, innerRadius - 16 + rOffset, planetAngle);

            const isSelected = selectedPlanet?.name === planet.name;

            return (
              <g
                key={planet.name}
                onClick={() => setSelectedPlanet(planet)}
                className="cursor-pointer group"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 13 : 10}
                  fill={isSelected ? '#f59e0b' : '#2e1065'}
                  stroke={isSelected ? '#ffffff' : '#eab308'}
                  strokeWidth={isSelected ? '2' : '1'}
                  className="transition-all"
                />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isSelected ? '#000000' : '#fef08a'}
                  fontSize="10"
                  fontWeight="bold"
                >
                  {planet.symbol}
                </text>
              </g>
            );
          })}

          {/* Center Ascendant badge */}
          <circle cx={center} cy={center} r="28" fill="#180b33" stroke="#f59e0b" strokeWidth="1" />
          <text
            x={center}
            y={center - 7}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fbbf24"
            fontSize="9"
            fontWeight="bold"
            letterSpacing="0.05em"
          >
            ASC
          </text>
          <text
            x={center}
            y={center + 8}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            fontSize="10"
            fontWeight="600"
          >
            {chart.risingSign}
          </text>
        </svg>
      </div>

      {/* Interactive Planet Detail callout */}
      {selectedPlanet ? (
        <div className="w-full mt-2 p-3 bg-purple-950/60 border border-amber-500/40 rounded-xl text-xs space-y-1 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-amber-300 flex items-center gap-1.5 text-sm">
              <span className="text-base">{selectedPlanet.symbol}</span>
              {selectedPlanet.name}
            </span>
            <span className="text-slate-300 font-mono">
              {selectedPlanet.sign} {selectedPlanet.degree}°{selectedPlanet.minute}' · Rumah {selectedPlanet.house}
            </span>
          </div>
          <p className="text-slate-300">{selectedPlanet.meaning}</p>
          <div className="text-[11px] text-amber-200/80 italic">Arketipe: {selectedPlanet.archetype}</div>
        </div>
      ) : (
        <p className="text-[11px] text-slate-400 mt-2 text-center">
          Ketuk simbol planet pada roda kosmik di atas untuk membaca maknanya.
        </p>
      )}
    </div>
  );
};
