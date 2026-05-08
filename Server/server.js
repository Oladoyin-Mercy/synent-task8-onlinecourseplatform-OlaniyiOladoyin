const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dns = require('dns')
const User = require('./models/user')
require('dotenv').config();



const app = express()

app.use(cors());
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

dns.setServers(['1.1.1.1', '8.8.8.8']);

if (!dbURI) {
    console.error('Missing MONGODB_URI in .env');
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            serverSelectionTimeoutMS: 5000,
            family: 4,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message || err);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});




app.get('/signup', (req, res) => {
    res.render('signup');
});


app.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const newUser = new User({
            fullName,
            email,
            password
        });
        await newUser.save();
        res.send("User saved successfully!");
    }
    catch (err) {
        console.log("Error details:", err);
    }
});




// app.post('/signup', async (req, res) => {
//     console.log("I hit the POST route");
//     try {
//         res.send("It worked");
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });



// app.listen(PORT, () => {
//     console.log(`I am running on port ${port}`);
//     // res.send("Welcome to my Online Course platform");
// });
