export const getProfile = async (req, res) => {
    res.json({
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      membership: 'Premium',
      joined: 'Jan 2024',
    });
  };
  
  export const updateProfile = async (req, res) => {
    const updated = req.body;
    res.json({ message: 'Profile updated successfully', updated });
  };
  