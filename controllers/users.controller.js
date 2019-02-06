const { User } = require("../models");

const create = async (req, res) => {
  User.create(req.body)
    .then(results => res.json(results))
    .catch(err => res.json(err));
};

module.exports.create = create;

const edit = async (req, res) => {
  let { body } = req;
  let { id } = req.params;

  User.findOne({
    where: { id },
    attributes: {
      exclude: ["password"]
    }
  })
    .then(updatedUser => {
      if (updatedUser) {
        updatedUser.update(body);
        return res.status(200).json({ message: updatedUser });
      } else return res.status(200).json({ message: "user not found" });
    })
    .catch(err => res.json(err));
};

module.exports.edit = edit;
