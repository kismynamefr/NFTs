import express from 'express';
import controller from '../controllers/collection';

const router = express.Router();

router.post('/', controller.mintNFT);
router.post('/buyBox', controller.openBox);
router.get('/params/:id', controller.anyFunction);
router.get('/item/:hasSelled', controller.getMarketItem);
router.get('/nameNFTs/:name', controller.getNFTCollection);
router.get('/myNFTs/:owner', controller.getNFTofOwner);

export default router;
