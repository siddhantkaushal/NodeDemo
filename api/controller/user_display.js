module.exports.UserDisplay = function (req, res) {
  var user = {
    fname : req.body.firstName,
    lname : req.body.lastName,
    age: 23
  }

  if(res){
    res.status(200).render('result',{user:user});
  };
};
