const { body, validationResult } = require("express-validator");
const multer = require("multer");
const mongoose = require("mongoose");

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware for validating user input during profile image upload
const validateImageUpload = [
    body('profileImage').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Profile image is required');
      }

      // Check if the uploaded file is an image
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedImageTypes.includes(req.file.mimetype)) {
        throw new Error('Invalid image format. Please upload a JPEG, PNG, or GIF file.');
      }

      return true;
    }),
    (req, res, next) => {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

// Middleware for validating user input during optional profile image upload
const optionalImageUploadValidation = [
  body('profileImage').custom((value, { req }) => {
    if (!req.file) {
      return true
    }

    // Check if the uploaded file is an image
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedImageTypes.includes(req.file.mimetype)) {
      throw new Error('Invalid image format. Please upload a JPEG, PNG, or GIF file.');
    }

    return true;
  }),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware for data validation during user signup
const signupValidation = [
    upload.single('profileImage'),
    body("email").isEmail().withMessage('Invalid email format'),
    body("phone").isMobilePhone('en-IN', { strictMode: false }).withMessage('Invalid phone number'),
    body("name").notEmpty().withMessage('Name should not be empty'),
    body("password").isLength({ min: 6 }).withMessage('Password should be atleast 6 characters long'),
    validateImageUpload,
  ];

// Middleware for data validation during user signup
const loginValidation = [
    body('email_or_phone')
    .notEmpty().withMessage('Email or phone is required')
    .custom((value, { req }) => {
      // Check that the value is either a valid email or a valid phone number
      if (!value) {
        throw new Error('Email or phone is required');
      }

      const isEmail = validator.isEmail(value);
      const isPhone = validator.isMobilePhone(value, 'en-IN', { strictMode: false });

      if (!isEmail && !isPhone) {
        throw new Error('Invalid email or phone format');
      }

      return true;
    }),
    body("password").isLength({ min: 6 }).withMessage('Password should be atleast 6 characters long')
  ];

// Middleware to validate userId parameter
const validateUserId = (req, res, next) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid userId parameter' });
  }

  next();
};

// Middleware for data validation during user own details modification
const modifyUserDetailsValidation = [
    upload.single('profileImage'),
    optionalImageUploadValidation
];


module.exports = { signupValidation, loginValidation, validateUserId, modifyUserDetailsValidation }