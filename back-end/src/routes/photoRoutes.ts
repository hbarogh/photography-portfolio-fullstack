import express from 'express';
import cloudinary from '../utils/cloudinary';
import type { ImageProps } from '../utils/types';

const router = express.Router()

router.get('/:collection', async function(req, res){
  const {collection} = req.params;

  if (!collection || typeof collection !== 'string'){
    return res.status(400).json({ error: 'Missing or invalid folder name' });
  }

  try{
    const results = await cloudinary.search
      .expression(`folder=${process.env.CLOUDINARY_FOLDER}/${collection}`)
      .with_field("context")
      .sort_by('public_id', 'desc')
      .max_results(50)
      .execute();
    const images = results.resources.map((img: ImageProps) => {
      const optimized_url = cloudinary.url(img.public_id, {
        secure: true,
        quality: "auto",
        fetch_format: "auto",
      });
      const label = img.context?.label
      return {
        id: img.public_id,
        url: optimized_url,
        width: img.width,
        height: img.height,
        label: img.context?.label ?? null,
      }
    });
    res.json(images);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Failed to fetch images from cloudinary, try again' });
  }
});


export default router 