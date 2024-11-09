const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

// Load environment variables
dotenv.config();

// Log MongoDB URI for debugging purposes
console.log('MongoDB URI:', process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json());

// Use routes for todos
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Export the app and connectDB function separately
module.exports = { app, connectDB };

// Only connect and start the server if this file is run directly
if (require.main === module) {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
