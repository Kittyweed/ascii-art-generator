const { contextBridge, ipcRenderer } = require('electron');

interface ElectronAPI {
  selectFile: () => Promise<string | null>;
  generateASCII: (options: { imagePath: string; width: number; invert: boolean }) => Promise<string>;
  saveFile: (content: string, defaultPath: string) => Promise<string | null>;
}

const electronAPI: ElectronAPI = {
  selectFile: () => ipcRenderer.invoke('select-file'),
  generateASCII: (options) => ipcRenderer.invoke('generate-ascii', options),
  saveFile: (content, defaultPath) => ipcRenderer.invoke('save-file', { content, defaultPath }),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
