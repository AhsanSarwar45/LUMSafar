const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);

describe('/test endpoint', () => {
	it('should return a response', async () => {
		const response = await request.get('/test');
		expect(response.status).toBe(200);
		expect(response.text).toBe('Hello world');
	});
});

// describe('/sign_up endpoint', () => {
// 	it('should return a response', async () => {
// 		const response = await request.get('/test');
// 		expect(response.status).toBe(200);
// 		expect(response.text).toBe('Hello world');
// 	});
// });
