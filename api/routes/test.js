// api/routes/test.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("hi i am here");
    res.send('Test route');
});

module.exports = router;
