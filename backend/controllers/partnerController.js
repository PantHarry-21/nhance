// === partnerController.js ===
import { supabase } from '../supabaseClient.js';
import { sendEmail } from '../utils/sendEmail.js';
import fs from 'fs';
import path from 'path';

export const invitePartner = async (req, res) => {
  try {
    const { full_name, email } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({ error: 'Full name and email are required' });
    }

    const { data, error } = await supabase.from('partners').insert([
      {
        full_name,
        email,
        status: 'Invited',
        created_at: new Date().toISOString(),
      }
    ]);

    if (error) return res.status(400).json({ error: error.message });

    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const inviteUrl = `${baseUrl}/partner/signup?email=${encodeURIComponent(email)}&name=${encodeURIComponent(full_name)}`;

    await sendEmail({
      to: email,
      subject: "You're invited to join NHance!",
      html: `
        <h2>Hello ${full_name},</h2>
        <p>You’ve been invited to become a partner on <strong>NHance</strong>.</p>
        <p>Click the button below to complete your signup:</p>
        <a href="${inviteUrl}" style="display:inline-block;padding:12px 20px;background:#4B0082;color:#fff;border-radius:6px;text-decoration:none;font-weight:bold">Complete Signup</a>
        <p style="margin-top:20px;font-size:12px;color:#888;">If you didn’t expect this email, you can safely ignore it.</p>
      `
    });

    res.status(201).json({ message: 'Partner invited successfully', data });
  } catch (err) {
    console.error('Invite Partner Error:', err);
    res.status(500).json({ error: 'Server error occurred' });
  }
};

export const completePartnerSignup = async (req, res) => {
  try {
    const {
      full_name,
      email,
      services_offered,
      experience,
    } = req.body;

    const identityDoc = req.files?.identity_doc;
    const profilePic = req.files?.profile_pic;
    


    if (!identityDoc || !profilePic) {
     
      return res.status(400).json({ error: 'Document and profile picture are required.' });
    }
    
    const uploadFile = async (file, folder) => {
      const ext = path.extname(file.name);
      const fileName = `${folder}/${Date.now()}-${file.name}`;
      const buffer = fs.readFileSync(file.tempFilePath);
      const uploadResult = await supabase.storage
        .from('partners')
        .upload(fileName, buffer, {
          contentType: file.mimetype,
        });

      if (uploadResult.error) throw new Error(uploadResult.error.message);

      const publicUrlData = supabase.storage.from('partners').getPublicUrl(fileName);
      return publicUrlData.data.publicUrl;
    };

    const identityDocUrl = await uploadFile(identityDoc, 'identity');
    const profilePicUrl = await uploadFile(profilePic, 'profile');

    const updateResult = await supabase
      .from('partners')
      .update({
        full_name,
        services_offered,
        experience,
        identity_doc_url: identityDocUrl,
        profile_pic_url: profilePicUrl,
        status: 'Active',
        updated_at: new Date().toISOString(),
      })
      .eq('email', email)
      .select();

    if (updateResult.error) return res.status(400).json({ error: updateResult.error.message });

    await sendEmail({
      to: email,
      subject: 'NHance Partner Signup Successful ✅',
      html: `
        <h2>Welcome to NHance, ${full_name}!</h2>
        <p>Your partner profile has been successfully completed.</p>
        <p>We look forward to working with you! 🚀</p>
        <br />
        <small>This is an automated email from NHance.</small>
      `,
    });

    res.status(200).json(updateResult.data);
  } catch (err) {
    console.error('Partner Signup Error:', err);
    res.status(500).json({ error: 'Server error occurred' });
  }
};

export const getAllPartners = async (req, res) => {
  try {
    const { data, error } = await supabase.from('partners').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
  } catch (err) {
    console.error('Get Partners Error:', err);
    res.status(500).json({ error: 'Server error occurred' });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('partners').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: 'Partner deleted successfully' });
  } catch (err) {
    console.error('Delete Partner Error:', err);
    res.status(500).json({ error: 'Server error occurred' });
  }
};

export const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, status } = req.body;
    const { data, error } = await supabase.from('partners').update({
      full_name,
      email,
      status,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
  } catch (err) {
    console.error('Update Partner Error:', err);
    res.status(500).json({ error: 'Server error occurred' });
  }
};