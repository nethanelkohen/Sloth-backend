const { Post } = require("../models");

const create = async (req, res) => {
  Post.create(req.body)
    .then(results => res.json(results))
    .catch(err => res.json(err));
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
