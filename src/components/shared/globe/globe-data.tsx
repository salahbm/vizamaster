export interface Capital {
  lat: number;
  lng: number;
  country: string;
  flag: string;
}

export const capitals: Capital[] = [
  { lat: 45.4215, lng: -75.6972, country: 'Canada', flag: '🇨🇦' }, // Ottawa
  { lat: 38.9072, lng: -77.0369, country: 'USA', flag: '🇺🇸' }, // Washington, D.C.
  { lat: 42.6977, lng: 23.3219, country: 'Bulgaria', flag: '🇧🇬' }, // Sofia
  { lat: 52.52, lng: 13.405, country: 'Germany', flag: '🇩🇪' }, // Berlin
  { lat: 39.9334, lng: 32.8597, country: 'Turkey', flag: '🇹🇷' }, // Ankara
  { lat: 45.815, lng: 15.9819, country: 'Croatia', flag: '🇭🇷' }, // Zagreb
  { lat: 35.6895, lng: 139.6917, country: 'Japan', flag: '🇯🇵' }, // Tokyo
  { lat: 55.6761, lng: 12.5683, country: 'Denmark', flag: '🇩🇰' }, // Copenhagen
  { lat: 55.7558, lng: 37.6173, country: 'Russia', flag: '🇷🇺' }, // Moscow
  { lat: 28.6139, lng: 77.209, country: 'India', flag: '🇮🇳' }, // New Delhi
  { lat: 35.8617, lng: 104.1954, country: 'China', flag: '🇨🇳' }, // Beijing
  { lat: 51.5074, lng: -0.1278, country: 'UK', flag: '🇬🇧' }, // London
  { lat: 41.3112, lng: 69.2401, country: 'Uzbekistan', flag: '🇺🇿' },
];
