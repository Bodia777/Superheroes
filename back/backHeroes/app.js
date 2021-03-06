const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const heroesRouter = require('./routes/heroesRouter');
const morgan = require('morgan');


mongoose.connect('mongodb://localhost:27017/heroes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
let app = express();
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/heroes', heroesRouter);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status=404;
    error.message = 'wrong href';
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error, 'ERROR<<<<<');
 res.status(error.status || 500);
 res.json({
     error: {message: error.message}
    })
});

app.listen(3000, () => {
    console.log('listening3000...')
});
