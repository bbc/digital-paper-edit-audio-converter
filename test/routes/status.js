const server = require('../..');
const request = require('supertest');

describe('GET /status', () => {
  it('returns a 200', (done) => {
    request(server)
      .get('/status')
      .expect(200, done);
  });
});
