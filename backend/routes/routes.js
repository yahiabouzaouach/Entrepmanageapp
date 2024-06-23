const express=require('express');
const router = express.Router();
const revenuesController= require("../controllers/revenuesController");
const categoriesController=require("../controllers/categoriesController");
const userController=require("../controllers/userContoller");
const depenseController=require("../controllers/depenseController");
const partenairesController=require("../controllers/partenairesController");
const tokenHandlerMiddleware = require("../middlewares/tokkenHandler");
const roleHandlerMiddleware = require("../middlewares/roleManagement");



//CRUD User
router.get('/me',tokenHandlerMiddleware , roleHandlerMiddleware(['admin', 'employee']) ,userController.getMe)
router.get("/user",tokenHandlerMiddleware ,roleHandlerMiddleware(['admin','employee'])  ,userController.getAllUser)
router.get('/getUser/:id',tokenHandlerMiddleware ,roleHandlerMiddleware(['admin', 'employee']),userController.getUserByID)
router.post('/updateUser/:id',tokenHandlerMiddleware ,roleHandlerMiddleware(['admin']) ,userController.updateUser)
router.delete('/deleteUser/:id',tokenHandlerMiddleware ,roleHandlerMiddleware(['admin']) , userController.deleteUser)

//CRUD Frais
router.get("/frais",tokenHandlerMiddleware ,roleHandlerMiddleware(['admin', 'employee']) ,revenuesController.getAllfrais);
router.post("/updateFrais/:id",tokenHandlerMiddleware , roleHandlerMiddleware(['admin']),revenuesController.updateFrais);
router.post("/createFrais", tokenHandlerMiddleware , roleHandlerMiddleware(['admin']) ,revenuesController.createfrais);
router.delete ("/deleteFrais/:id",tokenHandlerMiddleware , roleHandlerMiddleware(['admin']),revenuesController.deleteFrais);

//CRUD Categories
router.get("/categories", tokenHandlerMiddleware ,roleHandlerMiddleware(['admin', 'employee']) ,categoriesController.getAllCategories);
router.post("/createCategories", tokenHandlerMiddleware,roleHandlerMiddleware(['admin']),categoriesController.createCategories)
router.get('/getCategorie/:id',tokenHandlerMiddleware, roleHandlerMiddleware(['admin', 'employee']) ,categoriesController.getCategorieByID)
router.post('/updateCategorie/:id', tokenHandlerMiddleware,roleHandlerMiddleware(['admin']),categoriesController.updateCategorie)
router.delete('/deleteCategorie/:id',tokenHandlerMiddleware ,roleHandlerMiddleware(['admin']) , categoriesController.deleteCategorie)



//CRUD Depense
router.get("/depenses", tokenHandlerMiddleware,roleHandlerMiddleware(['admin', 'employee']), depenseController.getAllDepenses);
router.get("/depense/:id", tokenHandlerMiddleware, roleHandlerMiddleware(['admin', 'employee']), depenseController.getDepenseByID);
router.post("/updateDepense/:id", tokenHandlerMiddleware, roleHandlerMiddleware(['admin']), depenseController.updateDepense);
router.post("/createDepense",tokenHandlerMiddleware,roleHandlerMiddleware(['admin']) ,depenseController.createDepense);
router.delete("/deleteDepense/:id", tokenHandlerMiddleware, roleHandlerMiddleware(['admin']),depenseController.deleteDepense)

//CRUD partenaires
router.get("/partenaire",tokenHandlerMiddleware,roleHandlerMiddleware(['admin', 'employee']), partenairesController.getPatenairesByID);
router.get("/partenaires", tokenHandlerMiddleware,roleHandlerMiddleware(['admin', 'employee']),partenairesController.getAllPartenaires);
router.post("/createpartenaires",tokenHandlerMiddleware,roleHandlerMiddleware(['admin']),partenairesController.createPartenaires);
router.post("/updatepartenaires/:id",tokenHandlerMiddleware,roleHandlerMiddleware(['admin', 'employee']),partenairesController.updatePatenaires); //
router.delete("/deletepartenaires/:id", tokenHandlerMiddleware,roleHandlerMiddleware(['admin', 'employee']),partenairesController.deletePatenaires);


module.exports = router;