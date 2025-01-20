# API Documentation

## Overview
This API provides endpoints for image processing using a machine learning model. It supports both direct processing (synchronous) and queued processing (asynchronous) approaches.

## Base URL
```
http://localhost:5010
```

## Endpoints

### 1. Direct Processing API
**Endpoint:** `/api/predict`  
**Method:** POST  
**Description:** Synchronously processes the uploaded file and returns results immediately.

#### Request
- Content-Type: multipart/form-data

##### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| file | File | Yes | - | ZIP file containing images to process |
| input_type | String | No | "0" | Input type for processing |
| classification_threshold | String | No | "0.35" | Classification confidence threshold |
| prediction_threshold | String | No | "0.5" | Prediction confidence threshold |
| save_labeled_image | String | No | "false" | Whether to save labeled images ("true"/"false") |
| output_type | String | No | "0" | Output format type |
| yolo_model_type | String | No | "n" | YOLO model type to use |

#### Response
- Success (200): Returns ZIP file containing results
- Error (400, 500): Returns JSON with error message

```json
{
    "error": "Error message"
}
```

### 2. Web Processing API (Queued)
**Endpoint:** `/web/predict`  
**Method:** POST  
**Description:** Asynchronously processes the uploaded file with progress tracking.

#### Request
- Content-Type: multipart/form-data

##### Parameters
Same as Direct Processing API

#### Response
- Success (200):
```json
{
    "task_id": "uuid-string",
    "message": "Task queued successfully"
}
```
- Error (400, 500, 503):
```json
{
    "error": "Error message"
}
```

### 3. Task Status
**Endpoint:** `/web/status/<task_id>`  
**Method:** GET  
**Description:** Get the status and progress of a queued task.

#### Response
- Success (200):
```json
{
    "status": "queued|processing|completed|failed",
    "progress": 0-100,
    "stage": "Current processing stage",
    "download_token": "jwt-token" // Only when completed
}
```

##### Processing Stages
| Stage | Progress | Description |
|-------|----------|-------------|
| Initializing | 5% | Task setup and initialization |
| Extracting files | 10% | Extracting files from uploaded ZIP |
| Initializing model | 20% | Loading and preparing the model |
| Processing images | 40% | Initial image processing |
| Segmenting images | 60% | Image segmentation |
| Creating bounding boxes | 70% | Generating bounding boxes |
| Saving results | 80% | Saving processed results |
| Creating ZIP file | 90% | Compressing results |
| Completed | 100% | Processing complete |

- Error (404):
```json
{
    "error": "Task not found"
}
```

### 4. Download Results
**Endpoint:** `/download/<token>`  
**Method:** GET  
**Description:** Download the processed results using a valid token.

#### Response
- Success (200): Returns ZIP file containing results
- Error (401, 404, 500):
```json
{
    "error": "Error message"
}
```

## Error Codes
- 200: Success
- 400: Bad Request (invalid input)
- 401: Unauthorized (invalid token)
- 404: Not Found (task/files not found)
- 500: Internal Server Error
- 503: Service Unavailable (queue full)

## File Requirements
- Only ZIP files are accepted
- Maximum queue size: 10 concurrent tasks
- Results are stored for 2 hours before automatic cleanup

## Example Usage

### Direct API (Python)
```python
import requests

url = "http://localhost:5010/api/predict"
files = {
    'file': open('images.zip', 'rb')
}
data = {
    'input_type': '0',
    'classification_threshold': '0.35',
    'prediction_threshold': '0.5',
    'save_labeled_image': 'false',
    'output_type': '0',
    'yolo_model_type': 'n'
}

response = requests.post(url, files=files, data=data)
if response.status_code == 200:
    with open('result.zip', 'wb') as f:
        f.write(response.content)
```

### Web API (Python with Progress Tracking)
```python
import requests
import time

# Step 1: Submit task
url = "http://localhost:5010/web/predict"
files = {
    'file': open('images.zip', 'rb')
}
data = {
    'input_type': '0',
    'classification_threshold': '0.35'
}

response = requests.post(url, files=files, data=data)
task_id = response.json()['task_id']

# Step 2: Track progress
while True:
    status_response = requests.get(f"http://localhost:5010/web/status/{task_id}")
    status_data = status_response.json()
    
    if status_data['status'] == 'completed':
        print(f"Task completed!")
        # Step 3: Download results
        download_token = status_data['download_token']
        download_response = requests.get(f"http://localhost:5010/download/{download_token}")
        with open('result.zip', 'wb') as f:
            f.write(download_response.content)
        break
    elif status_data['status'] == 'failed':
        print(f"Error: {status_data.get('error')}")
        break
    else:
        print(f"Progress: {status_data['progress']}% - {status_data['stage']}")
        
    time.sleep(1)  # Wait before next check
``` 