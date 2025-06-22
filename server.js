const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Initialize OpenAI correctly for latest SDK (v4.x+)
const openaiKey = process.env.OPENAI_API_KEY;

// ✅ Route to handle chatbot requests
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Start the server
app.listen(3000, () => {
  console.log("✅ Server started on http://localhost:3000");
});
