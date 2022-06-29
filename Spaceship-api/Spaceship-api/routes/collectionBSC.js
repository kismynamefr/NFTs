var express = require('express');
var router = express.Router();
var collection = require('../models/collectionBSC');

router.post('/', (req, res, next) => {
    const formData = req.body;
    const dto = new collection(formData);
    dto.save()
      .then((data) => console.log(data))
      .catch(next)
});
router.put('/put/:id/:owner/:addressContract', async(req, res, next) => {
  const {id, owner, addressContract} = req.params;
  await collection.findOneAndUpdate({owner: `${addressContract}`}, { owner: `${owner}`}, {
    new: true,
    upsert: true
  })
  const nft = await collection.findOne({
    id: id,
  })
  return res.status(200).json(nft);
});

router.get('/params/:id', async (req, res, next) => {
    const result = await collection.findOne({
      id: req.params.id
    })
    return (result) ? res.status(200).json(result) : res.status(200).json({ message: "Not found" });
})

module.exports = router;