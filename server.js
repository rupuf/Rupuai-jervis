import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "sk-proj-YlRCLlU_l5my7inr_q6Eh8YIqdC7_eNQi7Ec10U1IRGWfwRm-pqABrH80B5EKINsOukTNM5pWqT3BlbkFJM6AcbPszn_uEVdG5P64yegoSC4woGrhKilm7g8aYGprcyPhA3LbEH_IOm-ykyj89nbHfMCakA";

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/ask-ai', async (req, res) => {
    const { message } = req.body;
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        });

        res.json({ text: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: "Failed to get a response from the AI." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
