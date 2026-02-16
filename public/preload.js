"use strict";
const { contextBridge, ipcRenderer } = require('electron');
const electronAPI = {
    selectFile: () => ipcRenderer.invoke('select-file'),
    generateASCII: (options) => ipcRenderer.invoke('generate-ascii', options),
    saveFile: (content, defaultPath) => ipcRenderer.invoke('save-file', { content, defaultPath }),
};
contextBridge.exposeInMainWorld('electronAPI', electronAPI);
