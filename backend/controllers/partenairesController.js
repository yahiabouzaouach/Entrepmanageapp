const { models } = require("../models/index");
const storages = require("../libs/handystorage");
const handle = require("../libs/promiseHandler");
const partenairesController = {
  getAllPartenaires: async (req, res) => {
    try {
      const partenaires = await models.Partenaires.findAll();

      if (!partenaires) {
        return res.status(500).json({ message: "Error retrieving partenaires" });
      }
      return res.status(200).json(partenaires);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Error reaching the partenaires, please try again later",
        });
    }
  },

  createPartenaires: (req, res) => {
    if (req.body.NomPartenaiers == "" || req.body.adresse == ""||req.body.numtel == "") {
      res.status(500).send({ message: "please fill all blanks" });
    } else {
      models.Partenaires.create({
        NomPartenaiers: req.body.NomPartenaiers,
        adresse: req.body.adresse,
        numtel: req.body.numtel
      })
        .then((Partenaires) => {
          res
            .status(201)
            .send({
              message: "Partenaire created successfully",
              data: Partenaires,
            });
        })
        .catch((err) =>
          res.status(500).send({ message: "partenaire already exist" })
        )
        .catch((err) => {
          res.status(500).json({ message: "there was an error:" + err });
        });
    }
  },
  getPatenairesByID: async (req, res) => {
    const PartenairesId = req.params.id;
    try {
      const Partenaires = await models.Partenaires.findOne({
        where: { NomPartenaiers: PartenairesId },
      });
      if (!Partenaires) {
        return res.status(404).send({ message: "Partenaires not found" });
      }

      res.status(200).send({ Partenaires });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  updatePatenaires: async (req, res) => {
    const PartenairesId = req.params.id;
    const newData = req.body;
    if (req.body.NomPartenaiers == "" || req.body.adresse == ""||req.body.numtel == "") {
        return res.status(403).json({ message: "Field can not be empty" });
    }
    try {
      let Partenaires = await models.Partenaires.findOne({
        where: { NomPartenaiers: PartenairesId },
      });

      if (!Partenaires) {
        return res.status(404).json({ message: "Partenaires not found" });
      }
      Partenaires = await Partenaires.update(newData);
      return res.json({ message: "Partenaires updated successfully", Partenaires });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  deletePatenaires: async (req, res) => {
    const PartenairesId = req.params.id;
    try {
      const Partenaires = await models.Partenaires.findOne({
        where: { NomPartenaiers: PartenairesId },
      });
      if (!Partenaires) {
        return res.status(404).send({ message: "Partenaires not found" });
      }


      await models.Partenaires.destroy({
        where: { PatenairesNomPartenaiers: PartenairesId },
      });

      await Partenaires.destroy();

      res.status(200).send({ message: "Partenaires deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = partenairesController;
