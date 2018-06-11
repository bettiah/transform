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
