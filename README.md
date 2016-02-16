# StiffGif

OSX Menubar to find gifs, Made with Electron (Atom-Shell) and Vue. Showcased at Hong Kong Web Developers Feb 2016.
[Presentation](https://docs.google.com/presentation/d/1lrwxRQtAu7Mp_IJeNT5gOAG1TkDcVL-HFejtP4cw0Jo/edit?usp=sharing)

![Stiffgif](https://www.github.com/denistsoi/stiffgif/stiffgif.gif)

### Changelog

`2.0.0`
- add loading spinner
- copied url footer
- use Popkey api
- stable infinite scroll for giphy and popkey sources

`1.1.0` 
- Stable Giphy api
- Infinite Scroll

`1.0.0` 
- Init Commit

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

### License

MIT