// The active background music track is stored here instead of themeAudio.src
var currentMusic = ''
var musicEnabled = true

// Set MediaSession API info for Chrome media player popup
if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'All Luv Extension'
    })
}

// Creat audio object
var themeAudio = new Audio()
themeAudio.volume = 0.5
themeAudio.loop = true

// Get stored settings
chrome.storage.local.get({
    music: 'Marvin Gaye- Let\'s Get It On remix',
    musicEnabled: true
}, function (data) {
    currentMusic = chrome.extension.getURL(data.music + '.ogg')
    console.log('Music enabled:', data.musicEnabled)
    musicEnabled = data.musicEnabled
})

// Update settings after storage change....MAYBE NOT NECESSARY
chrome.storage.onChanged.addListener(function (changes, area) {
    if (changes.musicEnabled) {
        musicEnabled = changes.musicEnabled.newValue
        if (!changes.musicEnabled) {
            themeAudio.src = ''
        }
    }
    if (changes.music) {
        currentMusic = chrome.extension.getURL(changes.music.newValue + '.ogg')
        if (musicEnabled) {
            themeAudio.src = chrome.extension.getURL(changes.music.newValue + '.ogg')
            themeAudio.play()
        }
    }
})

// Function for checking if music should be playing in current tab
// function checkMusic(tabs) {
//     var url = new URL(tabs[0].url)
//     var domain = url.hostname.toString().replace('www.', '')
//     if (siteList.includes(domain) && musicEnabled) {
//         if (themeAudio.src != currentMusic) {
//             themeAudio.src = currentMusic
//         }
//         themeAudio.play()
//     } else {
//         // The source value is deleted so Chromium browsers won't show a playback notification anymore
//         themeAudio.src = ''
//     }
// }
