import express from "express";
import {
  getInstitutions,
  addInstitution,
  updateInstitution,
  deleteInstitution,
  getDistrictSummary,
  getGujaratSummary,
} from "../controllers/institutionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getInstitutions);
router.get("/summary", getDistrictSummary);
router.get("/gujarat-summary", getGujaratSummary); // <— add this

// Protected (Admin only)
router.post("/", protect, admin, addInstitution);
router.put("/:id", protect, admin, updateInstitution);
router.delete("/:id", protect, admin, deleteInstitution);

export default router;
