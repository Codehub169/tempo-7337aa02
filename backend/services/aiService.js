const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const logger = require('../utils/logger');

const API_KEY = process.env.AI_API_KEY;

if (!API_KEY) {
  logger.error('AI_API_KEY is not defined in environment variables. AI service will not function.');
  // Optionally, throw an error here to prevent the application from starting without AI capabilities,
  // or allow it to run with AI features disabled (current behavior).
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-pro' }) : null;

/**
 * Generates a startup idea analysis using Google Generative AI.
 * @param {string} idea - The startup idea text.
 * @returns {Promise<object>} A promise that resolves to an object containing SWOT analysis,
 * market fit, competitor overview, and refinement suggestions.
 * @throws {Error} If the AI service fails to generate an analysis or if the API key is missing.
 */
async function generateAnalysis(idea) {
  if (!model) {
    logger.error('AI model not initialized due to missing API key.');
    // Simulate the structure of a successful response but with error messages
    // This allows the frontend to still render the sections, but with clear indications of the problem.
    return {
      swot: {
        strengths: ['AI Service Error: API Key missing or invalid.'],
        weaknesses: ['Unable to perform SWOT analysis.'],
        opportunities: ['Check backend configuration.'],
        threats: ['AI features are currently unavailable.'],
      },
      marketFit: 'AI Service Error: Could not generate market fit analysis. API Key missing or invalid.',
      competitorOverview: 'AI Service Error: Could not generate competitor overview. API Key missing or invalid.',
      refinementSuggestions: ['Ensure the AI_API_KEY is correctly set in the .env file on the backend.'],
    };
  }

  const prompt = `
    Analyze the following startup idea and provide a comprehensive evaluation. The idea is:
    "${idea}"

    Please return the analysis STRICTLY in the following JSON format:
    {
      "swot": {
        "strengths": ["strength 1", "strength 2", ...],
        "weaknesses": ["weakness 1", "weakness 2", ...],
        "opportunities": ["opportunity 1", "opportunity 2", ...],
        "threats": ["threat 1", "threat 2", ...]
      },
      "marketFit": "Detailed market fit analysis text... (around 100-200 words)",
      "competitorOverview": "Overview of potential competitors or existing solutions... (around 100-200 words)",
      "refinementSuggestions": ["actionable suggestion 1", "actionable suggestion 2", ...]
    }

    Ensure the analysis is insightful, critical, and constructive. Provide at least 2-3 points for each SWOT category and 2-3 refinement suggestions.
    The marketFit and competitorOverview sections should be concise paragraphs.
  `;

  try {
    logger.info(`Sending request to AI for idea: "${idea.substring(0, 50)}..."`);

    const generationConfig = {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const result = await model.generateContent([
      { text: prompt }
    ], generationConfig, safetySettings);
    
    const response = result.response;
    const responseText = response.text();
    
    logger.info('Successfully received response from AI.');
    // logger.debug('AI Raw Response Text:', responseText); // Uncomment for debugging AI output

    // Attempt to parse the JSON response from the AI
    // The AI can sometimes return markdown 
    let jsonResponseText = responseText.trim();
    if (jsonResponseText.startsWith('```json')) {
      jsonResponseText = jsonResponseText.substring(7);
    }
    if (jsonResponseText.endsWith('```')) {
      jsonResponseText = jsonResponseText.substring(0, jsonResponseText.length - 3);
    }
    
    const analysis = JSON.parse(jsonResponseText);
    return analysis;

  } catch (error) {
    logger.error('Error generating AI analysis:', error);
    if (error.response && error.response.promptFeedback) {
      logger.error('AI Prompt Feedback:', error.response.promptFeedback);
    }
    // Provide a structured error for the frontend to display gracefully
    return {
        swot: {
          strengths: ['AI Service Error: Could not process request.'],
          weaknesses: [error.message || 'Unknown error from AI service.'],
          opportunities: ['Please try again later.'],
          threats: ['If the problem persists, contact support.'],
        },
        marketFit: `AI Service Error: ${error.message || 'Failed to generate market fit analysis.'}`,
        competitorOverview: `AI Service Error: ${error.message || 'Failed to generate competitor overview.'}`,
        refinementSuggestions: ['Check the backend logs for more details.'],
        error: true, // Flag to indicate an error occurred
        errorMessage: error.message || 'An unexpected error occurred while communicating with the AI service.'
      };
  }
}

module.exports = { generateAnalysis };
