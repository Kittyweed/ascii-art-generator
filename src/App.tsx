import React, { useState } from 'react';
import './App.css';

interface ElectronAPI {
  selectFile: () => Promise<string | null>;
  generateASCII: (options: { imagePath: string; width: number; invert: boolean }) => Promise<string>;
  saveFile: (content: string, defaultPath: string) => Promise<string | null>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

interface AppState {
  imagePath: string | null;
  imagePreview: string | null;
  width: number;
  invert: boolean;
  output: string;
  loading: boolean;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    imagePath: null,
    imagePreview: null,
    width: 100,
    invert: false,
    output: '',
    loading: false,
  });

  const handleSelectFile = async () => {
    const path = await window.electronAPI.selectFile();
    if (path) {
      setState(prev => ({
        ...prev,
        imagePath: path,
        imagePreview: `file://${path}`,
      }));
    }
  };

  const handleGenerate = async () => {
    if (!state.imagePath) return;
    setState(prev => ({ ...prev, loading: true, output: 'Generating...' }));
    try {
      const result = await window.electronAPI.generateASCII({
        imagePath: state.imagePath,
        width: state.width,
        invert: state.invert,
      });
      setState(prev => ({ ...prev, output: result, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        loading: false,
      }));
    }
  };

  const handleSave = async () => {
    if (!state.output) return;
    const defaultPath = `ascii-art-${Date.now()}.txt`;
    await window.electronAPI.saveFile(state.output, defaultPath);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="sidebar">
          <h1>ASCII Art Generator</h1>
          <div className="card">
            <button onClick={handleSelectFile} className="btn">Select Image</button>
            {state.imagePreview && (
              <img src={state.imagePreview} alt="preview" className="preview" />
            )}
          </div>
          <div className="card">
            <label>Width: {state.width}</label>
            <input
              type="range"
              min="20"
              max="500"
              value={state.width}
              onChange={(e) => setState(prev => ({ ...prev, width: parseInt(e.currentTarget.value) }))}
            />
          </div>
          <div className="card">
            <label>
              <input
                type="checkbox"
                checked={state.invert}
                onChange={(e) => setState(prev => ({ ...prev, invert: e.currentTarget.checked }))}
              />
              Invert
            </label>
          </div>
          <button onClick={handleGenerate} disabled={!state.imagePath || state.loading} className="btn btn-primary">
            {state.loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="output-container">
          <div className="card">
            <pre className="output-text">{state.output}</pre>
          </div>
          {state.output && !state.loading && (
            <button onClick={handleSave} className="btn btn-secondary">Save</button>
          )}
        </div>
      </div>
    </div>
  );
}
