import express from "express";
import {applyJob} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/",applyJob);

export default router;