var express = require('express');
var router = express.Router();
var collection = require('../models/collection');

router.post('/', (req, res, next) => {
  const formData = req.body;
  const dto = new collection(formData);
  dto.save()
    .then((data) => console.log(data))
    .catch(next)
});
router.post('/buyBox', async (req, res, next) => {
  const { serial, owner } = req.body;
  let result = await collection.findOne({ serial: serial });
  await collection.updateOne({ serial: serial }, { owner: owner });
  await collection.updateOne({ serial: serial }, { hasSelled: true });
  return (result) ? res.status(200).json(result) : res.status(200).json({ message: "Not found" });
});

router.get('/params/:id', async (req, res, next) => {
  const result = await collection.findOne({
    id: req.params.id
  })
  return (result) ? res.status(200).json(result) : res.status(200).json({ message: "Not found" });
})
router.get('/item/:hasSelled', async (req, res, next) => {
  const data = req.params.hasSelled;
  const result = await collection.find({
    hasSelled: data
  });
  return (result) ? res.status(200).json(result) : res.status(200).json({ message: "Not found" });
})
router.get('/nameNFTs/:name', async (req, res, next) => {
  const result = await collection.find({
    name: req.params.name
  });
  return res.status(200).json(result);
})
router.get('/myNFTs/:owner', async (req, res, next) => {
  const result = await collection.find({
    owner: req.params.owner
  });
  return (result) ? res.status(200).json(result) : res.status(200).json({ message: "Not found" });
})

module.exports = router;