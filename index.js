import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
const API_URL = "https://covers.openlibrary.org/b/$key/$value-$size.jpg";

const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "readTracker",
    password : "myPostres123",  
    port : 5432
})

db.connect();

let books = [];

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM Book as b JOIN notes as n ON b.id = n.book_id");
    books = result.rows;

    books = books.map(book => ({
    ...book,
    coverUrl: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
    }));

    res.render("index.ejs", { books });
});

app.post("/sort", async (req, res) => {
    console.log(req.body);

    if(req.body.sortBy === 'date'){
        const result = await db.query("SELECT * FROM Book as b JOIN notes as n ON b.id = n.book_id ORDER BY date");
        books = result.rows;
    }
    else if(req.body.sortBy === 'rating'){
        const result = await db.query("SELECT * FROM Book as b JOIN notes as n ON b.id = n.book_id ORDER BY rating");
        books = result.rows;
    }
    else{
        const result = await db.query("SELECT * FROM Book as b JOIN notes as n ON b.id = n.book_id ORDER BY title");
        books = result.rows;
    }

    books = books.map(book => ({
    ...book,
    coverUrl: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
    }));
    res.render("index.ejs", { books });
})

app.post("/notes", async (req, res) => {
    const bookId = req.body.bookId;
    const result = await db.query("SELECT * FROM Book as b JOIN notes as n ON b.id = n.book_id WHERE b.id = $1", [bookId]);
    const book = result.rows[0];
    book.coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;
    res.render("notes.ejs", { book });
})

app.listen(port, ()=> {
    console.log("Listening on port ", port);
})