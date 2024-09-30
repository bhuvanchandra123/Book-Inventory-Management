const mongoose = require("mongoose");
const { Books } = require("../../models/books");


const AddMultipleBooks = async(req, res)=>{ //add books
     const books = req.body;
      for(const el of books){
         if(!el.title || !el.author){
          console.log("Missing fields for book:", el);
          return res.status(400).send({error: "title and author required"})
         }
      }
      try{
        let addBooks = await Books.insertMany(books);
        return res.status(200).send({message: "Books added successfully", addBooks})
      }catch(error){
        console.error("Error adding books:", error);
        return res.status(500).send({message: "server error"})
      }
};


const getOneBook = async(req, res)=>{   //get one book
  const {title} = req.params;
     if(!title){
      return res.status(400).send({error: "title required"})
     }
     try{
        let getBook = await Books.findOne({title: title});
         console.log(getBook)
        if(!getBook){
           return res.status(400).send({message: "book not found"})
        }
        res.status(200).send({message: "book found", book: getBook}) 
     }catch(error){
        return res.status(500).send({message: "server error"})
      }
};


const getOldBooks = async(req, res)=>{    //get old books
     try{
        let getOldBooks = await Books.find({publishedYear: { $lte: 2000 }});
        res.send({"oldBooks": getOldBooks})
     }catch{
        return res.status(500).send({message: "server error"})
     }
};


const updateBook = async(req, res)=>{    //update book by id
   const {id} = req.params;
   const updateData = req.body;
   console.log(updateData)
   if(!id || !updateData || Object.keys(updateData).length === 0){
      return res.status(400).send({error: "Id and body-data required"})
   }// ToDo => handle if body empty
  try{
     let updateBook = await Books.findByIdAndUpdate(id, updateData, {new: true});
     if (!updateBook) {
      return res.status(404).send({ message: "Book not found" });
     }   
    res.status(200).send({ message: "Book updated successfully", updateBook });  
   }catch (error) {
      // console.error("Error updating book:", error);
      return res.status(500).send({ message: "Server error" });
    }
};


const deleteBook = async(req, res)=>{    //delete book
   const {id} = req.params;
   if(!id){
      return res.status(400).send({error: "Id required"})
   }
   try{  
      let deleteBook = await Books.findByIdAndDelete(id);
      if(!deleteBook){
         return res.status(404).send({ message: "Book not found" });
      }
      res.status(201).send({message: "Book deleted successfully", "deleteBook": deleteBook})
   }catch (error) {
      console.error("Error deleting book:", error);
      return res.status(500).send({message: "server error"})
   }
};


const changeAuthorByGenre = async(req, res)=>{    //changing books author by genre
   const {genre} = req.params;
   const updateData = req.body;
   if(!genre){
      return res.status(400).send({error: "genre required"})
   }
   try{
      let updateBook = await Books.updateMany({genre}, updateData, {new: true});
      if(!updateBook){
         return res.status(404).send({ message: "Book not found" });
      }
      if(updateBook.modifiedCount === 0){
         return res.status(404).send({ message: "Book out of stock" });
      }
      res.status(201).send({message: "book update successfully", "modifiedCount": updateBook.modifiedCount})
   }catch(error){
      console.error("Error updating book:", error);
      return res.status(500).send({message: "server error"})
   }
};



module.exports = {AddMultipleBooks, getOneBook, getOldBooks, updateBook, deleteBook, changeAuthorByGenre};







//  async function (req, res, next) {
//     try {
//       let { email, password } = req.body;
//       let addedUser = await Users.create({ email, password }); //gives object that has been added
//       res.send({ addedUser });
//     } catch (err) {
//       console.log(err);
//     }
//   });