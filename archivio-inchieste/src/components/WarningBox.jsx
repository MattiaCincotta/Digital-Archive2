import React from 'react';

const WarningBox = ({ title, children }) => (
  <div className="my-10 bg-white border border-slate-200 rounded-md shadow-sm">
    <div className="border-l-[6px] border-red-600 p-6 md:p-8">
      <div className="flex items-center mb-4">
        <span className="text-xs font-black tracking-widest text-red-700 uppercase">
          {title}
        </span>
      </div>
      <div className="text-slate-700 font-sans">
        {children}
      </div>
    </div>
  </div>
);

export default WarningBox;