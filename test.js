const sinonMocha = require('./');
const finalizeEach = require('mocha-finalize-each');
const { expect } = require('chai')

describe('sinon-mocha', function() {
  const sinon = sinonMocha.setupSandbox(this);
  
  // this suite needs to be run as a whole
  describe('individual failures', function() {  
    let counter = 0;
    finalizeEach(this, promise => {
      counter += 1;
      return promise.then(() => {
        throw new Error('should have called at least once');
      }).catch(err => {
        if(err.message.match(/expected spy to be called once but was called 0 times/)) {
          return;
        }
        throw err;
      });
    });
    
    it('should fail test once', function() {
      var spy = sinon.spy();
      sinon.assert.calledOnce(spy);
    });
    
    it('should fail test second time', function() {
      var spy = sinon.spy();
      sinon.assert.calledOnce(spy);
    });    
    
    after(function() {
      expect(counter).to.be.equal(2);
    });
  });
  
  // this suite needs to be run as a whole
  describe('cleans up stubs after each test', function() {
    var obj = {
      method() {
        return true;
      }
    };
    
    it('setups stub', function() {
      sinon.stub(obj, 'method').callsFake(() => false);
      expect(obj.method()).to.be.false;
    });
    
    it('uses original stub', function() {
      expect(obj.method()).to.be.true;
    });
  });
});
