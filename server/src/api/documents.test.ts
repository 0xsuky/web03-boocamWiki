import * as request from 'supertest';
import { app, startServer } from '../app';
import db from '../services/db-pool';

const dummy = {
  generation: 6,
  boostcamp_id: 'J123',
  name: 'test',
  content: '안녕하세요',
  nickname: '별명',
  location: '지역',
  language: '언어',
  user_image: '프로필',
  mbti: 'ENFJ',
  field: 'FE',
  link: '/gwangmin13',
};

beforeAll(async () => {
  await startServer();
  const key = Object.keys(dummy);
  const value = Object.values(dummy);
  const query = `INSERT IGNORE INTO document (${key.join(', ')}) VALUES(${value.map(() => `?`).join(', ')})`;
  await db.pool.query(query, [...value]);
});

describe('document get 요청', () => {
  it('', (done) => {
    request(app).get('/api/documents?generation=6&boostcamp_id=J123&name=test').then((res) => {
      expect(res.body.result.content).toBe('안녕하세요');
      done();
    })   
  });
});
