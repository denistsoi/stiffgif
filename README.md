# StiffGif

OSX Menubar to find gifs, Made with Electron (Atom-Shell) and Vue. Showcased at Hong Kong Web Developers Feb 2016.
[Presentation](https://docs.google.com/presentation/d/1lrwxRQtAu7Mp_IJeNT5gOAG1TkDcVL-HFejtP4cw0Jo/edit?usp=sharing)

![Stiffgif]
(https://raw.githubusercontent.com/denistsoi/stiffgif/master/stiffgif.gif)

### Important
[You can get the latest release here](https://github.com/denistsoi/stiffgif/releases)  

## Expect Breaking Changes for "Next" Roadmap

Please check the CHANGELOG for updates

### TODO

API
- [x] use giphy api

USABILITY 
- [x] save to clipboard
- [x] infinite scroll
- [ ] Menus
- [ ] hotkeys
- [ ] Multi-Selection
- [ ] Drag and drop
- [ ] onboarding overlay

IMPROVEMENTS
- [x] use downsample gifs due to frame rate rendering
- [x] Focus on search bar when clicking icon
- [ ] highlight image when copying url

v2.0
- [x] Use popkey api
- [ ] try to preload or cache before rendering (vue)
- [ ] offline cache (can store to localstorage)
- [ ] use streams (replace request/ipc with hyperquest/ipc-duplex)

FUTURE 
- [ ] other sources that require OAuth (tumblr, imgur)
- [ ] other gif sources (9gag)
- [ ] video to gif (youtube, etc)

### How to use

    git clone git@github.com:denistsoi/stiffgif.git
    cd stiffgif
    npm install 
    npm start

### Build Release
  
    npm run release

You'll find the latest release inside the `build` folder

### Author

Denis Tsoi [link](https://www.twitter.com/denistsoi)  

### License

MIT