var express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'code/uploads/' });
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/*router.post('/stats', upload.single('uploaded_file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file, req.body)
});*/




module.exports = router;
