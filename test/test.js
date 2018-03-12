const mod = require('./../index.js');
const assert = require('assert');

const testHost = 'github.com';

// Why can't we just fake network query? 
// Basically all network stuff is done in another module

describe('url-metadata-fetcher', () => {
  describe('.getInfo', () => {
    it('should accept url with http', (done) => {
      const urlWithHttp = `http://${testHost}`;
      mod.getInfo(urlWithHttp).then((item) => {
        assert.equal(item.url, urlWithHttp);
        done();
      });
    })
    it('should accept url with https', (done) => {
      const urlWithHttps = `https://${testHost}`;
      mod.getInfo(urlWithHttps).then((item) => {
        assert.equal(item.url, urlWithHttps);
        done();
      });
    });
    it('should accept url without http', (done) => {
      const urlJustHost = testHost;
      mod.getInfo(urlJustHost).then((item) => {
        const targetTransform = `http://${urlJustHost}`;
        assert.equal(item.url, targetTransform);
        done();
      });
    })
  });
  describe('.updateInfo', () => {
    it('should not lost id passed with item', (done) => {
      const url = `https://${testHost}`;
      const card = {
        url
      };
      mod.updateInfo(card).then((updatedCard) => {
        assert.equal(updatedCard.url, url);
        done();
      });
    });
  });
});