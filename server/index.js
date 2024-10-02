const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Corrected typo
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL ,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

const server = app.listen(process.env.PORT, () => {
    console.log(`Starting on port ${process.env.PORT}`);
});
