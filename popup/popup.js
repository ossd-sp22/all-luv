const hidePage = `body > :not(.beastify-image) {
    display: none;
  }`;

const CSS = "body { border: 10px solid pink; }";

document.addEventListener("click", stop);
flag = 0;

var audio = document.getElementById("myAudio")

function stop() {
  if (flag == 0) {
    document.body.style.border = "10px solid pink";
    //   browser.tabs.insertCSS({ code: hidePage });
    browser.tabs.insertCSS({ code: CSS });
    flag = 1;

    audio.play()
  } else {
    document.body.style.border = "0px solid pink";
    browser.tabs.removeCSS({ code: CSS });
    flag = 0;
    audio.pause()
  }
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
  .executeScript({ file: "/content_scripts/allluv.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
