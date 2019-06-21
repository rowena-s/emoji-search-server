var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null,req.fileName+file.originalname )
}
})
app.listen(8000, function() {

  console.log('App running on port 8000');

});

var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
   console.log("Called the upoad route");  
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});