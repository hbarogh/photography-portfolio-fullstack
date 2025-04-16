import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import photoRoutes from './routes/photoRoutes';

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api/photos', photoRoutes);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});