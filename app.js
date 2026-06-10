require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(express.json());
app.use(cors());

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/getResponse', async (req, res) => {

    try {

        const question = req.body.question;

        console.log("Question:", question);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent(question);

        const response = result.response.text();

        console.log("Response:", response);

        res.status(200).json({
            response: response
        });

    } catch (error) {

    console.error("FULL ERROR:", error);

    res.status(500).json({
        error: error.message
    });

}

});

// Invalid Routes
// app.get('*', (req, res) => {
//     res.status(404).json({
//         message: "Route Not Found"
//     });
// });

module.exports = app;