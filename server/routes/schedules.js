const express = require("express");
const router = express.Router();
const { Schedule } = require("../models/Schedule");

router.post("/", (req, res) => {
  const schedule = new Schedule(req.body);
  schedule.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/getSchedules", (req, res) => {
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (req.body.filters[key] == 0.5) {
        findArgs[key] = {
          $gte: 0,
          $lte: 5,
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Schedule.find(findArgs)
    .populate("writer")
    .sort({ specifiedDate: 1 })
    .exec((err, schedules) => {
      if (err) return res.status(400).json({ success: false, err });
      res
        .status(200)
        .json({ success: true, schedules, postSize: schedules.length });
    });
});

router.delete("/delete", (req, res) => {
  let scheduleId = req.query.id;

  Schedule.findOneAndDelete({ _id: scheduleId })
    .populate("writer")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
});

router.post("/update", (req, res) => {
  let scheduleId = req.query.id;

  Schedule.findOne({ _id: scheduleId })
    .populate("writer")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, schedule });
    });
});

router.post("/getDetailSchedule", (req, res) => {
  Schedule.findOne({ _id: req.body.scheduleId }).exec((err, schedule) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, schedule });
  });
});

router.put("/updateSchedule", (req, res) => {
  let variables = {
    writer: req.body.writer,
    _id: req.body._id,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    specifiedDate: req.body.specifiedDate,
    importance: req.body.importance,
  };

  Schedule.findOneAndUpdate({ _id: req.body._id }, { $set: variables })
    .populate("writer")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, doc });
    });
});

module.exports = router;
