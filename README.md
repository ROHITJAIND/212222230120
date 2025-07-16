# 🔗 URL Shortener Web App

This is a client-side **URL Shortener** built using **React** and **Material UI**. It allows users to shorten up to 5 URLs at once, optionally assign a custom shortcode and validity period, and view detailed click analytics. All data is stored and managed on the client-side (via local storage).

---

##  Features

- Shorten up to 5 URLs simultaneously
- Custom shortcodes (optional and validated)
- Default expiry: 30 minutes (unless specified)
- Redirect management using React Router
- Analytics page with:
  - Total clicks
  - Timestamps of each click
  - Source and geographical data (simulated)
- **Client-side only**: No backend required
- Integrated logging via custom middleware (no `console.log`)

---

##  How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2. Install Dependencies
```bash
npm install
```
If you encounter a 'react-scripts' is not recognized error, install it manually:

```bash
npm install react-scripts --save
```
### 3. Start the Application
```bash
npm start
```
App runs at:
http://localhost:3000
