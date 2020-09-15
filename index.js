const sinon = require('sinon');
const finalizeEach = require('mocha-finalize-each');

module.exports = {
    setupSandbox(mochaContext, config) {
        var sinonSandbox = sinon.createSandbox(config);
        finalizeEach(mochaContext, testPromise => {
          return testPromise.then(() => {
            sinonSandbox.verify();
          })
        });

        mochaContext.afterEach(function() {
            if(sinonSandbox.clock) {
                sinonSandbox.clock.restore();
            }
            sinonSandbox.restore();
        });
        return sinonSandbox;
    }
};
