import { AspectData, BirthChartResult, ElementType, PlanetaryPosition } from '../types';
import { ZODIAC_SIGNS } from './zodiacData';

// Astronomical and Astrological Signs in order (0 = Aries, 1 = Taurus, ... 11 = Pisces)
const SIGNS_ORDER = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagitarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SIGN_ELEMENTS: Record<string, ElementType> = {
  Aries: 'Api', Taurus: 'Tanah', Gemini: 'Udara', Cancer: 'Air',
  Leo: 'Api', Virgo: 'Tanah', Libra: 'Udara', Scorpio: 'Air',
  Sagitarius: 'Api', Capricorn: 'Tanah', Aquarius: 'Udara', Pisces: 'Air',
};

// House life themes in Indonesian
const HOUSE_THEMES = [
  'Identitas Diri & Penampilan Fisik (First Impression)',
  'Keuangan Pribadi, Nilai Moral & Kepemilikan (Values & Wealth)',
  'Komunikasi, Pola Pikir & Lingkungan Terdekat (Mind & Network)',
  'Rumah, Keluarga, Akar Batin & Rasa Aman (Home & Roots)',
  'Kreativitas, Asmara, Kesenangan & Ekspresi Jiwa (Creativity & Joy)',
  'Rutinitas Harian, Kesehatan & Etos Pelayanan (Wellness & Work)',
  'Kemitraan, Hubungan 1-on-1 & Komitmen (Partnerships & Marriage)',
  'Transformasi, Kedalaman Emosi & Regenerasi (Rebirth & Shared Assets)',
  'Filsafat, Pendidikan Tinggi, Petualangan & Keyakinan (Wisdom & Travel)',
  'Karir, Reputasi Publik & Pencapaian Tertinggi (Career & Legacy)',
  'Komunitas, Persahabatan & Visi Masa Depan (Friendships & Hopes)',
  'Alam Bawah Sadar, Spiritualitas & Pelepasan Batin (Subconscious & Healing)',
];

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function normalizeDeg(deg: number): number {
  let val = deg % 360;
  if (val < 0) val += 360;
  return val;
}

// Convert Calendar date and UTC time to Julian Day (Meeus algorithm)
function getJulianDay(year: number, month: number, day: number, hourUTC: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const dayFraction = day + hourUTC / 24;
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + dayFraction + B - 1524.5;
}

export function calculateBirthChart(
  name: string,
  birthDateStr: string, // YYYY-MM-DD
  birthTimeStr: string, // HH:mm
  city: string,
  latitude: number,
  longitude: number,
  timezoneOffsetHours: number
): BirthChartResult {
  const [yearStr, monthStr, dayStr] = birthDateStr.split('-');
  const year = parseInt(yearStr, 10) || 2000;
  const month = parseInt(monthStr, 10) || 1;
  const day = parseInt(dayStr, 10) || 1;

  const [hStr, mStr] = (birthTimeStr || '12:00').split(':');
  const localHour = parseInt(hStr, 10) || 12;
  const localMinute = parseInt(mStr, 10) || 0;
  const localTimeDec = localHour + localMinute / 60;
  const hourUTC = localTimeDec - timezoneOffsetHours;

  const JD = getJulianDay(year, month, day, hourUTC);
  const T = (JD - 2451545.0) / 36525.0; // Julian centuries since J2000.0

  // 1. Sun Position
  const L0 = normalizeDeg(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M_sun = normalizeDeg(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const M_rad = degToRad(M_sun);
  const C_sun = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M_rad)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * M_rad)
    + 0.000289 * Math.sin(3 * M_rad);
  const sunLongitude = normalizeDeg(L0 + C_sun);

  // 2. Moon Position & Phase
  const L_moon = normalizeDeg(218.3164477 + 481267.88123421 * T);
  const D_moon = normalizeDeg(297.8501921 + 445267.1114034 * T);
  const M_moon = normalizeDeg(134.9633964 + 477198.8675055 * T);
  const F_moon = normalizeDeg(93.2720950 + 483202.0175233 * T);

  const moonLongCorrection =
    6.288774 * Math.sin(degToRad(M_moon))
    + 1.274027 * Math.sin(degToRad(2 * D_moon - M_moon))
    + 0.658314 * Math.sin(degToRad(2 * D_moon))
    + 0.213618 * Math.sin(degToRad(2 * M_moon))
    - 0.185116 * Math.sin(degToRad(M_sun))
    - 0.114332 * Math.sin(degToRad(2 * F_moon));
  const moonLongitude = normalizeDeg(L_moon + moonLongCorrection);

  // Lunar Phase
  const phaseAngle = normalizeDeg(moonLongitude - sunLongitude);
  let moonPhaseName = 'Bulan Baru (New Moon)';
  let moonPhasePercent = Math.round((1 - Math.cos(degToRad(phaseAngle))) * 50);

  if (phaseAngle < 22.5 || phaseAngle >= 337.5) {
    moonPhaseName = 'Bulan Baru (New Moon)';
  } else if (phaseAngle < 67.5) {
    moonPhaseName = 'Sabit Awal (Waxing Crescent)';
  } else if (phaseAngle < 112.5) {
    moonPhaseName = 'Kuartir Pertama (First Quarter)';
  } else if (phaseAngle < 157.5) {
    moonPhaseName = 'Cembung Membesar (Waxing Gibbous)';
  } else if (phaseAngle < 202.5) {
    moonPhaseName = 'Bulan Purnama (Full Moon)';
  } else if (phaseAngle < 247.5) {
    moonPhaseName = 'Cembung Mengecil (Waning Gibbous)';
  } else if (phaseAngle < 292.5) {
    moonPhaseName = 'Kuartir Ketiga (Third Quarter)';
  } else {
    moonPhaseName = 'Sabit Tua (Waning Crescent)';
  }

  // 3. Ascendant (Rising Sign) via Local Sidereal Time
  const GMST = normalizeDeg(280.46061837 + 360.98564736629 * (JD - 2451545.0) + 0.000387933 * T * T);
  const LST = normalizeDeg(GMST + longitude); // Local Sidereal Time in degrees
  const eps = degToRad(23.439291 - 0.0130042 * T); // Obliquity of ecliptic
  const phi = degToRad(latitude); // Latitude
  const theta = degToRad(LST);

  // Ascendant formula
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);
  const sinEps = Math.sin(eps);
  const cosEps = Math.cos(eps);
  const tanPhi = Math.tan(phi);

  const y = -cosTheta;
  const x = sinTheta * cosEps + tanPhi * sinEps;
  let ascendantLongitude = normalizeDeg(radToDeg(Math.atan2(y, x)));

  // 4. Planets (Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto)
  // Approximate Keplerian coordinates relative to Sun
  const mercLong = normalizeDeg(sunLongitude + 22 * Math.sin(degToRad(T * 149472 + 174)));
  const venLong = normalizeDeg(sunLongitude + 46 * Math.sin(degToRad(T * 58517 + 50)));
  const marsLong = normalizeDeg(normalizeDeg(355.433 + 19140.299 * T) + 10.6 * Math.sin(degToRad(19.373 + 19139.858 * T)));
  const jupLong = normalizeDeg(normalizeDeg(34.351 + 3034.905 * T) + 5.5 * Math.sin(degToRad(20.3 + 3034.9 * T)));
  const satLong = normalizeDeg(normalizeDeg(50.077 + 1222.113 * T) + 6.3 * Math.sin(degToRad(317.0 + 1222.1 * T)));
  const uraLong = normalizeDeg(normalizeDeg(314.055 + 428.466 * T));
  const nepLong = normalizeDeg(normalizeDeg(304.348 + 218.486 * T));
  const pluLong = normalizeDeg(normalizeDeg(238.929 + 145.180 * T));

  const allPoints = [
    { name: 'Matahari (Sun)', symbol: '☉', lon: sunLongitude, meaning: 'Identitas inti, ego sadar, vitalitas hidup, dan esensi jiwa.', archetype: 'Sang Raja / Pahlawan Diri' },
    { name: 'Bulan (Moon)', symbol: '☽', lon: moonLongitude, meaning: 'Kebutuhan emosional batin, insting bawah sadar, dan memori masa lalu.', archetype: 'Sang Ibu / Pelindung Emosi' },
    { name: 'Merkurius (Mercury)', symbol: '☿', lon: mercLong, meaning: 'Pola pikir, cara berkomunikasi, analisis data, dan kecerdasan adaptif.', archetype: 'Sang Utusan & Pemikir' },
    { name: 'Venus (Venus)', symbol: '♀', lon: venLong, meaning: 'Gaya mencintai, daya tarik keindahan, nilai finansial, dan harmoni estetika.', archetype: 'Sang Pecinta & Seniman' },
    { name: 'Mars (Mars)', symbol: '♂', lon: marsLong, meaning: 'Daya dorong tindakan, gairah, energi fisik, dan cara menghadapi persaingan.', archetype: 'Sang Prajurit & Pejuang' },
    { name: 'Jupiter (Jupiter)', symbol: '♃', lon: jupLong, meaning: 'Keberuntungan, pertumbuhan intelektual, optimisme, dan filosofi hidup.', archetype: 'Sang Filsuf & Guru Bijak' },
    { name: 'Saturnus (Saturn)', symbol: '♄', lon: satLong, meaning: 'Disiplin diri, batasan hidup, tanggung jawab, dan pelajaran kedewasaan.', archetype: 'Sang Guru Disiplin & Waktu' },
    { name: 'Uranus (Uranus)', symbol: '♅', lon: uraLong, meaning: 'Inovasi mendadak, kebebasan berpikir, dan terobosan orisinalitas.', archetype: 'Sang Visioner Revolusioner' },
    { name: 'Neptunus (Neptune)', symbol: '♆', lon: nepLong, meaning: 'Imajinasi mistik, kepekaan spiritual, empati, dan mimpi indah.', archetype: 'Sang Mistik & Pemimpi' },
    { name: 'Pluto (Pluto)', symbol: '♇', lon: pluLong, meaning: 'Transformasi batin mendalam, kebangkitan jiwa, dan regenerasi personal.', archetype: 'Sang Alkemis Transformasi' },
  ];

  // Helper to get sign and degree from ecliptic longitude
  function getSignAndDegree(lon: number) {
    const signIdx = Math.floor(lon / 30);
    const signName = SIGNS_ORDER[signIdx % 12];
    const degreeInSign = lon % 30;
    const deg = Math.floor(degreeInSign);
    const min = Math.floor((degreeInSign - deg) * 60);
    return { signName, deg, min };
  }

  // 12 Houses (Equal House System from Ascendant)
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const houseCuspLon = normalizeDeg(ascendantLongitude + i * 30);
    const { signName, deg } = getSignAndDegree(houseCuspLon);
    houses.push({
      houseNumber: i + 1,
      sign: signName,
      cuspDegree: deg,
      theme: HOUSE_THEMES[i],
    });
  }

  // Find which house a planet is in
  function getHouseForLongitude(lon: number): number {
    const diff = normalizeDeg(lon - ascendantLongitude);
    return Math.floor(diff / 30) + 1;
  }

  const planets: PlanetaryPosition[] = allPoints.map((pt) => {
    const { signName, deg, min } = getSignAndDegree(pt.lon);
    const houseNum = getHouseForLongitude(pt.lon);
    return {
      name: pt.name,
      symbol: pt.symbol,
      sign: signName,
      degree: deg,
      minute: min,
      house: houseNum,
      meaning: pt.meaning,
      archetype: pt.archetype,
      description: `${pt.name} di ${signName} (${deg}°${min}') menempati Rumah ke-${houseNum}. ${pt.meaning}`,
    };
  });

  // Calculate Aspects
  const aspects: AspectData[] = [];
  const MAJOR_ASPECTS = [
    { type: 'Conjunction' as const, angle: 0, orb: 8, symbol: '☌', nature: 'Netral / Penguat' as const, text: 'menyatukan dua energi menjadi satu daya dorong yang sangat kuat' },
    { type: 'Sextile' as const, angle: 60, orb: 5, symbol: '⚹', nature: 'Harmonis' as const, text: 'membuka peluang dan kerja sama alami yang mudah diasah' },
    { type: 'Square' as const, angle: 90, orb: 7, symbol: '□', nature: 'Dinamis / Tantangan' as const, text: 'menciptakan ketegangan konstruktif yang memicu pertumbuhan karakter' },
    { type: 'Trine' as const, angle: 120, orb: 7, symbol: '△', nature: 'Harmonis' as const, text: 'aliran bakat bawaan yang harmonis, mengalir lancar tanpa hambatan' },
    { type: 'Opposition' as const, angle: 180, orb: 8, symbol: '☍', nature: 'Dinamis / Tantangan' as const, text: 'mengajarkan seni menyeimbangkan dua polaritas kehidupan' },
  ];

  for (let i = 0; i < allPoints.length; i++) {
    for (let j = i + 1; j < allPoints.length; j++) {
      const p1 = allPoints[i];
      const p2 = allPoints[j];
      const diff = Math.abs(p1.lon - p2.lon);
      const angle = diff > 180 ? 360 - diff : diff;

      for (const asp of MAJOR_ASPECTS) {
        const delta = Math.abs(angle - asp.angle);
        if (delta <= asp.orb) {
          aspects.push({
            planet1: p1.name,
            planet2: p2.name,
            aspectType: asp.type,
            symbol: asp.symbol,
            angle: Math.round(angle),
            orb: parseFloat(delta.toFixed(1)),
            nature: asp.nature,
            interpretation: `${asp.symbol} Aspek ${asp.type} antara ${p1.name} dan ${p2.name} (${delta.toFixed(1)}° orb): Hubungan ini ${asp.text}.`,
          });
          break;
        }
      }
    }
  }

  // Calculate Element Balance
  const elementBalance = { Api: 0, Tanah: 0, Udara: 0, Air: 0 };
  planets.forEach((p) => {
    const el = SIGN_ELEMENTS[p.sign];
    if (el) elementBalance[el] += 1;
  });

  const ascSign = getSignAndDegree(ascendantLongitude).signName;
  if (SIGN_ELEMENTS[ascSign]) {
    elementBalance[SIGN_ELEMENTS[ascSign]] += 1;
  }

  let dominantElement: ElementType = 'Api';
  let maxCount = -1;
  (Object.keys(elementBalance) as ElementType[]).forEach((el) => {
    if (elementBalance[el] > maxCount) {
      maxCount = elementBalance[el];
      dominantElement = el;
    }
  });

  const sunData = getSignAndDegree(sunLongitude);
  const moonData = getSignAndDegree(moonLongitude);
  const ascData = getSignAndDegree(ascendantLongitude);

  return {
    name,
    birthDate: birthDateStr,
    birthTime: birthTimeStr,
    city,
    latitude,
    longitude,
    sunSign: sunData.signName,
    sunDegree: sunData.deg,
    moonSign: moonData.signName,
    moonDegree: moonData.deg,
    moonPhaseName,
    moonPhasePercent,
    risingSign: ascData.signName,
    risingDegree: ascData.deg,
    planets,
    houses,
    aspects: aspects.slice(0, 10), // Take top 10 most prominent aspects
    elementBalance,
    dominantElement,
  };
}
