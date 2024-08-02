// routes/auth.js
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    /* Take all information from the form */
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    const profileImagePath = profileImage.path;

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }


    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Create a new User */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
      phoneNumber,
    });

    await newUser.save();

    /* Send a successful message */
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
});

/* USER LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    /* Check if user exists */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
})

/* USER PROFILE UPDATE */
router.put("/update-profile", async (req, res) => {
  try {
    const { userId, currentEmail, currentPassword, newEmail, newPassword, firstName, lastName } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

  
    if (user.email !== currentEmail) {
      return res.status(400).json({ message: "Current email is incorrect!" });
    }

    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect!" });
    }

    // Update user data
    if (newEmail && newEmail !== user.email) {
      user.email = newEmail;
    }
    if (newPassword) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(newPassword, salt);
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Profile updated successfully!", user });
  } catch (err) {
    console.error("Error updating user profile:", err.message);
    res.status(500).json({ message: "Error updating profile. Please try again." });
  }
});

module.exports = router;
