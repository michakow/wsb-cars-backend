const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const carRoutes = require('./api/routes/cars');
const userRoutes = require('./api/routes/users');

require('dotenv').config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zqmge.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log('polaczono z db'))
  .catch(() => console.log('nie udalo sie polaczyc z db'));

const port = process.env.PORT | 3000;
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log('Aplikacja wystartowała na porcie', port);
});

app.use('/cars', carRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Serwer działa' });
});
app.use((req, res, next) => {
  res.status(404).json({ message: 'Nie odnaleziono zasobu' });
});
