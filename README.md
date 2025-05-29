# Startup Idea Analyzer

## Goal

The Startup Idea Analyzer is a web application designed to provide aspiring entrepreneurs with rapid, AI-driven feedback on their startup concepts. Users can input their idea and receive a comprehensive analysis including SWOT, estimated market fit, a competitor overview, and actionable suggestions for refinement.

This tool aims to:
- Offer quick, structured, and objective insights for idea validation.
- Help users identify potential challenges and opportunities.
- Provide a preliminary understanding of market viability and competitive landscape.
- Transform raw ideas into more concrete, evaluated concepts.

## Features

- **Idea Submission**: A simple interface to enter and submit startup ideas.
- **AI-Driven SWOT Analysis**: Identifies Strengths, Weaknesses, Opportunities, and Threats related to the idea.
- **Estimated Market Fit Analysis**: Assesses alignment with market needs and trends.
- **Competitor Overview**: Provides a brief on potential competitors.
- **Refinement Suggestions**: Offers AI-generated tips to improve the idea.
- **Loading State Management**: Clear visual feedback during AI processing.
- **Structured Results Display**: Presents analysis in an organized, readable format.

## Tech Stack

- **Frontend**: React 18+, Tailwind CSS, Headless UI
- **Backend**: Node.js, Express.js
- **AI Integration**: Google Gemini (via API)
- **Deployment**: Vercel (Frontend - for development/preview), Backend runs on Node.js server (can be deployed to AWS Lambda, Google Cloud Functions, etc.)

## Project Structure

```
startup-idea-analyzer/
	
	
	
	
	
	
		
		
		
		
		
		
		
		
		
		
		
		
		
			
			
			
			
				
					
				
				
				
				
			
			
			
			
			
			
		
		
		
	
	
```

## Getting Started

### Prerequisites

- Node.js (v18.x or later recommended)
- npm (v9.x or later recommended)
- Access to Google Gemini API and a `GOOGLE_API_KEY`.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd startup-idea-analyzer
    ```

2.  **Configure Backend Environment Variables:**
    Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
    Edit `.env` and add your `GOOGLE_API_KEY`:
    ```
    GOOGLE_API_KEY=your_actual_google_api_key
    # You can also specify a PORT if you don't want the default 3001 for backend dev, 
    # but startup.sh will run it on 9000 for production-like serving.
    # PORT=3001 
    ```
    Return to the project root:
    ```bash
    cd ..
    ```

3.  **Make `startup.sh` executable:**
    ```bash
    chmod +x startup.sh
    ```

4.  **Run the startup script:**
    This script will install dependencies for both frontend and backend, build the frontend, and start the backend server which serves the application.
    ```bash
    ./startup.sh
    ```

5.  **Access the application:**
    Open your browser and navigate to `http://localhost:9000`.

### Development

**Frontend:**

Navigate to `frontend` directory (`cd frontend`).
-   Install dependencies: `npm install`
-   Start development server: `npm start` (usually runs on `http://localhost:3000`)

**Backend:**

Navigate to `backend` directory (`cd backend`).
-   Install dependencies: `npm install`
-   Start development server: `npm run dev` (or `node server.js`, often on `http://localhost:3001` as per typical Express setup, ensure `.env` has `PORT=3001` for dev if not using the default).

**Note on API Proxying during Development:**
When running frontend and backend dev servers separately, you'll need to configure proxying in the frontend's `package.json` (for Create React App) or `vite.config.js` (for Vite) to forward API requests from the frontend dev server (e.g., `localhost:3000/api/*`) to the backend server (e.g., `localhost:3001/api/*`) to avoid CORS issues. The `apiService.js` will be configured to use relative paths like `/api/analyze`, which works well with proxying and when the backend serves the frontend in production.

## UX Enhancement Specifications

-   **Loading States**: Skeleton screens or refined spinners during AI analysis.
-   **Micro-animations**: Subtle transitions for a polished feel.
-   **Responsive Design**: Mobile-first approach with Tailwind CSS.
-   **Accessibility**: WCAG 2.1 AA compliance considerations.

## Contributing

Contributions are welcome! Please follow standard Git workflow (fork, branch, pull request).

## License

This project is licensed under the MIT License - see the LICENSE file for details (if one is created).
