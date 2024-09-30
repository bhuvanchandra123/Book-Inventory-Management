const express = require("express");
const { AddMultipleBooks, getOldBooks, getOneBook, updateBook, deleteBook, changeAuthorByGenre } = require("../controller/books");

const router = express.Router();


router.post("/add", AddMultipleBooks);
router.get("/get-one/:title", getOneBook);
router.get("/old", getOldBooks);
router.patch("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);
router.patch("/genre/:genre", changeAuthorByGenre);



module.exports = router;