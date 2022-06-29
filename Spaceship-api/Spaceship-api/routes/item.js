var express = require('express');
var router = express.Router();
var item = require('../models/item');

router.get('/params/:id', async (req, res, next) => {
    const result = await item.findOne({
      id: req.params.id
    })
    return (result) ? res.status(200).json(result) : res.status(200).json({ message: "Not found" });
})

module.exports = router;