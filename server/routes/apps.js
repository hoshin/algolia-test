import express from 'express'
import AppStoreController from '../controllers/appStore'
const router = express.Router()
const appStoreController = new AppStoreController()

router.post('/', (req, res) => {
  appStoreController.postNewItem(req.body, res)
})

router.delete('/:recordId', (req, res) => {
  appStoreController.deleteItem(req.params.recordId, res)
})

module.exports = router
