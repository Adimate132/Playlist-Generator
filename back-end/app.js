import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import qs from 'qs';

const app = express();

// Middleware to fetch the access token
const fetchAccessToken = async (req, res, next) => {
    try {
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            },
            body: qs.stringify({
                grant_type: 'client_credentials',
            }),
        });

        if (!tokenResponse.ok) {
            return res.status(401).json({ error: 'Failed to obtain access token' });
        }

        const { access_token } = await tokenResponse.json();

        // Attach the access token to the request object
        req.accessToken = access_token;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error fetching access token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Load environment variables
dotenv.config();


// Start server
const port = process.env.PORT || 3001; // Default to 3000 if PORT is undefined
app.listen(port, () => {
  console.log(
      `Playlist Generator Server listening on port ${process.env.PORT}
    Listening at ${process.env.DEVELOPMENT_BASE_URL}`
  );
});

// Base endpoint
app.get('/', (req, res) => {
    try {
        res.status(200).json({ message: "Hello from playlist generator server" });
    } catch (e) {
        res.status(500).json({ error: "You're cooked" });
    }
});

// Example endpoint to demonstrate the use of the access token
app.get('/api/albums/:id', fetchAccessToken, async (req, res) => {
    try {
        const { id } = req.params;
        const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${req.accessToken}`, // Use the token from middleware
            },
        });

        if (!albumResponse.ok) {
            return res.status(albumResponse.status).json({ error: 'Failed to fetch album data' });
        }

        const albumData = await albumResponse.json();
        res.json(albumData);
    } catch (error) {
        console.error('Error fetching album data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
