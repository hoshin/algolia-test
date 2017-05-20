import { assert } from 'chai'
import sinon from 'sinon'
import AppController from '../controllers/appStore'

describe('App Controller', () => {
  let appController
  beforeEach(() => {
    appController = new AppController()
  })
  describe('when posting a new app (postNewItem)', () => {
    it('should call the addObject function w/ actual object data as 1st param', done => {
      //setup
      const res = { send: sinon.stub() }
      const addObjectStub = sinon.stub().returns(Promise.resolve({some:'status message'}))
      appController.index = {addObject: addObjectStub}
      //action
      appController.postNewItem({json: 'data', describing:'new record'}, res)
      .then(() => {
        //assert
        assert.equal(appController.index.addObject.calledOnce, true)
        assert.deepEqual(appController.index.addObject.getCall(0).args[0], {json: 'data', describing:'new record'})
        done()
      })
      .catch(done)
    })

    it('should use algolia status codes if addObject triggers an error', done => {
      //setup
      const statusStub = { send: sinon.stub() }
      const res = { status: sinon.stub().returns(statusStub) }
      //action
      appController.postNewItem(undefined, res)
      .then(() => {
        //assert
        assert.equal(res.status.calledOnce, true)
        assert.equal(res.status.getCall(0).args[0], 400)
        assert.equal(statusStub.send.calledOnce, true)
        assert.deepEqual(statusStub.send.getCall(0).args[0], { errorMessage: 'No content in POST request' })
        done()
      })
      .catch(done)
    })

    it('should return a 500 error to the client if algoliaindex addObject throws an error different from AlgoliaSearchError', done => {
      //setup
      const statusStub = { send: sinon.stub() }
      const res = { status: sinon.stub().returns(statusStub) }
      const addObjectStub = sinon.stub().returns(Promise.reject(new Error('oops')))
      appController.index = {addObject: addObjectStub}
      //action
      appController.postNewItem({}, res)
      .then(() => {
        //assert
        assert.equal(res.status.calledOnce, true)
        assert.equal(res.status.getCall(0).args[0], 500)
        assert.equal(statusStub.send.calledOnce, true)
        assert.deepEqual(statusStub.send.getCall(0).args[0], { errorMessage: 'oops' })
        done()
      })
      .catch(done)
    })

    it('should return a resolved "ok" status if addObject runs w/out issues', done => {
      //setup
      const res = { send: sinon.stub() }
      const addObjectStub = sinon.stub().returns(Promise.resolve({some:'status message'}))
      appController.index = {addObject: addObjectStub}
      //action
      appController.postNewItem(null, res)
      .then(() => {
        //assert
        assert.equal(res.send.calledOnce, true)
        assert.deepEqual(res.send.getCall(0).args[0], {some:'status message'})
        done()
      })
      .catch(done)
    })
  })

  describe('when deleting a record', () => {
    it('should call the deleteObject function w/ actual object data as 1st param', done => {
      //setup
      const res = { send: sinon.stub() }
      const deleteObjectStub = sinon.stub().returns(Promise.resolve({some:'status message'}))
      appController.index = {deleteObject: deleteObjectStub}
      //action
      appController.deleteItem({json: 'data', describing:'new record'}, res)
      .then(() => {
        //assert
        assert.equal(appController.index.deleteObject.calledOnce, true)
        assert.deepEqual(appController.index.deleteObject.getCall(0).args[0], {json: 'data', describing:'new record'})
        done()
      })
      .catch(done)
    })

    it('should use algolia status codes if deleteObject triggers an error', done => {
      //setup
      const statusStub = { send: sinon.stub() }
      const res = { status: sinon.stub().returns(statusStub) }
      //action
      appController.deleteItem(undefined, res)
      .then(() => {
        //assert
        assert.equal(res.status.calledOnce, true)
        assert.equal(res.status.getCall(0).args[0], 400)
        assert.equal(statusStub.send.calledOnce, true)
        assert.deepEqual(statusStub.send.getCall(0).args[0], { errorMessage: 'Cannot delete an object without an objectID' })
        done()
      })
      .catch(done)
    })

    it('should return a 500 error to the client if algoliaindex deleteObject throws an error different from AlgoliaSearchError', done => {
      //setup
      const statusStub = { send: sinon.stub() }
      const res = { status: sinon.stub().returns(statusStub) }
      const deleteObjectStub = sinon.stub().returns(Promise.reject(new Error('oops')))
      appController.index = {deleteObject: deleteObjectStub}
      //action
      appController.deleteItem({}, res)
      .then(() => {
        //assert
        assert.equal(res.status.calledOnce, true)
        assert.equal(res.status.getCall(0).args[0], 500)
        assert.equal(statusStub.send.calledOnce, true)
        assert.deepEqual(statusStub.send.getCall(0).args[0], { errorMessage: 'oops' })
        done()
      })
      .catch(done)
    })

    it('should return a resolved "ok" status if deleteObject runs w/out issues', done => {
      //setup
      const res = { send: sinon.stub() }
      const deleteObjectStub = sinon.stub().returns(Promise.resolve({some:'status message'}))
      appController.index = {deleteObject: deleteObjectStub}
      //action
      appController.deleteItem(null, res)
      .then(() => {
        //assert
        assert.equal(res.send.calledOnce, true)
        assert.deepEqual(res.send.getCall(0).args[0], {some:'status message'})
        done()
      })
      .catch(done)
    })
  })
})