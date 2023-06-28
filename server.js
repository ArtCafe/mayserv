const path = require('path');
const express = require('express');
const bodyParser = require ('body-parser');
const colors = require('colors');
const cors = require('cors')
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));



app.use('/public', express.static('public'));
app.use('./uploads', express.static(path.resolve('uploads')))



   
app.use('/api/comments', require('./routes/commentsRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/dashboard', require('./routes/adminRoutes'));
// Serve frontend

  app.get('/', (req, res) => res.send('Please set to production'));

app.use(errorHandler);


app.listen(port, () => console.log(`Server started on port ${port}`));

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
/*
app.use((req, res, next) => {  
  // Error goes via `next()` method
  setImmediate(() => {
      next(new Error('Something went wrong'));
  });
});
*/



//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTU1MTYwNDVkNTFmNGY4NmZmZmFkMSIsImlhdCI6MTY4NzYzMjE2NiwiZXhwIjoxNjkwMjI0MTY2fQ.YFW37OTQFIZcBSiXL-WbSFMWB2sjQzcWM44VmBgcC1A"