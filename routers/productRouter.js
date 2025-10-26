import express from 'express';
import { createProduct } from '../controller/productController.js';

const Productrouter = express.Router();

Productrouter.post('/products', createProduct);

export default Productrouter;