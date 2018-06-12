import { redis, redisAsync, redisMulti } from './utils';
import Redis from 'redis';

it('redis', done => {
  redis()
    .multi()
    .set('foo', '1')
    .get('foo')
    .exec((err, reply) => {
      Redis.print(err, reply);
      done();
    });
});

it('redisAsync', async () => {
  const ret = await new Promise(resolve => {
    redis()
      .multi()
      .set('foo', '1')
      .get('foo')
      .exec((err, reply) => {
        resolve(reply);
      });
  });

  console.log('ret:', ret);
  return ret;
});

it('redisAsync2', async () => {
  const ret = await redisMulti()
    .set('foo', '1')
    .get('foo')
    .execAsync();

  console.log('ret:', ret);
  return ret;
});

it('redisStream', async () => {
  const ret = await redisAsync().sendCommandAsync('XADD', [
    's1',
    '*',
    'k1',
    'v1',
    'k1',
    'v2'
  ]);
  console.log('ret:', ret);

  const range = await redisAsync().sendCommandAsync('XRANGE', ['s1', '-', '+']);
  console.log('range:', range);

  const [[_, read]] = await redisAsync().sendCommandAsync('XREAD', [
    'STREAMS',
    's1',
    0
  ]);
  console.log('read:', read);

  const [[_b, block]] = await redisAsync().sendCommandAsync('XREAD', [
    'BLOCK',
    0,
    'STREAMS',
    's1',
    '$'
  ]);
  console.log('block:', block);

  return 0;
});
