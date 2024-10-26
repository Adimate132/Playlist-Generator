import express from 'express';
const app = express();
const port = 3000

// start server
app.listen(port, () => {
    console.log(
        `Playlist Generator Server listening on port ${port}
        Listening at http://localhost:${port}`
    )
})

// base endpoint
app.get('/', (req, res) => {
  try {
    res.status(200).json({message: "hello from playlist generator server"});
  }
  catch(e) {
    res.status(500).json({error: "You're cooked"});
  }
})