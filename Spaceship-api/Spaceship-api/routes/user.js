var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', async (req, res, next) => {
  const formData = req.body;
  const dto = new User(formData);
  const result = await User.findOne({
    address: formData.address
  })
  if (result) return
  dto.save()
    .then((data) => console.log(data))
    .catch(next)
});

router.get('/params/:address', async (req, res, next) => {
  const result = await User.findOne({
    address: req.params.address
  })
  return (result) ? res.status(200).json(result) : res.status(200).json({ message: "Not found" });
})

router.post('/fixed', async (req, res, next) => {
  const form = await req.body;
  const newForm = form.item
  const address = form.address
  const result = await User.findOne({
    address: address
  })
  await User.findOneAndUpdate({ item: result.item }, { item: newForm }, {
    new: true,
    upsert: true
  })
  const resultAfterUpdate = await User.findOne({
    address: address
  })
  return (resultAfterUpdate) ? res.status(200).json(resultAfterUpdate) : res.status(200).json({ message: "Not found" })
})

router.get('/', async (req, res, next) => {
  const data = await User.find();
  return (data) ? res.status(200).json(data) : res.status(200).json({ message: "Not found" });
})

module.exports = router;