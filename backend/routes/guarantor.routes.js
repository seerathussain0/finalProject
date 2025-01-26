import { addGuarantor } from "../controllers/guarantor.controllers.js";
import express from "express"

const router = express.Router();

router.post("/", addGuarantor);

export default router;