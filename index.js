/*              IMPORTS                      */

const { app, BrowserWindow, ipcMain } = require("electron");

let win;

console.log(process.platform);

const createWindow = () => {
  // creates the browser window
  win = new BrowserWindow({ width: "60%", height: "60%" });

  ipcMain.on("online-status-changed", (event, status) => {
    console.log(status);
  });

  // loads the initial file
  win.loadURL("https://saavn.com/");

  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    win = null;
  });
};

// creates the interface when the app is ready to be rendered
app.on("ready", createWindow);

// Listener for the event, when the user closes all the windows
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Listener for the app, when the window resumes
app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
