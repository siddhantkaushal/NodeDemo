const multer = require('multer');
const fs = require('fs');

var storage =  multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

module.exports.fileUpload = function(req, res) {
  upload(req,res,function(err) {
      if(err) {
        console.log(err);
          return res.end("Error uploading file.");
      }
      res.render("index");
  });
};
