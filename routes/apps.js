import express from 'express'
import AppController from '../controllers/app'
const router = express.Router()
const appController = new AppController();

router.post('/', (req, res) =>  {
  appController.postNewItem(req.body, res)
});


router.delete('/:recordId', (req, res) =>  {
  appController.deleteItem(req.params.recordId, res)
});

module.exports = router;
