import React from 'react';

const InfoBox = ({ title, children }) => (
  <div className="my-10 bg-[#1e293b] rounded-md p-6 md:p-8 shadow-md">
    <div className="flex items-center mb-4">
      <span className="text-xs font-black tracking-widest text-blue-400 uppercase">
        {title}
      </span>
    </div>
   <div className="text-slate-300 font-sans [&_strong]:text-white">
      {children}
    </div>
  </div>
);

export default InfoBox;