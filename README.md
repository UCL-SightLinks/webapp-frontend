# SightLinks Web Application Frontend

SightLinks is a web application that provides image processing capabilities using machine learning models. This repository contains the frontend of the application built with React.

## Features

- Upload and process ZIP files containing images
- Track processing progress with real-time updates
- Download processed results
- Various image processing options
- API documentation and guides
- Algorithm explanation and guides
- GitHub setup instructions

## Getting Started

### Prerequisites

- Node.js (v18.x or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/UCL-SightLinks/webapp-frontend.git
   cd webapp-frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up environment variables:
   Create or modify the following files based on your environment:

   - `.env` - Base environment variables
   - `.env.development` - Development-specific variables
   - `.env.production` - Production-specific variables

   Example `.env.development`:

   ```
   CI=false
   GENERATE_SOURCEMAP=false
   REACT_APP_API_URL=/api
   ```

### Running Locally

Start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

Build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Deployment

### Azure Static Web Apps

This application is configured for deployment to Azure Static Web Apps.

1. Set up your Azure Static Web App resource in Azure Portal.
2. Configure GitHub Actions for CI/CD by connecting your repository to Azure Static Web Apps.
3. Ensure your `staticwebapp.config.json` is properly set up:

   ```json
   {
     "platform": {
       "apiRuntime": "node:18"
     },
     "globalHeaders": {
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "GET, POST, PUT"
     },
     "buildProperties": {
       "skipBuildDuringDeploy": false,
       "apiBuildCommand": "npm run build",
       "outputLocation": "build"
     },
     "routes": [
       {
         "route": "/*",
         "serve": "/index.html",
         "statusCode": 200
       }
     ]
   }
   ```
4. Push changes to your repository to trigger the deployment pipeline.

## Configuration

### Environment Variables

The application uses the following environment variables:


| Variable              | Description                      | Default                |
| --------------------- | -------------------------------- | ---------------------- |
| REACT_APP_API_URL     | Base URL for API calls           | /api                   |
| CI                    | Disable CI environment for build | false                  |
| GENERATE_SOURCEMAP    | Generate source maps             | false                  |
| SKIP_PREFLIGHT_CHECK  | Skip dependency checking         | true                   |
| DISABLE_ESLINT_PLUGIN | Disable ESLint during build      | true                   |
| INLINE_RUNTIME_CHUNK  | Inline runtime chunk in HTML     | false (for production) |

### API Configuration

The API configuration can be found in `src/pages/Processing.js`. You can modify the `API_CONFIG` object to change the API endpoints:

```javascript
const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || 'https://sightlinks.org/api',
  endpoints: {
    webPredict: '/web/predict',
    status: '/web/status',
    download: '/download',
    cancel: '/web/cancel',
    serverStatus: '/server-status'
  }
};
```

## Application Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Application pages
│   ├── About.js           # About page
│   ├── AlgorithmGuide.js  # Algorithm documentation
│   ├── ApiDocs.js         # API documentation
│   ├── Documentation.js   # Main documentation
│   ├── GitHubSetup.js     # GitHub setup guide
│   ├── Home.js            # Home page
│   └── Processing.js      # Main processing page
├── App.js          # Main application component
├── index.js        # Application entry point
└── theme.js        # Material UI theme configuration
```

## Main Functions

### Image Processing

The application allows users to process images by:

1. Uploading a ZIP file containing images
2. Configuring processing parameters
3. Submitting for processing
4. Tracking processing progress
5. Downloading results

### Processing Parameters

Users can configure multiple parameters:

- Input type
- Classification threshold
- Prediction threshold
- Save labeled images option
- Output type
- YOLO model type

### API Integration

The frontend connects to a backend API that provides:

- Asynchronous processing with progress tracking
- Direct download of processed results
- Server status monitoring

## API Documentation

For detailed API documentation, refer to the API.md file or visit the `/api-docs` page in the application.
