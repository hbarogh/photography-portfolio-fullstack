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
    // const optimizedImages = results.resources.map((img: ImageProps) => {
    //   const transformedUrl = img.secure_url.replace(
    //     '/upload',
    //     '/upload/q_auto/f_auto/'
    //   );
    //   const label = img.context?.label
    //   return{
    //     ...img,
    //     optimized_url: transformedUrl,
    //     collectionLabel: label
    //   };
    // });
    // res.json(optimizedImages);
    const images = results.resources.map((img: ImageProps) => {
      const base = img.secure_url.replace('/upload', '/upload/q_auto,f_auto,dpr_auto');
      // Optionally control width(s) the frontend will request:
      const url = `${base}`;                // default (let browser pick DPR)
      return {
        id: img.public_id,
        url,
        width: img.width,
        height: img.height,
        format: img.format,
        label: img.context?.label ?? null,
      };
    });

    // Optional caching hint for the JSON list
    res.set('Cache-Control', 'public, max-age=60, s-maxage=300');
    return res.json({
      images,
      // nextCursor: results.next_cursor ?? null, // expose if you add pagination
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Failed to fetch images from cloudinary, try again' });
  }
});


export default router 