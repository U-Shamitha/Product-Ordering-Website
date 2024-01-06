const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { cloudinary } = require("../config/cloudinaryConfig");    

// Function to handle user signup
async function userSignup(req, res) {
  try {

    const { email, phone, name, password } = req.body;

    // Ensure at least one of the email or phone is provided
    if (!email && !phone) {
      return res
        .status(400)
        .json({ message: "At least one of the email or phone is required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }], role: "User" });
    if (existingUser) {
      return res.status(409).json({
        message: "User with the same email or phone number already exists",
      });
    }

    const salt = await bcrypt.genSalt(8); //Work Factor is set to 8
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      phone,
      name,
      password: hashedPassword,
      role: "User",
      profileImage: ""
    });

    //Profile image upload to Cloudinary
    const result =  await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "uploads", resource_type: "image" },
            (error, result) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return res.status(500).json({ message: "Internal Server Error" });
                } else {
                    resolve(result);
                }
            }
        ).end(req.file.buffer);
    });
    if (result) {
      user.profileImage = result.secure_url
      const newUser = await user.save();

      return res.status(201).json({ newUser , message: "User created successfully" });
    } else {
      console.log(result);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function userLogin(req, res) {
  const { email_or_phone, password } = req.body;

  const user = await User.findOne({ $or: [{ email: email_or_phone }, { phone: email_or_phone }], role: "User" });
  if(!user){
    return res
    .status(404)
    .json({ message: "User not found" });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return res.status(200).json({ user, token });
}

async function getOwnDetailsByUser(req, res){
    try {
      const user = await User.findById(req.user.userId);

      if(!user){
        return res
        .status(404)
        .json({ message: "User not found" });
      }

      if(user.role!=="User"){
        return res
          .status(400)
          .json({ message: "Only User acount details can be viewed using this api" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function modifyOwnDetailsByUser(req, res) {
  try {

    console.log(req.body);
    const { name } = req.body;

    const user = await User.findById(req.user.userId);

    if(!user){
      return res
      .status(404)
      .json({ message: "User not found" });
    }

    if(user.role!=="User"){
      return res
        .status(400)
        .json({ message: "Only User account details can be modified using this api" });
    }

    // Check if email and phone are being modified
    if (req.body.email || req.body.phone) {
      return res
        .status(400)
        .json({ message: "Email and phone cannot be changed." });
    }
    
    if(name){
      user.name = name;
    }

    if(req.file){
      // Extract the public ID from the previous secure URL
      const previousPublicId = "uploads/"+user.profileImage.split('/').pop().split('.')[0];

      // Delete the previous image with the given public ID
      cloudinary.uploader.destroy(previousPublicId, (error, result) => {
        if (error) {
          console.error('Error deleting previous image:', error);
          return res.status(500).json({ message: "Internal Server Error" });
        } else {
          console.log('Previous image deleted successfully:', result);
          // Upload the new image to the "uploads" folder
          cloudinary.uploader.upload_stream({ folder: "uploads", overwrite: true }, async(error, result) => {
            if (error) {
              console.error('Error uploading new image:', error);
              return res.status(500).json({ message: "Internal Server Error" });
            } else {
              // Update the image URL or public_id in your database
              console.log('Updated image URL:', result.secure_url);
              user.profileImage = result.secure_url;
              await user.save(); // Save the updated user document
              return res.status(200).json({user, message: "User details modified successfully" })
            }
          }).end(req.file.buffer);
        }
      });

    }else{
      await user.save(); // Save the updated user document
      return res.status(200).json({user, message: "User details modified successfully" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteOwnAccountByUser(req, res){
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "User") {
      return res.status(403).json({ message: "Access forbidden. Only User accounts can be deleted with this api" });
    }

    // Extract the public ID from the previous secure URL
    const previousPublicId = "uploads/"+user.profileImage.split('/').pop().split('.')[0];

    // Delete the previous image with the given public ID
    cloudinary.uploader.destroy(previousPublicId, async(error, result) => {
      if (error) {
        console.error('Error deleting previous image:', error);
        return res.status(500).json({ message: "Internal Server Error" });
      } else {
        console.log('Previous image deleted successfully:', result);
        await User.findByIdAndDelete(req.user.userId);
        return res.status(200).json({ message: "User Account deleted successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { userSignup, userLogin, getOwnDetailsByUser, modifyOwnDetailsByUser, deleteOwnAccountByUser};
