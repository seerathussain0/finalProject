import express from 'express'
import generateSlip from "../controllers/slip.controllers.js"
const router = express.Router();

router.get('/:token', generateSlip);

export default router;