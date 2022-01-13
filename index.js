const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const authUser = require('./routes/users');
const movieRoute = require('./routes/movies');
const listRoute = require('./routes/lists');
dotenv.config();

//  kết nối mongo db
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfully'))
  .catch((err) => console.log(err));

// connect express
app.use(express.json());

// tạo ra endpoint cho client gọi tới
app.use('/api/auth', authRoute);
app.use('/api/users', authUser);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);

app.listen(8800, () => {
  console.log('Backend server is running');
});
