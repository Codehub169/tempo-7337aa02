const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyzeController');

// --- Routes for /api/analyze --- 

/**
 * @route   POST /api/analyze
 * @desc    Analyzes a startup idea using AI (currently mocked).
 * @access  Public
 * @body    { "idea": "Your startup idea description" }
 * @returns { 
 *            "swot": { 
 *              "strengths": ["string"],
 *              "weaknesses": ["string"],
 *              "opportunities": ["string"],
 *              "threats": ["string"]
 *            },
 *            "marketFit": "string",
 *            "competitors": "string",
 *            "suggestions": "string"
 *          }
 *          or an error object: { "status": "error", "statusCode": number, "message": "string" }
 */
router.post('/', analyzeController.analyzeIdea);

module.exports = router;
