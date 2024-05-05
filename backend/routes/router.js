import { Router } from "express";
import run from "../controller/gemini.js";

const router = Router();

router.post("/ai", run);

export default router;
