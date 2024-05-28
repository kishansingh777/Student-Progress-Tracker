import express from "express";
import {
  addSemesterMarks,
  addTermTestOne,
  addTermTestTwo,
} from "../controllers/marks.js";

const router = express.Router();

router.put("/term-test-one", addTermTestOne);
router.put("/term-test-two", addTermTestTwo);
router.put("/semester", addSemesterMarks);

export default router;
