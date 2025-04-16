import express, {Request, Response} from 'express';
import cloudinary from '../utils/cloudinary';

const router = express.Router()

router.get('/:collection', async (req, res) => {
  const {folder} = req.query;

  if (!folder || typeof folder !== 'string'){
    return res.status(400).json({ error: 'Missing or invalid folder name' });
  }

  try{
    const results = await cloudinary.search
      .expression(`folder=${folder}`)
      .sort_by('public_id', 'desc')
      .max_results(50)
      .execute();

    res.json(results);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Failed to fetch images from cloudinary, try again' });
  }
})


export default router 