'use client';
import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

interface Capital {
  lat: number;
  lng: number;
  country: string;
  flag: string;
}

const capitals: Capital[] = [
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

const MyGlobe = () => {
  const globeEl = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleClick = (capital: Capital) => {
    if (globeEl.current) {
      // @ts-ignore
      globeEl.current.pointOfView(
        { lat: capital.lat, lng: capital.lng, altitude: 0.5 },
        1000 // Duration in milliseconds
      );
    }
  };
  const handleReset = () => {
    if (globeEl.current) {
      // @ts-ignore
      globeEl.current.pointOfView(
        { lat: 20, lng: 0, altitude: 2 }, // Initial position
        1000 // Duration in milliseconds
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full pb-12">
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          Loading...
        </div>
      )}
      <div className="flex flex-wrap justify-center items-center p-4  ">
        {capitals.map((capital) => (
          <div
            key={capital.lat}
            className="cursor-pointer text-orange-500 hover:text-purple-500 m-2 p-4 border-2 border-orange-500 hover:border-purple-500 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleClick(capital)}
          >
            <div className="text-center">
              <div className="font-semibold text-lg">{capital.country}</div>
              <div className="text-3xl">{capital.flag}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative max-w-screen-xl mx-auto">
        <button
          onClick={handleReset}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1,
            padding: '10px',
            background: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
        <Globe
          ref={globeEl as any}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          htmlElementsData={capitals}
          htmlLat={(d: any) => d?.lat}
          htmlLng={(d: any) => d?.lng}
          htmlElement={(d: any) => {
            const el = document.createElement('div');
            el.innerHTML = `${d.flag}`;
            el.style.cursor = 'pointer';
            return el;
          }}
          htmlTransitionDuration={1000}
          backgroundImageUrl={
            '//unpkg.com/three-globe/example/img/night-sky.png'
          }
          onGlobeClick={() => handleReset()}
          height={500}
        />
      </div>
    </div>
  );
};

export default MyGlobe;
