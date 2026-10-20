export interface CityInfo {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezoneOffsetHours: number; // UTC offset in hours (e.g. +7 for WIB, +8 for WITA, +9 for WIT)
}

export const CITIES_DATABASE: CityInfo[] = [
  { name: 'Jakarta (WIB)', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456, timezoneOffsetHours: 7 },
  { name: 'Surabaya (WIB)', country: 'Indonesia', latitude: -7.2575, longitude: 112.7521, timezoneOffsetHours: 7 },
  { name: 'Bandung (WIB)', country: 'Indonesia', latitude: -6.9175, longitude: 107.6191, timezoneOffsetHours: 7 },
  { name: 'Medan (WIB)', country: 'Indonesia', latitude: 3.5952, longitude: 98.6722, timezoneOffsetHours: 7 },
  { name: 'Semarang (WIB)', country: 'Indonesia', latitude: -6.9667, longitude: 110.4167, timezoneOffsetHours: 7 },
  { name: 'Yogyakarta (WIB)', country: 'Indonesia', latitude: -7.7956, longitude: 110.3695, timezoneOffsetHours: 7 },
  { name: 'Makassar (WITA)', country: 'Indonesia', latitude: -5.1477, longitude: 119.4327, timezoneOffsetHours: 8 },
  { name: 'Denpasar / Bali (WITA)', country: 'Indonesia', latitude: -8.6705, longitude: 115.2126, timezoneOffsetHours: 8 },
  { name: 'Palembang (WIB)', country: 'Indonesia', latitude: -2.9761, longitude: 104.7754, timezoneOffsetHours: 7 },
  { name: 'Balikpapan (WITA)', country: 'Indonesia', latitude: -1.2379, longitude: 116.8289, timezoneOffsetHours: 8 },
  { name: 'Jayapura (WIT)', country: 'Indonesia', latitude: -2.5337, longitude: 140.7181, timezoneOffsetHours: 9 },
  { name: 'Padang (WIB)', country: 'Indonesia', latitude: -0.9471, longitude: 100.4172, timezoneOffsetHours: 7 },
  { name: 'Batam (WIB)', country: 'Indonesia', latitude: 1.1301, longitude: 104.0529, timezoneOffsetHours: 7 },
  { name: 'Malang (WIB)', country: 'Indonesia', latitude: -7.9666, longitude: 112.6326, timezoneOffsetHours: 7 },
  { name: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezoneOffsetHours: 8 },
  { name: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.1390, longitude: 101.6869, timezoneOffsetHours: 8 },
  { name: 'Tokyo', country: 'Jepang', latitude: 35.6762, longitude: 139.6503, timezoneOffsetHours: 9 },
  { name: 'London', country: 'Inggris', latitude: 51.5074, longitude: -0.1278, timezoneOffsetHours: 0 },
  { name: 'New York', country: 'Amerika Serikat', latitude: 40.7128, longitude: -74.0060, timezoneOffsetHours: -5 },
  { name: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezoneOffsetHours: 10 },
  { name: 'Paris', country: 'Prancis', latitude: 48.8566, longitude: 2.3522, timezoneOffsetHours: 1 },
];
