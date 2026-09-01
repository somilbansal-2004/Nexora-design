# Nexora Engineering & Design — Website

A complete, static, responsive website. No build step — open `index.html` or deploy the folder as-is.

## Folder structure

```
nexora/
├── index.html
├── css/style.css
├── js/script.js
├── images/
│   ├── logo/nexora-logo.png        ← your uploaded logo (already in place)
│   ├── hero/                       ← empty, optional
│   ├── about/brand-card.jpg        ← your uploaded brand banner (already in place)
│   ├── services/                   ← empty, optional (services use icons, not photos)
│   ├── projects/                   ← ADD project-01.jpg … project-09.jpg, portfolio-01.jpg … portfolio-08.jpg
│   ├── youtube/
│   │   ├── banner.jpg              ← your uploaded brand banner (reused here; see note below)
│   │   ├── video-01.jpg … video-07.jpg   ← ADD your video thumbnails
│   └── internship/                 ← empty, optional
```

Any image that's missing shows a clean labelled placeholder instead of a broken icon, so the site never looks broken while you're filling in real assets.

## Recent changes

- **Internship section removed** — pulled from the nav, footer and page entirely, per your request.
- **YouTube banner removed** — the channel header is now a clean glass panel (logo, name, description, actions) with no background photo.
- **About section** — the brand-card photo is replaced with a 3D, mouse-reactive version of your logo: it tilts toward the cursor as you move over it (built in pure CSS/JS, no image dependency). Touch devices get a lighter version of the same effect.
- **YouTube video titles** — no longer "Video 1/2/3." I could only confirm one for certain: the first video's own YouTube thumbnail visibly reads "PTC CREO — Model Like a Pro," so that's used as its real title. I couldn't find public titles for the other four (they're not indexed by search, likely unlisted or very new), so I wrote reasonable working titles by topic — **please swap in the real ones** in `js/script.js` → `youtubeVideos`.
- **3 new project cards + 2 portfolio tiles** added from your new CAD renders (flanged ball valve, intake duct assembly, flanged pipe spool) — projects 10–12 in `js/script.js` → `projectsData`.

### What I left out, and why

A few of the files you sent aren't in the site:

- **Three video clips** (a wedding/engagement reel, a baby's pre-birthday shoot, and an industrial corporate reel) — these look like they were pulled from Pinterest or another creator's page via a video-downloader tool (filenames start with `vidssave_com_`), rather than footage Nexora produced. Two of them show identifiable people, including a baby, in what looks like someone else's personal or client footage. I didn't want to publish that on a business site without knowing it's rights-cleared, so none of the four video files you attached made it in.
- **The chiller unit render** (`3.png`) has another company's logo ("FROZER") printed on the equipment — including it would present a different company's product as Nexora's own work.
- **Three software-screenshot images** (Photoshop retouching, Photoshop landscape edit, a Premiere-style editing timeline with someone's webcam visible) — same call as last time: these read as generic tutorial screenshots rather than Nexora's own project, and one shows an identifiable person who hasn't consented to appearing on the site.

If any of these are actually your own original work with the rights to use them, just say so and I'll add them in — happy to reconsider once I know that.

## 1. Where your two uploaded images were used

- **Circuit-leaf logo** → navbar, footer, and the YouTube channel avatar (`images/logo/nexora-logo.png`).
- **Brand banner/business card graphic** → the About section visual and the YouTube channel cover strip (`images/about/brand-card.jpg` and `images/youtube/banner.jpg`). This image is a wide business-card-style graphic (service icons + contact details), not a dedicated 2560×1440 YouTube banner, so treat the YouTube spot as a placeholder — swap in a proper channel banner when you have one, sized ~2560×1440 (safe area ~1546×423 centered).

## 2. Project & portfolio images — already added

The Projects grid (9 cards) and Portfolio strip (8 tiles) are filled with the CAD renders, technical
drawings, PCB layouts and wiring schematics you uploaded — titles and categories in `projectsData`
(`js/script.js`) were written to match what's actually in each image.

Three of your uploads were **left out on purpose**, and you may want to swap them back in manually:
- The maternity portrait carries another studio's visible watermark ("Indu Priya Photography") — using
  it in Nexora's own portfolio would misattribute someone else's client work.
- The two Photoshop screenshots (face-retouch panel, mountain-lake edit) read as generic software
  tutorial images rather than a Nexora project, so I left them out rather than present them as your work.

If any of those three are genuinely your own work, just add them to `images/projects/` and reference them
in `projectsData` / the portfolio loop the same way as the others.

To add more later, drop files into `images/projects/` using the same naming pattern
(`project-10.jpg`, `portfolio-09.jpg`, …) and add matching entries to `projectsData` in `js/script.js`.

## 3. YouTube videos — already added

Five videos from the links you sent are live in `js/script.js` → `youtubeVideos`, using their real
video IDs and YouTube's own thumbnail images (pulled automatically from
`img.youtube.com/vi/<id>/maxresdefault.jpg`, with an automatic fallback to `hqdefault.jpg` for
any video that doesn't have a maxres thumbnail). Clicking a card opens the real video in the modal player.

I couldn't find public titles or categories for these five (they don't come up in search, likely because
they're new/unlisted), so each is currently labelled generically ("Design Dynamo Studio — Video 1", etc.)
with a category guess. Open `js/script.js` and update the `title` and `category` for each entry with the
real details:

```js
{
  title: 'Your Real Video Title',
  videoId: 'OT0US0xXWAI',
  thumbnail: 'https://img.youtube.com/vi/OT0US0xXWAI/maxresdefault.jpg',
  category: 'CAD Tutorials',   // must match one of the filter buttons
  duration: '10:24'            // optional — leave '' to hide the duration badge
}
```

To add more videos later, copy that same object shape with a new `videoId`.

### Subscriber count

The brief for this site says never to show a fake statistic, and I wasn't able to verify a live
subscriber count for the channel (it doesn't appear in search results). The channel header currently
shows the generic label "YouTube Channel" instead of a number. To show a real count, open `js/script.js`,
find `const CHANNEL_SUBSCRIBERS = null;` near the YouTube section, and set it to the actual number, e.g.
`const CHANNEL_SUBSCRIBERS = 1240;` — it'll auto-format as "1.2K subscribers".

## 4. Contact information already wired in

Pulled directly from what you provided — update anytime in `index.html` (Contact + Footer sections):

- Email: `nexoradesign18@gmail.com`
- Phone / WhatsApp: `+91 89395 90511`
- Instagram: `instagram.com/nexora.official20`
- YouTube: `youtube.com/@Nexora-k9x` — labelled on-page as **Design Dynamo Studio** per your brief. If the channel name is actually different from what's on your business card, tell me and I'll update it.
- LinkedIn: `linkedin.com/in/somil-bansal-044a67382`

The contact form is front-end only — it validates and shows a confirmation, but doesn't send anywhere yet. Wire the `contactForm` submit handler in `js/script.js` to your email service (e.g. Formspree, EmailJS) or your own backend endpoint.

## 5. Deploying

**Fastest — Netlify (drag & drop):**
1. Go to app.netlify.com/drop
2. Drag the whole `nexora` folder in
3. Done — you get a live URL instantly (you already use Netlify, based on `nexora.netlify.app`)

**GitHub Pages:**
1. Push this folder to a GitHub repo
2. Repo Settings → Pages → deploy from the `main` branch, root folder
3. Your site is live at `yourusername.github.io/reponame`

**Vercel:** `vercel` CLI or drag-and-drop at vercel.com/new — same idea.

## 6. Connecting your own domain

- Netlify: Site settings → Domain management → Add custom domain → follow the DNS instructions (usually an A record or CNAME at your registrar)
- GitHub Pages: add a `CNAME` file with your domain, then point your registrar's DNS at GitHub's IPs
- Vercel: Project → Settings → Domains → add domain → update DNS as shown

All three give you free HTTPS automatically once DNS propagates.
