
import React, { useState, useEffect } from 'react';
import { getContent } from '../../services/contentService';
import { type TutorialContent, type User, type Language } from '../../types';
import { ChevronDownIcon, PlayIcon } from '../Icons';

interface ECourseViewProps {
    currentUser: User;
    language: Language;
}

const ECourseView: React.FC<ECourseViewProps> = ({ currentUser }) => {
  const [content, setContent] = useState<TutorialContent | null>(null);
  const [isTutorialsVisible, setIsTutorialsVisible] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
        const contentData = await getContent();
        setContent(contentData);
    };
    fetchPageData();
  }, []);

  if (!content) {
    return <div className="text-center p-10 text-neutral-400">Loading tutorial content...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm dark:shadow-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white flex items-center gap-3">
                <span className="text-primary-600 dark:text-primary-400">#</span> Getting Started
            </h2>
            <div className="aspect-video mb-6 rounded-xl overflow-hidden shadow-md dark:shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
              <iframe 
                className="w-full h-full"
                src={content.mainVideoUrl}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{content.mainTitle}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{content.mainDescription}</p>
            </div>
        </div>
      </div>

      {content.tutorials.length > 0 && (
        <div>
          <div 
            onClick={() => setIsTutorialsVisible(!isTutorialsVisible)}
            className="flex justify-between items-center cursor-pointer group p-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors border border-transparent dark:hover:border-white/5"
            aria-expanded={isTutorialsVisible}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsTutorialsVisible(!isTutorialsVisible) }}
          >
            <h2 className="text-2xl font-bold border-l-4 border-primary-500 pl-4 text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Video Tutorials</h2>
            <ChevronDownIcon className={`w-6 h-6 text-neutral-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-transform duration-300 ${isTutorialsVisible ? 'rotate-180' : ''}`} />
          </div>
          
          <div className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isTutorialsVisible ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.tutorials.map((tutorial, index) => (
                      <div key={index} className="bg-white dark:bg-neutral-900 rounded-xl p-5 flex flex-col shadow-sm dark:shadow-lg transition-transform hover:-translate-y-1 hover:shadow-md dark:hover:shadow-primary-500/10 hover:border-primary-500/30 border border-neutral-200 dark:border-white/5">
                        <div className="flex-1">
                          <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-4 flex items-center justify-center font-semibold text-neutral-600 overflow-hidden relative group">
                            {tutorial.thumbnailUrl ? (
                              <>
                                <img src={tutorial.thumbnailUrl} alt={tutorial.title} className="w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-primary-500/90 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-110 transition-transform">
                                        <PlayIcon className="w-4 h-4 text-white ml-0.5" />
                                    </div>
                                </div>
                              </>
                            ) : (
                              <span>Tutorial {index + 1}</span>
                            )}
                          </div>
                          <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white line-clamp-1">{tutorial.title}</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">{tutorial.description}</p>
                        </div>
                        <a href="#" className="text-primary-600 dark:text-primary-400 font-semibold mt-4 text-sm hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1">
                            Watch Video <ChevronDownIcon className="w-4 h-4 -rotate-90" />
                        </a>
                      </div>
                    ))}
                  </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ECourseView;
