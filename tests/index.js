const test = require('ava')
const fetch = require('node-fetch');
const light = require('light');

const index = require('../routes/index');

let server;
test.before(async () => {
  server = await light.test(index);
})
test.after(async () => {
  server.close();
});

test('index responds with JSON', async t => {
	const req = await fetch(server.url);
  const res = await req.json();
  t.is(req.status, 200);
  t.deepEqual(res, {
    hello: 'world',
    this: 'is being tested by ava',
  });
});
