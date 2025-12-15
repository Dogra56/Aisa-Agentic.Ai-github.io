import express from "express";
import { ideaAnalyzerAgent } from "../agent/ideaAnalyzerAgent.js";

const router = express.Router();

router.post("/analyze-idea", async (req, res) => {
  try {
    const { idea } = req.body;

    const result = await ideaAnalyzerAgent(idea);

    if (result.error) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      analysis: result
    });

  } catch (err) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

export default router;
