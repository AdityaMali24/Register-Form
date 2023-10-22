import express from "express";
import { AddApplicant, DeleteApplicant, getAllApplicant } from "../controllers/applicant.controller";

const router = express.Router();

router.get("/get-all-applicant", getAllApplicant);
router.post("/add-applicant", AddApplicant);
router.delete("/delete-applicant/:applicant_id", DeleteApplicant)

export default router;