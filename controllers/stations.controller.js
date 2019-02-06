const { Station } = require("../models");

const create = async (req, res) => {
  Station.create(req.body)
    .then(results => res.json(results))
    .catch(err => res.json(err));
};

module.exports.create = create;

const edit = async (req, res) => {
  let { body } = req;
  let { id } = req.params;

  Station.findOne({ where: { id } })
    .then(updatedStation => {
      if (updatedStation) {
        updatedStation.update(body);
        return res.status(200).json({ message: updatedStation });
      } else return res.status(200).json({ message: "station not found" });
    })
    .catch(err => res.json(err));
};

module.exports.edit = edit;
