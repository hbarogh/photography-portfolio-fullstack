# HaydenBProductions 

This is a full-stack photography portfolio site I built to combine my creative interest in photography with my technical skills in software development. The site showcases my photography and includes a contact form for visitors to reach out.

Images are hosted on Cloudinary, and contact form submissions are stored in Supabase. I use Prisma as an ORM to interact with the Supabase database, giving me full control over schema management and allowing me to handle migrations in code instead of relying on Supabase’s table editor. This setup deepens my understanding of schema design and database operations in a production environment.

## Live Deployment 
- https://haydenbproductions.com

## Tech Stack

- **Frontend:** Vue 3, Vite, Naive UI, TypeScript  
- **Backend:** Node.js, Express  
- **Media Hosting:** Cloudinary  
- **Database:** Supabase(PostgreSQL) + Prisma
- **Deployment:** Vercel (frontend), Render (backend)

## Features

- Responsive image grid by collection
- Skeleton loading states
- Cloudinary-optimized images
- Dynamic routing with Vue Router
- Scroll to top of page functionality
- Contact form with Supabase integration

## Setup

```bash
# Frontend
cd front-end
npm install
npm run dev

# Backend
cd backend
npm install
npm run start
