const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); 

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors()); 

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api', authRoutes, productRoutes, categoriesRoutes, orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
