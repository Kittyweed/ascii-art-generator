import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp'] }],
  });
  return result.filePaths[0] || null;
});

ipcMain.handle('generate-ascii', async (_event, options: any) => {
  return new Promise((resolve, reject) => {
    const binaryPath = process.env.NODE_ENV === 'production' 
      ? path.join(path.dirname(process.execPath), 'resources', 'ascii-art-generator')
      : path.join(__dirname, '../target/release/ascii-art-generator');
    
    const proc = spawn(binaryPath, [
      options.imagePath,
      '--width', options.width.toString(),
      ...(options.invert ? ['--invert'] : []),
    ]);

    let output = '';
    let error = '';

    proc.stdout.on('data', (data) => {
      output += data.toString();
    });

    proc.stderr.on('data', (data) => {
      error += data.toString();
    });

    proc.on('error', (err) => {
      reject(new Error(`Failed to start ASCII generator: ${err.message}`));
    });

    proc.on('close', (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(error || `Generation failed with exit code ${code}`));
    });
  });
});

ipcMain.handle('save-file', async (_event, { content, defaultPath }: any) => {
  const result = await dialog.showSaveDialog(mainWindow!, {
    defaultPath,
    filters: [{ name: 'Text Files', extensions: ['txt'] }],
  });

  if (!result.canceled && result.filePath) {
    writeFileSync(result.filePath, content);
    return result.filePath;
  }
  return null;
});
