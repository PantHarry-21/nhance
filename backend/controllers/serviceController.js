// === serviceController.js ===
import { supabase } from '../supabaseClient.js';
import fs from 'fs';

export const getServices = async (req, res) => {
  const { data, error } = await supabase.from('services').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const createService = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    const { name, price, category_id } = req.body;
    let imageUrl = null;

    if (req.file) {
      const image = req.file;
      const imageBuffer = fs.readFileSync(image.path);
      const fileExt = image.originalname.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('service-images')
        .upload(fileName, imageBuffer, { contentType: image.mimetype });

      if (uploadError) {
        console.error('Image Upload Error:', uploadError);
        return res.status(400).json({ error: uploadError.message });
      }

      imageUrl = fileName;
    }

    const { data, error } = await supabase.from('services').insert([
      { name, price, category_id, image: imageUrl },
    ]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Create Service Error:', err);
    res.status(500).json({ error: 'Server error while creating service.' });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category_id } = req.body;
    const updates = { name, price, category_id };

    if (req.file) {
      const image = req.file;
      const imageBuffer = fs.readFileSync(image.path);
      const fileExt = image.originalname.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('service-images')
        .upload(fileName, imageBuffer, { contentType: image.mimetype });

      if (uploadError) {
        console.error('Image Upload Error (update):', uploadError);
        return res.status(400).json({ error: uploadError.message });
      }

      updates.image = fileName;
    }

    const { data, error } = await supabase.from('services').update(updates).eq('id', id);
    if (error) {
      console.error('Supabase Update Error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error('Update Service Error:', err);
    res.status(500).json({ error: 'Server error while updating service.' });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('services').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};