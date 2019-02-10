const { Station } = require("../models");

const get = async (req, res) => {
  let { station } = req.params;

  Station.findOne({ where: { station } }).then(station =>
    res.json({ message: station })
  );
};

module.exports.get = get;

const getAll = async (req, res) => {
  Station.findAll().then(stations => res.json({ message: stations }));
};

module.exports.getAll = getAll;

const create = async (req, res) => {
  Station.create(req.body)
    .then(results => res.json(results))
    .catch(err => res.json(err));
};

module.exports.create = create;

const edit = async (req, res) => {
  let { body } = req;
  let { station } = req.params;

  Station.findOne({ where: { station } })
    .then(updatedStation => {
      if (updatedStation) {
        updatedStation.update(body);
        return res.status(200).json({ message: updatedStation });
      } else return res.status(200).json({ message: "station not found" });
    })
    .catch(err => res.json(err));
};

module.exports.edit = edit;
