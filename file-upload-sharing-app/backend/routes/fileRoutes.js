const express = require('express');
const multer = require('multer');
const FileController = require('../controllers/fileController');

const router = express.Router();
const fileController = new FileController();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the filename
  }
});

const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/; // Allowed file types
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: File type not supported!'));
}});

// Define routes
router.post('/upload', upload.single('file'), (req, res) => {
  fileController.uploadFile(req, res);
});

router.get('/files', (req, res) => {
  fileController.getFiles(req, res);
});

router.get('/files/:id', (req, res) => {
  fileController.downloadFile(req, res);
});

router.delete('/files/:id', (req, res) => {
  fileController.deleteFile(req, res);
});

module.exports = router;