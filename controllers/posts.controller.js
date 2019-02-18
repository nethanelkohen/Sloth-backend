const { Post, Station } = require("../models");
const { handlePushTokens } = require("../middleware/notification");

const get = async (req, res) => {
  let { id } = req.params;

  Post.findOne({ where: { id } }).then(post => res.json({ message: post }));
};

module.exports.get = get;

const getPostsbyStation = async (req, res) => {
  let { station } = req.params;

  Post.findAll({
    limit: 1,
    where: { station },
    order: [["createdAt", "DESC"]]
  }).then(entries => res.json({ message: entries }));
};

module.exports.getPostsbyStation = getPostsbyStation;

const getAllPostsbyStation = async (req, res) => {
  let { station } = req.params;

  Post.findAll({
    limit: 5,
    where: { station },
    order: [["createdAt", "DESC"]]
  }).then(entries => res.json({ message: entries }));
};

module.exports.getAllPostsbyStation = getAllPostsbyStation;

const create = async (req, res) => {
  Post.create(req.body)
    .then(results => res.json(results))
    .then(Station.findOne({ where: { station: req.body.station } }))
    .catch(err => res.json(err));

  Station.findOne({ where: { station: req.body.station } }).then(res => {
    res.update({ status: req.body.status_update }).then(res => res);
  });

  handlePushTokens(req.body);
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
