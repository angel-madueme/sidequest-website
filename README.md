# SideQuest

A responsive first visual prototype built with React, Vite, CSS, Framer Motion, and Lucide React.

## Run

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Includes the navigation, hero collage, SVG marquee, interactive mood recommendations, How It Works cards, experience carousel, draggable activity table, and interactive footer. Event details are previews; accounts and booking are not connected to a backend.

Components and editable recommendation data are in `src/`. Brand tokens and shared responsive styles are in `src/styles.css`. Fonts load from Google Fonts. Optimized photos are served locally from `public/images` with responsive WebP sizes and illustrated fallbacks. Motion respects reduced-motion preferences.

## Deployment

Import this repository into Vercel using the Vite preset. The included `vercel.json` builds with `npm run build` and publishes `dist`. No environment variables are required.

