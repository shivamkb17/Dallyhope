# Dally's Hope 4 Paws Rescue

Website for **Dally's Hope 4 Paws Rescue Inc.** — an all-breed dog rescue based in Hagaman, New York.

🌐 [dallyshope4pawsrescue.org](https://dallyshope4pawsrescue.org)

## Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your SMTP credentials

# Start development server (auto-reload on file changes)
npm run dev

# Start production server
npm start
```

The site will be available at `http://localhost:3000`.

## Project Structure

```
├── server.js          # Express app entry point
├── routes/            # Route handlers (index, about, adopt, help, contact)
├── views/             # EJS templates
│   ├── partials/      # Header, footer, dog-card components
│   └── *.ejs          # Page templates
├── public/            # Static assets
│   ├── css/style.css  # All styles (vanilla CSS, custom properties)
│   ├── js/main.js     # Minimal client-side JS
│   ├── fonts/inter/   # Self-hosted Inter font
│   └── images/        # Photos and assets
├── data/
│   └── dogs.json      # Adoptable dogs data
└── .env.example       # Environment variable template
```

## Updating Dog Listings

Edit `data/dogs.json` to add, remove, or update dog listings. Each dog entry:

```json
{
  "id": "buddy",
  "name": "Buddy",
  "breed": "Golden Retriever Mix",
  "age": "3 years",
  "sex": "Male",
  "weight": "55 lbs",
  "status": "available",
  "description": "Short description of the dog.",
  "photo": "/images/dogs/buddy.jpg",
  "petfinderUrl": "https://www.petfinder.com/..."
}
```

- Add dog photos to `public/images/dogs/`
- Set `status` to `"available"`, `"pending"`, or `"adopted"`

## Deployment (Hostinger Business)

1. Push to your GitHub repository
2. In Hostinger hPanel → Websites → Manage → Web App
3. Connect your GitHub repo, select the `main` branch
4. Set environment variables in hPanel
5. Hostinger auto-detects Express.js and handles the rest

## Contact Form

The contact form saves messages to `data/messages.json` and optionally sends email via SMTP (Nodemailer). Configure SMTP in `.env` to enable email delivery.

## License

Private — Dally's Hope 4 Paws Rescue Inc.
