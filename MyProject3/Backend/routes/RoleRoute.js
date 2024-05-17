import express from "express";
import {
    getRoles,
    createRoles,
} from "../controllers/Roles.js";
// import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/roles', getRoles);
router.post('/roles', createRoles);


export default router;