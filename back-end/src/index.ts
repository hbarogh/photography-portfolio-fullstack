import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import photoRoutes from './routes/photoRoutes';
import contactRoutes from './routes/contactRoutes';

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5001;
const allowedOrigins = [
  'https://www.haydenbproductions.com',
  'http://localhost:5173',
]
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api/photos', photoRoutes);
app.use('/api/contact', contactRoutes);

//healthz request to keep backend alive
app.head('/healthz', (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});