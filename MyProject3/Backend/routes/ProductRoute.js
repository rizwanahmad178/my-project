import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/Products.js";
import { verifyUser } from "../middleware/AuthUser.js";

import { verifyRoles } from '../middleware/AuthUser.js'; // Import verifyRoles middleware

// app.post('/createNewEmployee', verifyRoles('Admin', 'Editor'), employeesController.createNewEmployee);


const router = express.Router();

router.get('/products',verifyUser, getProducts);
router.get('/products/:id',verifyUser, getProductById);
router.post('/products',verifyRoles('Admin', 'subAdmin'), createProduct);
router.patch('/products/:id',verifyUser, updateProduct);
router.delete('/products/:id',verifyRoles('Admin'), deleteProduct);

export default router;