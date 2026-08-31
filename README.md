# Procedural Planet Generator

![hippo](https://media.giphy.com/media/7aKs5PueGCy3hFJjfz/giphy.gif)

## Description

An interactive 3D planet generator built with React and Three.js. Planets are generated from a seed using Simplex Noise, with separate low-poly terrain and reflective water meshes.

Users can customize the planet in real time, including:

- Terrain elevation, frequency, and variety
- Water level and temperature
- Biome colors
- Planet mesh detail

Custom planets can be saved as presets in the browser. The interface is responsive and adapted for both desktop and mobile devices, with mobile-friendly modals, scrollable settings and a collapsible customization panel.

Planet generation runs in a Web Worker to keep the interface responsive while settings are changed.

## Stack

- React
- TypeScript
- Three.js
- React Three Fiber
- Mantine
- SCSS
- Simplex Noise
- Web Workers
