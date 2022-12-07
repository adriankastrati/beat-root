# Description - BeatRoot
short and sweet, BeatRoot (working title) is a place where you can 
browse, create and share small beats with an accompanying mood. </br>
when browsing, filter beats based on what you are looking for.

### Guide
<ul>
<li> 1. press "initialize" </li>
<li> 2. press "create"  </li>
<li> 3. add a new track  </li>
<li> 3.1 create a rhythm using the "glyphs" and choose a sample for it  </li>
<li> 3.2 add more tracks in a similar fashion  </li>
<li> 4. choose your theme (not working atm)  </li>
<li> 5. add a description and name your beat  </li>
<li> 6. share (not working atm) </li>
</ul>

## What's done so far
* structure & routing of entire project
* audio model using tone.js 
* web api functionaltiy
* firebase backend functionality (users, posts)
* post feed
* creation + playing of beats

## What's left to do
* detail view for playback of a beat
* burger menu
* filters on tracks
* a lot of styling on every view
* user profiles page
* filtering feed
* about page
* copy-as-midi functionality

## file structure with some explanations 
├── App.tsx | laying out the structure of each component \
├── common \
│   └── index.tsx | basic types for the rest of the project \
├── components \
│   ├── presenters \
│   │   ├── AudioInitializer.tsx | initialzing the audioModel using context \
│   │   ├── BeatCreatePresenter.tsx | presenter for the BeatCreateView \
│   │   ├── BeatDetailPresenter.tsx | presenter for the BeatDetailView \
│   │   ├── FeedPresenter.tsx | Presenter for the FeedView \
│   │   └── NavBarPresenter.tsx | Presenter for the navbar/burger menu \
│   └── views \
│       ├── BeatCreateView.tsx | view for creating the beats \
│       ├── BeatDetailView.tsx | the details needed for visualizing a beat \
│       ├── BeatVisualisationView.tsx | the visuals related to a beat   \
│       ├── common \
│       │   ├── GlyphComponent.tsx | for the small atomic values that make a beat \
│       │   ├── MainButton.tsx | returning different buttons based on the prop \
│       │   └── Modal.tsx | the focused window common class \
│       ├── EditThemeModalView.tsx | the focused window for selecting theme \
│       ├── EditTrackModalView.tsx | the focused window for editing a track \
│       ├── NavBar.tsx | navbar & hamburger class \
│       ├── RhythmView.tsx | the view for a rhythm \
│       └── TrackView.tsx | the view for a track \
├── contexts \
│   └── ModelContext.tsx | for creating a fresh model context \
├── icons \
│   ├── add.svg \
│   ├── colorpalette.svg \
│   └── edit.svg \
├── index.css | body and code tags styles \
├── index.tsx | providing context for the app component \
├── logo.svg \
├── model \
│   ├── AudioModel.tsx | providing methods for the audio engine using the tone.js package \
│   ├── firebase \
│   │   ├── firebaseAuthenticationModel.tsx | firebase methods centered around users  \
│   │   ├── firebaseBeat.tsx | providing "database" methods centered around the created beats \
│   │   └── firebaseConfig.tsx | firebase authentication \
│   └── index.tsx | index file for the AudioModel \
├── pages \
│   ├── BeatPage.tsx | detail view for a single created beat \
│   ├── ManualFirebaseTest.tsx | tests for firebase functions \
│   └── RootPage.tsx | root div \
└── setupTests.ts | auto generated for tests \
## A possible final version
![a possible final version](public/sample_pictures/design%404x.png)