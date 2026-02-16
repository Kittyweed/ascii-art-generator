import './App.css';
interface ElectronAPI {
    selectFile: () => Promise<string | null>;
    generateASCII: (options: {
        imagePath: string;
        width: number;
        invert: boolean;
    }) => Promise<string>;
    saveFile: (content: string, defaultPath: string) => Promise<string | null>;
}
declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}
export default function App(): import("react/jsx-runtime").JSX.Element;
export {};
