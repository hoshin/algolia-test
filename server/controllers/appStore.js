import algoliasearch from 'algoliasearch'
import { AlgoliaSearchError } from 'algoliasearch/src/errors'
import config from '../config/base'

class AppController {
  constructor () {
    const client = algoliasearch(config.algolia.accountId, config.algolia.privateKey)
    this.index = client.initIndex('inferno')
  }

  postNewItem (jsonData, res) {
    return this.index.addObject(jsonData)
    .then(data => {
      return Promise.resolve(res.send(data))
    })
    .catch(err => {
      if (err instanceof AlgoliaSearchError) {
        return Promise.resolve(res.status(err.statusCode).send({ errorMessage: err.message }))
      } else {
        return Promise.resolve(res.status(500).send({ errorMessage: err.message }))
      }
    })
  }

  deleteItem (itemId, res) {
    return this.index.deleteObject(itemId)
    .then(data => {
      return Promise.resolve(res.send(data))
    })
    .catch(err => {
      if (err instanceof AlgoliaSearchError) {
        return Promise.resolve(res.status(err.statusCode || 400).send({ errorMessage: err.message }))
      } else {
        return Promise.resolve(res.status(500).send({ errorMessage: err.message }))
      }
    })
  }
}

export default AppController
