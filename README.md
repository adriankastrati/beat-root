## Description - BeatRoot
Short and sweet, BeatRoot is a place where you can 
browse, create and share beats with an accompanying mood.

### Guide
![overview](https://github.com/adriankastrati/beat-root/tree/main/src)
1. press "create" 
2. press "initialize"
3. add a new track
3.1 create a rhythm using the "glyphs" and choose a sample for it.
3.2 add more tracks in a similar fashion
4. choose your theme
5. add a description and name your beat
6. share 


## What's done so far
Routing, backend functionality, creating beats and selecting theme

## What's left to do


## file structure with some explanations (update this)

├── App.tsx | laying out the structure of each component 
├── common
│   └── index.tsx | basic types for the rest of the project
├── components
│   ├── presenters
│   │   ├── AudioInitializer.tsx | initialzing the audioModel using context
│   │   ├── BeatCreatePresenter.tsx | presenter for the BeatCreateView
│   │   ├── BeatDetailPresenter.tsx | presenter for the BeatDetailView
│   │   ├── FeedPresenter.tsx | Presenter for the FeedView
│   │   └── NavBarPresenter.tsx | Presenter for the navbar/burger menu
│   └── views
│       ├── BeatCreateView.tsx | view for creating the beats
│       ├── BeatDetailView.tsx | the details needed for visualizing a beat
│       ├── BeatVisualisationView.tsx | the visuals related to a beat  
│       ├── common
│       │   ├── GlyphComponent.tsx | for the small atomic values that make a beat
│       │   ├── MainButton.tsx | returning different buttons based on the prop
│       │   └── Modal.tsx | the focused window common class
│       ├── EditThemeModalView.tsx | the focused window for selecting theme
│       ├── EditTrackModalView.tsx | the focused window for editing a track
│       ├── NavBar.tsx | navbar & hamburger class
│       ├── RhythmView.tsx | the view for a rhythm
│       └── TrackView.tsx | the view for a track
├── contexts
│   └── ModelContext.tsx | for creating a fresh model context
├── icons
│   ├── add.svg
│   ├── colorpalette.svg
│   └── edit.svg
├── index.css | body and code tags styles
├── index.tsx | providing context for the app component
├── logo.svg
├── model
│   ├── AudioModel.tsx | providing methods for the audio engine using the tone.js package
│   ├── firebase
│   │   ├── firebaseAuthenticationModel.tsx | firebase methods centered around users 
│   │   ├── firebaseBeat.tsx | providing "database" methods centered around the created beats
│   │   └── firebaseConfig.tsx | firebase authentication
│   └── index.tsx | index file for the AudioModel
├── pages
│   ├── BeatPage.tsx | detail view for a single created beat
│   ├── ManualFirebaseTest.tsx | tests for firebase functions
│   └── RootPage.tsx | root div
└── setupTests.ts | auto generated for tests


