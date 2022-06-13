const router = require("express").Router();
const Model = require("../models/novelModel");

router.post("/add", (req, res) => {
  console.log(req.body);

  new Model(req.body)
    .save()
    .then((data) => {
      console.log("novel added successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/getall", (req, res) => {
  
    Model.find({}).populate("user")
      .then((data) => {
        console.log("novel data fetched successfully..");
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
 
});

router.delete("/delete/:pid", (req, res) => {
  Model.findByIdAndDelete(req.params.pid)
    .then((data) => {
      console.log("novel data deleted successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/getbyid/:pid", (req, res) => {
  Model.findById(req.params.pid).populate("user")
    .then((data) => {
      console.log("novel data fectched successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/getbyuserid/:id", (req, res) => {
  Model.find({user:req.params.id})
    .then((data) => {
      console.log("novel data fectched successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.put("/update/:pid", (req, res) => {
  Model.findByIdAndUpdate(req.params.pid,req.body)
    .then((data) => {
      console.log("novel data updated successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});


module.exports = router;