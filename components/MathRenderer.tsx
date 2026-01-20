
import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  text: string;
  className?: string;
  isLarge?: boolean;
}

const MathRenderer: React.FC<MathRendererProps> = ({ text, className = "", isLarge = false }) => {
  const renderedContent = useMemo(() => {
    if (!text) return null;

    const parts = text.split(/(\$[^$]+\$)/g);

    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        let formula = part.slice(1, -1).trim();
        formula = formula.replace(/&nbsp;/g, ' ').replace(/\\ /g, ' ');
        
        try {
          const html = katex.renderToString(formula, {
            throwOnError: false,
            displayMode: isLarge,
            trust: true,
            strict: false,
            output: 'html'
          });
          
          return (
            <span
              key={`math-${index}`}
              className={`inline-block mx-1 align-middle ${isLarge ? 'text-slate-900' : 'text-inherit'}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (e) {
          return <span key={`err-${index}`} className="text-red-600 font-bold">{part}</span>;
        }
      } 
      return <span key={`text-${index}`} className="whitespace-pre-wrap">{part}</span>;
    });
  }, [text, isLarge]);

  return <div className={`${className} leading-relaxed`}>{renderedContent}</div>;
};

export default MathRenderer;
