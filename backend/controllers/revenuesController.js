const { models } = require("../models/index");
const storages = require("../libs/handystorage");
const revenuesController = {
  getAllfrais: async (req, res, next) => {
    try {
      const Frais = await models.Revenues.findAll();

      if (!Frais) {
        return res.status(500).send({ message: "Error retrieving revenue" });
      }

      return res.status(200).json(Frais);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error reaching the revenue, please try again later" });
    }
  },

  createfrais: (req, res) => {
    
    if (
      req.body.nomclient == "" ||
      req.body.nomprojet == "" ||
      req.body.montant == "" 
    ) {
      res.status(500).send("please fill all blanks");
    } else {
            models.Revenues
              .create({
                nomclient: req.body.nomclient,
                nomprojet: req.body.nomprojet,
                montant: req.body.montant,
              })
              .then((Frais) => {
                res
                  .status(201)
                  .send({ message: "frais created successfully", data: Frais });
              })
              .catch((err) => {
                res.status(500).send({ message: `There was an error: ${err}` });
              });
          }
    },
  updateFrais: async (req, res) => {
    const fraisId = req.params.id;
    const newData = req.body;
    try {
      const Frais = await models.Revenues.findOne({
        where: { idrev: fraisId },
      });
      if (!Frais) {
        return res.status(404).json({ message: "revenue not found" });
      }else {
          await Frais.update(newData);
          return res
            .status(200)
            .json({ message: "revenues updated successfully", data: Frais });
        }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteFrais: async (req, res) => {
    const fraisId = req.params.id;
    try {
      const Frais = await models.Revenues.findOne({
        where: { idrev: fraisId },
      });
      if (!Frais) {
        return res.status(404).send({ message: "revenue not found" });
      }
      await Revenues.destroy();

      res.status(200).send({ message: "Revenue deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
module.exports = revenuesController;
