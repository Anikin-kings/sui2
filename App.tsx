
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { OutputDisplay } from './components/OutputDisplay';
import { runQuery } from './services/geminiService';
import { Mode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>(Mode.GENERATE);
  const [userInput, setUserInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Input cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      const result = await runQuery(mode, userInput);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, mode]);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="lg:h-[calc(100vh-120px)] flex flex-col">
           <ControlPanel
            mode={mode}
            setMode={setMode}
            userInput={userInput}
            setUserInput={setUserInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:h-[calc(100vh-120px)] flex flex-col">
            <OutputDisplay
                output={output}
                isLoading={isLoading}
                error={error}
                mode={mode}
            />
        </div>
      </main>
    </div>
  );
};

export default App;
