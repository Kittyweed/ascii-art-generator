declare const contextBridge: any, ipcRenderer: any;
interface ElectronAPI {
    selectFile: () => Promise<string | null>;
    generateASCII: (options: {
        imagePath: string;
        width: number;
        invert: boolean;
    }) => Promise<string>;
    saveFile: (content: string, defaultPath: string) => Promise<string | null>;
}
declare const electronAPI: ElectronAPI;
