import type { CapacitorElectronConfig } from '@capacitor-community/electron';
import { getCapacitorElectronConfig, setupElectronDeepLinking } from '@capacitor-community/electron';
import { ipcMain, MenuItemConstructorOptions, shell } from 'electron';
import { app, MenuItem } from 'electron';
import electronIsDev from 'electron-is-dev';
import unhandled from 'electron-unhandled';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import fs from 'fs';
import { ElectronCapacitorApp, setupContentSecurityPolicy, setupReloadWatcher } from './setup';

// Graceful handling of unhandled errors.
unhandled();

// Define our menu templates (these are optional)
const trayMenuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [new MenuItem({ label: 'Quit App', role: 'quit' })];
const appMenuBarMenuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [
  { role: process.platform === 'darwin' ? 'appMenu' : 'fileMenu' },
  { role: 'viewMenu' },
];

// Get Config options from capacitor.config
const capacitorFileConfig: CapacitorElectronConfig = getCapacitorElectronConfig();

// Initialize our app. You can pass menu templates into the app here.
// const myCapacitorApp = new ElectronCapacitorApp(capacitorFileConfig);
const myCapacitorApp = new ElectronCapacitorApp(capacitorFileConfig, trayMenuTemplate, appMenuBarMenuTemplate);

// If deeplinking is enabled then we will set it up here.
if (capacitorFileConfig.electron?.deepLinkingEnabled) {
  setupElectronDeepLinking(myCapacitorApp, {
    customProtocol: capacitorFileConfig.electron.deepLinkingCustomProtocol ?? 'mycapacitorapp',
  });
}

// If we are in Dev mode, use the file watcher components.
if (electronIsDev) {
  setupReloadWatcher(myCapacitorApp);
}

// Run Application
(async () => {
  // Wait for electron app to be ready.
  await app.whenReady();
  // Security - Set Content-Security-Policy based on whether or not we are in dev mode.
  setupContentSecurityPolicy(myCapacitorApp.getCustomURLScheme());
  // Initialize our app, build windows, and load content.
  await myCapacitorApp.init();
  // Check for updates if we are in a packaged app.
  //autoUpdater.checkForUpdatesAndNotify();
})();

// Handle when all of our windows are close (platforms have their own expectations).
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When the dock icon is clicked.
app.on('activate', async function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (myCapacitorApp.getMainWindow().isDestroyed()) {
    await myCapacitorApp.init();
  }
});

// Place all ipc or other electron api calls and custom functionality under this line


const appPath = () => {
  switch (process.platform) {
    case 'darwin': {
      return path.join(process.env.HOME, 'Library', 'Application Support', 'MiWalletMedic', 'documents');
    }
    case 'win32': {
      return process.env.APPDATA;
    }
    case 'linux': {
      return process.env.HOME;
    }
  }
}
ipcMain.handle('open-file-mw', async (event, data) => {
  let path_ = appPath();

  return openPath(data);
  

})
const openPath = filename => {
  let path_ = appPath();
  return new Promise(resolve => {
    existFile(filename).then(existe=>{
      if(existe){
        shell.beep();
        shell.openPath(path.join(path_, filename))
        resolve({result: true, message:"OK"});
      } else {
        resolve({result: false, message:"No se encuentra el archivo en el dispositivo"});
      }
    })
   
   
  });
};
const existFile = filename => {
  let path_ = path.join(appPath(), filename); 
  return new Promise(resolve => {
    fs.exists(path_, function (existe) {
      resolve(existe);
    });    
  });
};
const mkDir = path => {
  
  return new Promise(resolve => {
    fs.exists(path, function (existe) {
      if(!existe){
        fs.mkdir(path, function (mkdirResult) {
          resolve(true);
        });
      }else {
        resolve(true);
      }
    });    
  });
};
const writeFile = (filename, blob) => {  
  return new Promise(resolve => {
    mkDir(appPath()).then(()=>{
      var buf = new Buffer(blob, 'base64');
      fs.writeFile(path.join(appPath(), filename), buf, function (err) {
        if (err) {
          resolve( {result: false, message:"OK"});
        }
        console.log("File succesfully saved to disk.");
        shell.beep();
        resolve( {result: true, message:"OK"});
      });
    })
  });
};
ipcMain.handle('exist-file-mw', async (event, filename) => {
  return await existFile(filename);
})
ipcMain.handle('save-file-mw', async (event, filename, blob) => {
  return await writeFile(filename, blob);
})

ipcMain.handle('read-file-mw', async (event, filename) => {
  
  const contents = fs.readFileSync(path.join(appPath(),filename), {encoding: 'base64'});
  return contents;
  //console.log(contents);
  
})
