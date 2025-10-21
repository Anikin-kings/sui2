
import React from 'react';
import { Mode } from '../types';

interface ControlPanelProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const modeOptions = [
  { value: Mode.GENERATE, label: 'Generate Code', placeholder: 'Describe the function or module you want to create... e.g., "a simple coin module"' },
  { value: Mode.EXPLAIN, label: 'Explain Code', placeholder: 'Paste your Move code here to get an explanation...' },
  { value: Mode.FIX, label: 'Fix Code', placeholder: 'Paste your broken Move code here to get a fix...' },
  { value: Mode.LEARN, label: 'Learn a Concept', placeholder: 'Ask about a Move concept... e.g., "What are abilities in Move?"' },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  mode,
  setMode,
  userInput,
  setUserInput,
  onSubmit,
  isLoading,
}) => {
  const currentOption = modeOptions.find(opt => opt.value === mode) || modeOptions[0];

  return (
    <div className="bg-surface rounded-lg border border-border-color p-6 flex flex-col shadow-lg h-full">
      <div className="mb-4">
        <label htmlFor="mode-select" className="block text-sm font-medium text-text-secondary mb-2">
          I want to...
        </label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="w-full bg-background border border-border-color rounded-md px-3 py-2 text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition"
        >
          {modeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow flex flex-col">
        <label htmlFor="user-input" className="block text-sm font-medium text-text-secondary mb-2">
          {currentOption.label}
        </label>
        <textarea
          id="user-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={currentOption.placeholder}
          className="flex-grow w-full bg-background border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition resize-none font-mono text-sm"
          rows={15}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="mt-6 w-full bg-primary text-white font-semibold py-3 px-4 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'Submit Request'
        )}
      </button>
    </div>
  );
};
