import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

const MermaidDiagram = ({ code }) => {
  const elementRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, code);
        setSvg(svg);
        setError(null);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('Failed to render diagram');
        // Mermaid might leave some artifacts or error text in the DOM, so we handle it gracefully
      }
    };

    if (code) {
      renderDiagram();
    }
  }, [code]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded border border-red-100 text-sm font-mono">
        {error}
        <pre className="mt-2 text-xs text-gray-500 overflow-auto">{code}</pre>
      </div>
    );
  }

  return (
    <div 
      ref={elementRef}
      className="mermaid-diagram my-6 flex justify-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 overflow-x-auto not-prose"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
