const {app, BrowserWindow} = require('electron');
var child = require('child_process').execFile;

let mainWindow;
var link;
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
  }})
  mainWindow.loadFile('index.html');
  link = process.argv.slice(1);
  let base = "applnchr://";
  if (link == base + "firefox/") {
    var executablePath = "C:\\Program Files\\Mozilla Firefox\\firefox.exe";
    child(executablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
        console.log(data.toString());
    })
  } else if (link == base + "notepad/") {
    var executablePath = "C:\\Windows\\system32\\notepad.exe";
    child(executablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
        console.log(data.toString());
    })
  } else if (link == base + "chrome/") {
    var executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    child(executablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
        console.log(data.toString());
    })
  }

  mainWindow.hide();
}

app.on('ready', createWindow);

// This will catch clicks on links such as <a href="foobar://abc=1">open in foobar</a>
app.on('open-url', function (event, data) {
  event.preventDefault();
});

app.setAsDefaultProtocolClient('applnchr');

// Export so you can access it from the renderer thread
module.exports.getLink = () => link;