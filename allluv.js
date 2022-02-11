document.body.style.border = "10px solid pink";

// Get stored settings
chrome.storage.local.get(
  {
    music: "Marvin Gaye- Let's Get It On remix",
    musicEnabled: "true",
  },
  function (data) {
    if (data.musicEnabled) {
      document.getElementById("stop-music").innerText = "Play";
    } else {
      document.getElementById("stop-music").innerText = "Stop";
    }
  }
);

// Music on/off button
document.getElementById("stop-music").addEventListener("click", function () {
  chrome.storage.local.get(
    {
      musicEnabled: true,
    },
    function (data) {
      console.log(data);
      if (data.musicEnabled) {
        // Turn off music
        document.getElementById("stop-music").innerText = "Stop";
        chrome.storage.local.set({
          musicEnabled: false,
        });
      } else {
        // Turn on music
        document.getElementById("stop-music").innerText = "Play";
        chrome.storage.local.set({
          musicEnabled: true,
        });
      }
    }
  );
});

// Pause music when page closes
// This only works on the popup opened from the notification, not the browserAction button
window.addEventListener(
  "beforeunload",
  function (e) {
    chrome.runtime.sendMessage("pause");
  },
  false
);
