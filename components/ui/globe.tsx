import React from "react";

const EarthGlobe: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes earthRotate {
            0% { background-position: 0 0; }
            100% { background-position: 400px 0; }
          }
          @keyframes twinkling { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-slow { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-long { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-fast { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        `}
      </style>
      <div className="flex items-center justify-center w-full h-full relative overflow-visible pointer-events-none">
        {/* Background glow to make it look 3D and floating */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3a7bfd]/5 to-transparent blur-3xl rounded-full" />
        
        <div
          className="relative w-full h-full rounded-full shadow-[0_0_50px_rgba(58,123,253,0.2),-5px_0_15px_#c3f4ff_inset,15px_2px_45px_#000_inset,-24px_-2px_60px_#c3f4ff99_inset,250px_0_44px_#00000066_inset,150px_0_50px_#000000aa_inset]"
          style={{
            backgroundImage: "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "left",
            animation: "earthRotate 40s linear infinite",
          }}
        >
          {/* Stars */}
          <div
            className="absolute left-[10%] top-[40%] w-0.5 h-0.5 bg-white rounded-full"
            style={{ animation: "twinkling 3s infinite" }}
          />
          <div
            className="absolute right-[20%] top-[10%] w-0.5 h-0.5 bg-white rounded-full"
            style={{ animation: "twinkling-slow 2s infinite" }}
          />
          <div
            className="absolute left-[80%] bottom-[30%] w-0.5 h-0.5 bg-white rounded-full"
            style={{ animation: "twinkling-long 4s infinite" }}
          />
          <div
            className="absolute left-[15%] bottom-[20%] w-0.5 h-0.5 bg-white rounded-full"
            style={{ animation: "twinkling-fast 1.5s infinite" }}
          />
        </div>
      </div>
    </>
  );
};

export default EarthGlobe;
