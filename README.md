# Procedural Planet Generator

**[View Live Demo](https://procedural-planet-generator.netlify.app/)**

<img width="420" alt="Procedural Planet Generator on desktop" src="https://github.com/user-attachments/assets/3d8630f2-b75d-46ca-8ce8-eb114711be0d" />

<img width="420" alt="Procedural Planet Generator on mobile" src="https://github.com/user-attachments/assets/43281af0-582d-4a51-bedf-bae59b7a489f" />

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
