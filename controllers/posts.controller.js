const { Post, Station } = require("../models");

const get = async (req, res) => {
  let { id } = req.params;

  Post.findOne({ where: { id } }).then(post => res.json({ message: post }));
};

module.exports.get = get;

const create = async (req, res) => {
  Post.create(req.body)
    .then(results => res.json(results))
    .then(Station.findOne({ where: { station: req.body.station } }))
    .then(res => console.log("station", res))
    .catch(err => res.json(err));

  Station.findOne({ where: { station: req.body.station } }).then(res =>
    res.update({ status: req.body.status_update }).then(res => console.log(res))
  );
};

module.exports.create = create;

const changeScore = async (req, res) => {
  let { url } = req;
  let { id } = req.params;

  Post.findOne({ where: { id } })
    .then(score => {
      if (url.includes("increment")) {
        return score.increment("vetting_score");
      } else if (url.includes("decrement")) {
        return score.decrement("vetting_score");
      }
    })
    .then(incrementedScore => incrementedScore.reload())
    .then(Post.findOne({ where: { id } }))
    .then(response => res.status(200).json({ message: response }))
    .catch(err => res.json(err));
};

module.exports.changeScore = changeScore;
