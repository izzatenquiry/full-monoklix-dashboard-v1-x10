
import React from 'react';
import { getTranslations } from '../../services/translations';
import { type Language } from '../../types';

interface TwoColumnLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  language: Language;
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ leftPanel, rightPanel }) => {
  const T = getTranslations().common;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Left Panel: Controls */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm dark:shadow-lg flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar border border-neutral-200 dark:border-white/5">
        {leftPanel}
      </div>
      {/* Right Panel: Results */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl flex flex-col p-4 shadow-sm dark:shadow-lg border border-neutral-200 dark:border-white/5">
        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-primary-500 rounded-full"></span>
            {T.output}
        </h2>
        <div className="flex-1 flex items-center justify-center bg-neutral-100 dark:bg-black/40 rounded-xl overflow-hidden relative group p-2 border border-neutral-200 dark:border-white/5">
          {rightPanel}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
