# SideQuest

A playful social discovery website designed to help people find experiences, match activities to their mood, and make plans with friends.

🔗 [View SideQuest live](https://sidequest-website-zeta.vercel.app/)

## About SideQuest

SideQuest is built around a simple idea: finding something fun to do shouldn't feel like work.

Instead of presenting people with a long directory of events, SideQuest turns discovery into part of the experience. Users can browse different activities, choose what they're in the mood for, discover recommendations, explore experiences with friends, and interact with playful elements throughout the site.

The experience combines editorial layouts, colorful visual storytelling, motion, and tactile interactions to make planning feel lighter and more fun.

## What You Can Do

- Discover different experiences and activities
- Pick a mood and get a matching SideQuest recommendation
- Browse experience cards and open event details
- Explore SideQuest through playful card and hover interactions
- Drag activity cards around the interactive weekend section
- Move through animated, responsive sections designed to make discovery feel engaging

## Design & Interaction

SideQuest uses a playful but controlled visual system built around bold typography, warm neutrals, bright accent colors, rounded cards, scribbles, illustrated elements, and expressive motion.

Some of the key interactions include:

- Animated hero cards with layered hover states
- A flowing SVG marquee
- Interactive mood recommendations
- Fanned “How It Works” cards
- Experience carousels
- Draggable activity cards
- Scroll-based reveals and motion
- Interactive footer lettering
- Responsive touch interactions for mobile

The goal was to make the interface feel lively without overwhelming the user — letting the layout provide structure while color and motion provide the fun.

## Built With

- React
- Vite
- CSS
- Framer Motion
- Lucide React

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173/`.

## Production Build

Build the website into `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
public/
  images/                  Responsive WebP photographs
  game-night.svg           Board-game illustration
  paper-noise.svg          Texture asset
src/
  main.jsx                 React entry point
  App.jsx                  Page composition, navigation, hero, moods, and detail dialog
  MoodRecommendation.jsx   Recommendation panel and editable recommendation data
  HowItWorks.jsx           Four-card fan section
  Experiences.jsx          Experience carousel and its content
  WeekendPlayground.jsx    Draggable activity table
  Footer.jsx               Interactive footer lettering
  SiteMotion.jsx           One-time viewport entrance animations
  CursorFollower.jsx       Section-aware cursor effects
  NavLink.jsx              Section navigation and active states
  GraphicShape.jsx         Shared decorative shapes
  imageAssets.js           Responsive local image helpers
  styles.css               Brand tokens and shared responsive styles
  *.css                    Section and component styles
index.html                 HTML entry point
vite.config.js             Vite configuration
vercel.json                Deployment configuration
```

Components and editable experience data live in `src/`. Fonts load from Google Fonts. Optimized photographs are served locally from `public/images/` in 640px and 1200px WebP sizes, with illustrated fallbacks in the interface.

Motion combines Framer Motion interactions with native Web Animations and Intersection Observer for scroll entrances. It respects reduced-motion preferences, and scrolling remains native.

## Event Details

Event details currently show sample experiences. Accounts, live event booking, and other backend services are not connected. The website can run without environment variables or a backend.

## Deployment

Import this repository into Vercel using the Vite preset. The included `vercel.json` uses `npm run build` as the build command and publishes `dist/`. No environment variables are required.

With Vercel's GitHub integration connected, pushes to the configured production branch trigger a new deployment.
