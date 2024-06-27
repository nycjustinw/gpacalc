const express = require('express');
const bodyParser = require('body-parser');
const gradeRoutes = require('./server/routes/gradeRoutes');
const connectDB = require('./server/database/connection');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));

// Connect to Database
connectDB();

// Routes
app.use('/grades', gradeRoutes);

// Serve static files and views
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use(express.static(path.join(__dirname, 'public')));
//load assets
app.use('/js', express.static(path.resolve(__dirname, "/assets/js")))
app.use('/css', express.static(path.resolve(__dirname, "/assets/css")))
app.use('/images', express.static(path.resolve(__dirname, "/assets/images")))

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
