# Ahmed Huzain — Portfolio

A minimalist personal portfolio showcasing frontend, full-stack, and creative coding projects.

## Pages

- **Home** (`index.html`): introduction and contact links.
- **Work** (`work/index.html`): web projects with previews and links.
- **Creative** (`creative/index.html`): Fractal Tree and Fireworks projects with interactive p5.js previews.

## Built with

- Static HTML and Tailwind CSS v4.
- Pixelify Sans from Google Fonts.
- Native cross-page View Transitions, with reduced-motion support.
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

Make styling changes in `style/input.css` and regenerate `style/output.css` with the Tailwind CSS v4 CLI. Keep the compiled stylesheet committed so the static site remains ready to serve. This repository does not currently include a package manifest or build script.

View Transitions enhance internal navigation in supporting browsers; other browsers use standard page navigation. Google Fonts and the external project previews require an internet connection.

## Hosting

Serve the repository root with any static host that supports directory index files. Keep the `work/`, `creative/`, `style/`, and `assets/` directories alongside `index.html`.
