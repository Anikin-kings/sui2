
import React, { useEffect, useMemo } from 'react';
import { Mode } from '../types';

interface OutputDisplayProps {
  output: string;
  isLoading: boolean;
  error: string | null;
  mode: Mode;
}

const parseOutput = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
        const codeBlockMatch = part.match(/```(\w*)\n([\s\S]*?)```/);
        if (codeBlockMatch) {
            const lang = codeBlockMatch[1] || 'plaintext';
            const code = codeBlockMatch[2];
            return { type: 'code', content: code, lang, key: `code-${index}` };
        }
        if(part.trim()){
            return { type: 'text', content: part, key: `text-${index}` };
        }
        return null;
    }).filter(Boolean);
};

const CodeBlock: React.FC<{ code: string; lang: string }> = ({ code, lang }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        (window as any).hljs.highlightAll();
    }, [code, lang]);

    return (
        <div className="bg-background rounded-md my-4 relative">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-900 rounded-t-md border-b border-border-color">
                <span className="text-xs font-sans text-text-secondary uppercase">{lang}</span>
                <button
                    onClick={handleCopy}
                    className="text-xs text-text-secondary hover:text-text-primary transition-colors flex items-center"
                >
                    {copied ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            Copy
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto"><code className={`language-${lang}`}>{code}</code></pre>
        </div>
    );
};


export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, isLoading, error, mode }) => {
    
    const parsedContent = useMemo(() => parseOutput(output), [output]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-text-secondary">
                    <svg className="animate-spin h-8 w-8 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="font-semibold">Move Mentor is thinking...</p>
                    <p className="text-sm">Please wait while I process your request.</p>
                </div>
            );
        }

        if (error) {
            return (
                 <div className="flex flex-col items-center justify-center h-full text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h3 className="text-lg font-semibold">An Error Occurred</h3>
                    <p className="text-sm text-center px-4">{error}</p>
                </div>
            );
        }

        if (!output) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center text-text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    <h2 className="text-xl font-bold text-text-primary">Welcome to Move Mentor</h2>
                    <p className="mt-2 max-w-md">Your AI partner for mastering the Move language. Select an action on the left, provide your input, and see the magic happen here.</p>
                </div>
            );
        }
        
        return (
            <div className="prose prose-invert prose-sm md:prose-base max-w-none leading-relaxed">
                {parsedContent.map(item => {
                    if(!item) return null;
                    if(item.type === 'code') {
                        return <CodeBlock key={item.key} code={item.content} lang={item.lang} />
                    }
                    return <p key={item.key}>{item.content}</p>;
                })}
            </div>
        );
    };

    return (
        <div className="bg-surface rounded-lg border border-border-color p-6 shadow-lg h-full overflow-y-auto">
            {renderContent()}
        </div>
    );
};
