const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// 1. THE TEST ROUTE (Visit this in your browser)
app.get('/', (req, res) => {
    res.send("PROXY_IS_ALIVE_AND_READY");
});

// 2. THE CREATE ROUTE (This is the /api/create path)
app.post('/api/create', async (req, res) => {
    const ROBLOX_KEY = process.env.ROBLOX_KEY;
    
    try {
        const response = await axios.post('https://apis.roblox.com/v1/universes/create', req.body, {
            headers: {
                'x-api-key': ROBLOX_KEY,
                'Content-Type': 'application/json'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        // This sends the actual Roblox error back to your Roblox console
        res.status(error.response?.status || 500).json(error.response?.data || {error: "Internal Proxy Error"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy is running."));
