# Ahmed Huzain — Portfolio

A minimalist personal portfolio showcasing frontend, full-stack, and creative coding projects.

## Pages

- **Home** (`index.html`): introduction and contact links.
- **Work** (`work/index.html`): web projects with previews and links.
- **Creative** (`creative/index.html`): Fractal Tree and Fireworks projects with interactive p5.js previews.

## Built with

- Static HTML and Tailwind CSS v4.
- Pixelify Sans from Google Fonts.
- GSAP page transitions (fade out upward, fade in from below), bundled with esbuild, with reduced-motion support.
- Page-specific descriptions, Open Graph and Twitter metadata, and a shared favicon.

## Local preview

The compiled stylesheet is included, so no build step is required to preview the site. From the repository root, run:

```sh
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000). Serve the site over HTTP so root-relative navigation and same-origin page transitions work as intended.

## Project structure

```text
index.html             Home page
work/index.html        Web project gallery
creative/index.html    Creative coding gallery
assets/projects/       Web project images
assets/creatives/      Creative coding images
style/input.css        Tailwind source and custom styles
style/output.css       Compiled stylesheet used by every page
favicon.ico            Shared site icon
```

## Editing

Update the HTML files directly to change content. Add project images under the corresponding `assets` directory and use relative image paths in each gallery.

Make styling changes in `style/input.css` and animation changes in `scripts/src/main.js` (GSAP), then rebuild:

```sh
npm install        # first time only
npm run build      # bundles scripts/main.js with esbuild and compiles style/output.css
npm run watch:js   # rebuild the script on every save while developing
```

esbuild bundles and minifies only the GSAP modules imported in `scripts/src/main.js`. Keep the compiled `scripts/main.js` and `style/output.css` committed so the static site remains ready to serve without a build step.

Internal links play a GSAP exit animation before navigating; visitors with reduced motion enabled get standard page navigation. Google Fonts and the external project previews require an internet connection.

## Hosting

Serve the repository root with any static host that supports directory index files. Keep the `work/`, `creative/`, `style/`, `scripts/`, and `assets/` directories alongside `index.html`.
