const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.json([
        {
            id: 1,
            text: 'Hello'
        },
        {
            id: 2,
            text: 'Bye'
        },
    ]);
});

module.exports = router;