const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// This is the endpoint Roblox will talk to
app.post('/api/create', async (req, res) => {
    console.log("Request received for game:", req.body.name);

    const ROBLOX_KEY = process.env.ROBLOX_KEY;

    if (!ROBLOX_KEY) {
        return res.status(500).json({ error: "Server missing ROBLOX_KEY environment variable" });
    }

    try {
        const response = await axios.post('https://apis.roblox.com/v1/universes/create', req.body, {
            headers: {
                'x-api-key': ROBLOX_KEY,
                'Content-Type': 'application/json'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Roblox API Error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: "API Request Failed" });
    }
});

// Home route to check if server is live
app.get('/', (req, res) => res.send("Proxy is Online!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
