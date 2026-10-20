# Burhanudin Tsania Lathifa — Portfolio

A responsive personal portfolio website showcasing business development experience, projects, credentials, and contact information.

## Features

- Responsive navigation and layout
- Profile, career journey, impact, and credentials sections
- Animated statistics and growth chart
- Image lightbox for certificates
- Contact form that opens the visitor's email application

## Run locally

This is a static website and does not require a build step or project dependencies. With Node.js and npm installed, run this command from the project directory:

```powershell
npx --yes serve .
```

Open the local URL printed in the terminal (typically `http://localhost:3000`).

## Deploy

The site can be deployed as a static website on Vercel or GitHub Pages. For Vercel, import this repository and leave the framework preset as **Other** with no build command; the project root contains `index.html`.

## Project structure

```text
.
├── Asset/       # Portfolio photos, certificates, and project images
├── app.js       # Navigation, animations, chart, lightbox, and contact form
├── custom.css   # Styles not covered by Tailwind utility classes
├── index.html   # Main portfolio page
├── README.md
└── .gitignore
```

## External resources

The page loads Tailwind CSS, Google Fonts, and Font Awesome from their respective CDNs. An internet connection is required for those resources.
