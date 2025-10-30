# Read Tracker

This is a **Read Tracker** website which I built to test my database management skills using **PostgreSQL**.  
Here, I can maintain a record of the books that I've read and what I would rate them, along with their summary and detailed notes of my own.

## Installation

### Clone the repository
```bash
git clone https://github.com/dishitasaxenaa/Read-Tracker.git
```


### Navigate into the project folder:
```bash
cd Read-Tracker
```

### Install the dependencies and start the server:
```bash
npm install
nodemon index.js
```

## Tech Stack
* **Node.js**
* **Express.js**
* **EJS** (Embedded JavaScript templates)
* **PostgreSQL**
*  **Axios**
*  **Nodemon** (for automatic server restarts during development)

## Features

* Add and view books with details such as title, author, date read, and rating
* Store a short summary and detailed notes for each book
* Automatically fetch book cover images from the Open Library API
* Sort books by date, title, or rating
