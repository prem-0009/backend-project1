const Time = require("./Todo");

module.exports = {
  makeAppointment: async (req, res) => {
    // console.clear();
    // console.log(req.body.appointmentTime);
    // return
    try {
      const newTime = new Time({
        appointmentTime: req.body.appointmentTime,
      });
      
      console.log(req.body)
      //check if it already exist
      let foundTime = await Time.findOne({appointmentTime:req.body.appointmentTime});
      if(foundTime){
          res.json({message:'select other time',status:409});
          return;
      }

      await newTime.save();

      res.json({ message:`see you at ${req.body.appointmentTime}` });
    } catch (e) {
      console.log(e);
      if (e.code === 11000) {
        res.json({ message: "this is already taken" });
      }
    }
  },
};
