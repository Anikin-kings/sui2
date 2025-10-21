
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-surface/50 backdrop-blur-sm border-b border-border-color sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary mr-3"
        >
          <path
            d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 7L12 12L22 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Move Mentor
        </h1>
      </div>
    </header>
  );
};
