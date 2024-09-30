MongoDB CRUD Assignment: Book Inventory Management
Objective:
In this assignment, you will create an Express app that performs basic CRUD operations using MongoDB. The focus will be on managing a book inventory with details such as title, author, genre, published year, and copies available.

You need to implement routes for inserting, finding, updating, and deleting books using MongoDB and express.

Setup Instructions:
Install Required Packages:
npm init -y
npm install express mongoose
Connect to MongoDB: Make sure you have MongoDB running locally or use MongoDB Atlas for cloud-based access.
Book Schema:
Define the book schema with the following fields:

Title (String, required)
Author (String, required)
Genre (String)
Published Year (Number)
Copies Available (Number)
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  publishedYear: Number,
  copiesAvailable: Number,
}); 

const Book = mongoose.model("Book", bookSchema);
Routes to Implement:
1. POST /books - Add Multiple Books
Insert multiple books into the inventory.
Use insertMany to add multiple books at once.
Example Request:
POST /books
[
  {
    "title": "Book One",
    "author": "Author A",
    "genre": "Fiction",
    "publishedYear": 1999,
    "copiesAvailable": 3
  },
  {
    "title": "Book Two",
    "author": "Author B",
    "genre": "Non-fiction",
    "publishedYear": 2010,
    "copiesAvailable": 5
  }
]
Example Response:
{
  "message": "Books added successfully",
  "books": [
    /* inserted book objects */
  ]
}
2. GET /books/:title - Find Book by Title
Find a book by its title using findOne.
Example Request:
GET /books/Book%20One
Example Response:
{ 
  "title": "Book One",
  "author": "Author A",
  "genre": "Fiction",
  "publishedYear": 1999,
  "copiesAvailable": 3
}
3. GET /books/old - Find Books Published Before 2000
Find all books published before the year 2000.
Log a message: "Old Book: <title>" for each book found.
Example Request:
GET /books/old
Example Response:
{
  "oldBooks": [
    {
      "title": "Book One",
      "author": "Author A",
      "genre": "Fiction",
      "publishedYear": 1999
    }
  ]
}
4. PATCH /books/:id - Update Book's Copies Available
Update the copies available for a specific book by its ID using findByIdAndUpdate.
Example Request:
PATCH /books/66ec629a4410eb8657b14d85
{
  "copiesAvailable": 4
}
Example Response:
{
  "message": "Copies updated successfully",
  "updatedBook": {
    "_id": "66ec629a4410eb8657b14d85",
    "title": "Book One",
    "author": "Author A",
    "copiesAvailable": 4
  }
}
5. DELETE /books/:id - Delete a Book by ID
Delete a book by its ID using findByIdAndDelete.
Example Request:
DELETE /books/66ec629a4410eb8657b14d85
Example Response:
{
  "message": "Book deleted successfully"
}
6. PATCH /books/genre/:genre - Update Author for Books in a Specific Genre
Update the author for all books in a specific genre using updateMany.
Example Request:
PATCH /books/genre/Fiction
{
  "author": "Updated Author"
}
Example Response:
{
  "message": "Books updated successfully",
  "modifiedCount": 2
}
Logic Requirements:
After updating copies available, if a book has 0 copies, log: "Book out of stock: <title>".
If a book's published year is before 2000, log: "Old Book: <title>".
Deliverables:
All routes should be implemented and tested using Postman or any other API client.
Make sure to handle errors and edge cases, such as when a book is not found or when invalid data is provided.
Add basic validation to ensure that required fields (like title and author) are provided.
Good luck!