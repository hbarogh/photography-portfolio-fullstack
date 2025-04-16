import express from 'express';
import cloudinary from '../utils/cloudinary';

const router = express.Router()

router.get('/:collection', async (req, res) => {
  const {collection} = req.params;

  if (!collection || typeof collection !== 'string'){
    return res.status(400).json({ error: 'Missing or invalid folder name' });
  }

  try{
    const results = await cloudinary.search
      .expression(`folder=${process.env.CLOUDINARY_FOLDER}/${collection}`)
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