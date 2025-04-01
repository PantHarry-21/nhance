import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: "Email and role required" });
  }

  const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({ token });
};
