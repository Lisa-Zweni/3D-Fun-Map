const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies

// Sample Points of Interest (POIs)
const pois = [
    { id: 1, lng: -79.3869, lat: 43.6426, title: "CN Tower", description: "World’s tallest free-standing structure for over 30 years." },
    { id: 2, lng: -79.4099, lat: 43.6330, title: "Royal Ontario Museum", description: "Historical museum with over 6 million items." },
];

// Route to get all POIs
app.get('/api/pois', (req, res) => {
    res.json(pois);
});

// Route to get a specific POI by ID
app.get('/api/pois/:id', (req, res) => {
    const poi = pois.find(p => p.id === parseInt(req.params.id));
    if (!poi) return res.status(404).json({ error: "POI not found" });
    res.json(poi);
});

// Route to add a new POI
app.post('/api/pois', (req, res) => {
    const { lng, lat, title, description } = req.body;
    if (!lng || !lat || !title || !description) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const newPoi = { id: pois.length + 1, lng, lat, title, description };
    pois.push(newPoi);
    res.status(201).json(newPoi);
});

// Route to integrate with Gemini AI (Placeholder)
app.post('/api/gemini', (req, res) => {
    const { lat, lng } = req.body;
    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }
    // Example response (real integration depends on Gemini AI API)
    res.json({ prediction: `Smart suggestions for Lat: ${lat}, Lng: ${lng}` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});

