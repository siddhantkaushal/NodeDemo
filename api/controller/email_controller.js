const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


module.exports.sendMail = function (req, res) {
  if(res){

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'skaushal.fzk@gmail.com',
            pass: 'candymanclassmate'
        },
        tls: { rejectUnauthorized: false }
    }));

    let mailOptions = {
        from: 'skaushal.fzk@gmail.com', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body // plain text body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }else {
            console.log('Message sent', info.messageId);
          }
            transporter.close();
          });
      res.status(200).render('index')
  }
};
