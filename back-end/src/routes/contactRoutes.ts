//this file is used for the api for savign the contact form data to the database
import express from 'express';
import { PrismaClient } from '../generated/prisma';


const router = express.Router();
const prisma = new PrismaClient();

//here I am making the post api now 

router.post('/', async (req, res) => {
  const {firstName, lastName, email, phone, subject, message} = req.body 

  try {
    const saved = await prisma.contactMessage.create({
      data: {firstName, lastName, email, phone, subject, message },
    })
    res.status(201).json({ success: true, message: 'Message submitted successfully!', data: saved})
  }
  catch (error){
    console.log(error)
    res.status(500).json({ success: false, message: 'Message data failed to be saved to database.'})
  }
})


export default router