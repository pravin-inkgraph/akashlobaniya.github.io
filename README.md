# Akash Lobaniya — Portfolio Website

A responsive portfolio website built with HTML5, Bootstrap 5.3, Bootstrap Icons and plain JavaScript. It has no build step and needs no server code.

## Folder structure

```
akash/
├── index.html                  ← Homepage (all sections)
├── projects/
│   ├── k2k.html                ← Project K2K case study
│   ├── ayodhya-mahotsav.html
│   ├── thailand-shopping-fest.html
│   └── tiranga-run-2025.html
└── assets/
    ├── css/style.css           ← All custom styles (colors at the top, in :root)
    ├── js/main.js              ← Animations, gallery lightbox, contact form
    ├── images/
    │   ├── favicon.svg
    │   ├── work/               ← 19 real designs from Behance & Dribbble (WebP, optimised)
    │   └── projects/<project>/ ← ADD: cover.jpg, design-01…06.jpg, print-01…02.jpg
    └── videos/                 ← ADD: showreel.mp4, reel-01.mp4, reel-02.mp4, <project>.mp4
```

## 1. Preview locally

Double-click `index.html` to open it in a browser.
For the most accurate preview, use the VS Code **Live Server** extension: right-click `index.html` → *Open with Live Server*.

## 2. Add your real work

Until a file is added, every image or video slot shows a placeholder with the **exact file name it expects**, for example `projects/k2k/design-01.jpg`. Save your file with that name in that folder and it appears automatically, with no code changes.

**Selected Work gallery (homepage):** the images in `assets/images/work/` come from Akash's own Behance and Dribbble profiles. To add more, put an image in that folder and copy one `<div class="work-item" data-cat="…">` block in `index.html`. `data-cat` sets which filter shows it: `graphic`, `web`, `app` or `video`.

**Videos:** the "Video" filter shows a "showreel on its way" panel until real videos are added. The HTML comment above that panel in `index.html` has a ready-to-copy video block, for MP4 or YouTube.

**Image tips**
- Export as JPG (or WebP) at **max 1920px wide**, quality 75–80%. Keep each file under ~400 KB.
- Use [squoosh.app](https://squoosh.app) or TinyPNG to compress.
- Cover images: 1920×1080 (16:9). Profile photo: portrait 4:5.

**Video tips**
- MP4 (H.264), 1080p or 720p, ideally under 15–20 MB each. Add a matching `.jpg` poster frame with the same name (e.g. `reel-01.jpg`).
- For large videos, upload them to YouTube and replace the `<video>…</video>` tag with the iframe shown in the HTML comment on each project page.

**More or fewer images:** in a project page, copy or delete a whole `<figure class="media …">…</figure>` block.
**Remove unused slots before launch:** delete any slot you have no real file for, so visitors never see a placeholder.

## 3. Things to confirm before launch

These were left blank on purpose, because the brief says to publish only verified information:

| Item | Where to edit |
|---|---|
| Job role and dates at InkGraph Techno Pvt Ltd | `index.html` → search `EDIT ME` in the Experience section |
| Project descriptions (currently based only on the brief) | each `projects/*.html` → search `EDIT ME` |

## 4. Connect the contact form (required before launch)

The form already validates all fields. To receive messages by email:

1. Go to **https://formspree.io**, sign up with `akashlobaniya@gmail.com`, and create a new form.
2. Copy the endpoint, e.g. `https://formspree.io/f/xyzabcd`.
3. Open `assets/js/main.js` and paste it here:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/xyzabcd";
   ```
4. Submit one test message from the live site and confirm the email in Formspree.

Until you do this, the form still works: it opens the visitor's email app with the message pre-filled.

## 5. Deploy (free options)

**Netlify (easiest)**
1. Go to https://app.netlify.com/drop
2. Drag the whole `akash` folder onto the page. The site is live in seconds.
3. Under *Domain settings*, rename the site or connect your own domain.

**GitHub Pages**
1. Create a GitHub repository and upload all the files (keep `index.html` at the root).
2. Open *Settings → Pages → Deploy from branch → main / root*.
3. Your site will be available at `https://<username>.github.io/<repo>/`.

**Vercel:** import the GitHub repository at vercel.com. No settings are needed.

**Own hosting (Hostinger, GoDaddy, etc.):** upload the folder contents to `public_html` using File Manager or FTP.

## 6. After deployment (SEO)

- In `index.html`, uncomment the `canonical` / `og:url` lines and set your real domain.
- Change `og:image` / `twitter:image` to the full URL (e.g. `https://yourdomain.com/assets/images/og-cover.jpg`). Social sites need absolute URLs.
- Add the site to **Google Search Console** and request indexing.
- Optional: create a Google Business Profile for "Graphic Designer in Indore" to improve local search.

## 7. Launch checklist

- [ ] All placeholders replaced with real work, or the empty slots removed
- [ ] Experience role and dates added
- [ ] Contact form endpoint set and tested
- [ ] Phone, WhatsApp, email and social links clicked and checked
- [ ] Checked on a mobile phone, a tablet and a desktop
- [ ] Domain and SEO URLs updated

## Customising

- **Colors:** edit the variables at the top of `assets/css/style.css` (`--blue`, `--cyan`, `--bg` …).
- **Fonts:** Space Grotesk (headings) and Inter (body), loaded from Google Fonts in each page's `<head>`.
