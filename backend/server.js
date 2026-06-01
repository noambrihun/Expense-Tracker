const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const routes = require('./routes/routes');
dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/expenses', routes);
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the expense tracker API' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 