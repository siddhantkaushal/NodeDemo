const fs = require('fs');

module.exports.VideoPlay =  function (req, res) {
  const path = 'D:\\Downloads\\Thor_(2011)\\Thor.2011.720p.BrRip.264.YIFY.mp4'
  // console.log(path);

  const fileSize = fs.statSync(path).size
  // console.log(fileSize);

  range = req.headers.range;
  // console.log("range", range);
  // console.log("**********************");
  if(range){
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

    const chunksize = (end-start)+1;
    console.log("chunksize", chunksize);
    const file = fs.createReadStream(path, {start, end});

    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);

  }else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
};
