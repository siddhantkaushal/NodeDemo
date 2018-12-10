const path = require('path');
// const mongoose = require('mongoose');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '9d2338d7',
  apiSecret: 'M82K5qBpxR0cAsyP'
});

module.exports.userDetails = function (req,res) {
  let phoneNumber = req.body.number;
  console.log(phoneNumber);
  nexmo.verify.request({number: phoneNumber, brand: "ICICI Bank"}, (err,
  result) => {
    if(err) {
      res.sendStatus(500);
    } else {
      let requestId = result.request_id;
      console.log("requestId: " + requestId );
      if(result.status == '0') {
        res.render('verify_result', {requestId: requestId}); // Success! Now, have your user enter the PIN
      } else {
        res.status(401).send(result.error_text);
      }
    }
  });
};

module.exports.verifyResult = function(req, res) {
  let pin = req.body.pin;
  let requestId = req.body.requestId;

  nexmo.verify.check({request_id: requestId, code: pin}, (err, result) => {
    if(err) {
      // handle the error
    } else {
      if(result && result.status == '0') { // Success!
        console.log("Account has been verified");
        res.status(200).render('index');
        // res.render('status', {message: 'Account verified! 🎉'});
      } else {
        res.json({"message":"Incorrect pin"})
      }
    }
  });
}
