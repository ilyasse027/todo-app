const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app, connectDB } = require('../../src/index'); // Import app and connectDB

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB and set the URI for testing
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongoServer.getUri();

  // Connect to in-memory MongoDB before tests
  await connectDB();
}, 15000);

afterAll(async () => {
  // Disconnect and stop in-memory MongoDB after tests
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Todo API Tests', () => {
  test('GET /api/todos should return empty array initially', async () => {
    const response = await request(app)
      .get('/api/todos')
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  test('POST /api/todos should create new todo', async () => {
    const todoData = {
      title: 'Test Todo',
      description: 'Test Description',
      deadline: new Date().toISOString(),
    };

    const response = await request(app)
      .post('/api/todos')
      .send(todoData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(todoData.title);
    expect(response.body.description).toBe(todoData.description);
  });
});
