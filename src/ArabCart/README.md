# ZOVA — Coming Soon Website
## How to Open & Edit in VS Code

### Folder Structure
```
zova/
├── index.html          ← Main HTML (structure & content)
├── css/
│   └── style.css       ← All styling, colors, animations
├── js/
│   └── main.js         ← Countdown, toast, 3D parallax, scroll effects
├── images/
│   ├── perfume_hero.png   ← Hero 3D bottle (right side of page)
│   ├── prod_bloom.png     ← Bloom Noir product card
│   ├── prod_oud.png       ← Oud Royale product card
│   ├── prod_crystal.png   ← Crystal Dew product card
│   ├── prod_velvet.png    ← Velvet Rose product card
│   ├── prod_breeze.png    ← Ocean Breeze product card
│   └── prod_gold.png      ← Gold Elixir product card
└── README.md           ← This file
```

### Quick Start
1. Open the `zova/` folder in VS Code
2. Install the **Live Server** extension (Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. Your browser opens at `http://127.0.0.1:5500`

---

## What to Customise

### Change the Brand Name
In `index.html` → search "ZOVA" → replace with your startup name.
In `css/style.css` → search "ZOVA" → replace there too.

### Change Colors
Open `css/style.css` — find `:root` at the top:
```css
:root {
  --gold:        #A96F44;   /* main brown-gold */
  --gold-dark:   #7a4f2e;   /* darker gold */
  --gold-light:  #d4a06a;   /* lighter gold */
  --cream:       #F2ECB6;   /* cream/yellow */
  ...
}
```
Change any hex value and it updates everywhere.

### Change the Launch Date
Open `js/main.js` → find:
```js
const launchDate = new Date(2025, 11, 22); // 22 Dec 2025
```
Months are 0-indexed: Jan=0, Feb=1, ... Dec=11

### Replace Product Images
Put your real perfume/product photos into `images/`  
Then update the `src` in `index.html`:
```html
<img src="images/YOUR_PHOTO.jpg" alt="..." />
```
Recommended size: **400×400px** for product cards, **600×700px** for hero bottle.

### Change Product Names & Prices
In `index.html` find the `#products` section.
Each card looks like:
```html
<div class="prod-name">Bloom Noir EDP</div>
<div class="prod-cat">Fragrance · Women</div>
<span class="prod-price">Rs. 8,500</span>
```
Edit the text directly.

### Change Hero Text
In `index.html` find `<section id="hero">` → edit the `<h1>` and `<p>` tags.

### Add/Remove Features
In `index.html` find `<section id="features">`.
Copy/paste a `.feat-card` block and edit the icon (emoji), title, and description.

### Change Navigation Links
Edit the `<ul class="nav-links">` in the `<nav>` tag.

---

## Deployment (Go Live)
- **Free**: Upload to [Netlify Drop](https://app.netlify.com/drop) — drag the `zova/` folder
- **Free**: [Vercel](https://vercel.com) — connect your GitHub repo
- **Shared hosting**: Upload all files via FTP/cPanel File Manager

---

## Tech Used
- HTML5, CSS3 (no frameworks)
- Vanilla JavaScript (no libraries)
- Google Fonts: Playfair Display + Outfit
- CSS animations for 3D effects (no Three.js needed)
