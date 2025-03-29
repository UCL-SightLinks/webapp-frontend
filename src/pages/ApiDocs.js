import React from 'react';
import { 
  Container, Typography, Box, Tabs, Tab, Chip, Alert, 
  IconButton, Tooltip, Button, List, ListItem 
} from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Lock, Send, Api, Storage, Speed,
  ContentCopy as CopyIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { GlassPaper, PageContainer, PageTitle, PageSubtitle } from '../components/StyledComponents';

const EndpointCard = styled(GlassPaper)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
  }
}));

const MethodChip = styled(Chip)(({ method, theme }) => ({
  fontWeight: 600,
  backgroundColor: 
    method === 'GET' ? 'rgba(9, 132, 227, 0.1)' :
    method === 'POST' ? 'rgba(0, 184, 148, 0.1)' :
    'rgba(253, 121, 168, 0.1)',
  color:
    method === 'GET' ? '#0984E3' :
    method === 'POST' ? '#00B894' :
    '#FD79A8',
  borderRadius: '8px',
  padding: '4px 8px',
  '& .MuiChip-label': {
    padding: '4px 8px',
  }
}));

const CodeBlock = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  fontFamily: 'monospace',
  position: 'relative',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, 0.05)',
  '&:hover .copy-button-container': {
    opacity: 1,
  }
}));

const CopyButtonContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: theme.spacing(1),
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CopyButton = styled(IconButton)(({ theme, copied }) => ({
  backgroundColor: copied ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(4px)',
  color: copied ? '#4caf50' : theme.palette.text.secondary,
  borderRadius: '10px',
  transition: 'all 0.2s ease-in-out',
  width: '38px',
  height: '38px',
  border: copied ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(0, 0, 0, 0.08)',
  '&:hover': {
    backgroundColor: copied ? 'rgba(76, 175, 80, 0.25)' : 'rgba(255, 255, 255, 1)',
    transform: 'translateY(-2px)',
    boxShadow: copied 
      ? '0 4px 12px rgba(76, 175, 80, 0.2)' 
      : '0 4px 12px rgba(9, 132, 227, 0.15)',
  },
  '& svg': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: copied ? 'scale(1.1)' : 'scale(1)',
  }
}));

const ErrorResponseBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(239, 83, 80, 0.05)',
  borderRadius: '12px',
  padding: theme.spacing(2.5),
  border: '1px solid rgba(239, 83, 80, 0.1)',
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(239, 83, 80, 0.08)',
    boxShadow: '0 4px 12px rgba(239, 83, 80, 0.08)'
  }
}));

const StatusCode = styled(Typography)(({ theme }) => ({
  backgroundColor: 'rgba(239, 83, 80, 0.1)',
  color: '#d32f2f',
  borderRadius: '8px',
  padding: theme.spacing(0.5, 1.5),
  fontWeight: 600,
  fontSize: '0.875rem',
  display: 'inline-block',
  marginBottom: theme.spacing(1.5)
}));

function ApiDocs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [copiedStates, setCopiedStates] = useState({});

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    
    // Set the copied state for this ID
    setCopiedStates(prevState => ({ ...prevState, [id]: true }));
    
    // Clear the copied state after 2 seconds
    setTimeout(() => {
      setCopiedStates(prevState => ({ ...prevState, [id]: false }));
    }, 2000);
  };

  const generateCurlRequest = (endpoint) => {
    let curl = `curl -X ${endpoint.method.split(',')[0]} 'https://sightlinks.org/api${endpoint.path}'`;
    
    // Replace path parameters with example values
    curl = curl.replace(/<task_id>/g, 'example_task_123')
              .replace(/<token>/g, 'example_token_456');
    
    if (endpoint.requestParams) {
      if (endpoint.method.includes('POST')) {
        const params = Object.entries(endpoint.requestParams).reduce((acc, [key, value]) => {
          if (value.type === 'file') {
            acc.push(`-F "${key}=@your_file.zip"`);
          } else {
            acc.push(`-F "${key}=${value.default || 'example_value'}"`);
          }
          return acc;
        }, []);
        
        if (params.length > 0) {
          curl += ' \\\n  ' + params.join(' \\\n  ');
        }
      } else {
        const params = Object.entries(endpoint.requestParams)
          .map(([key, value]) => `${key}=${value.default || 'example_value'}`)
          .join('&');
        if (params) {
          curl += `?${params}`;
        }
      }
    }

    return curl;
  };

  const generateFetchRequest = (endpoint) => {
    let path = endpoint.path;
    // Replace path parameters with example values
    path = path.replace(/<task_id>/g, 'example_task_123')
               .replace(/<token>/g, 'example_token_456');
               
    let code = `const response = await fetch('https://sightlinks.org/api${path}'`;
    
    if (endpoint.requestParams && endpoint.method.includes('POST')) {
      const formData = Object.entries(endpoint.requestParams)
        .map(([key, value]) => {
          if (value.type === 'file') {
            return `formData.append('${key}', fileInput.files[0]);`;
          } else {
            return `formData.append('${key}', '${value.default || 'example_value'}');`;
          }
        })
        .join('\n    ');
      
      code += `, {
  method: '${endpoint.method.split(',')[0]}',
  body: formData
});`;

      code = `const formData = new FormData();\n    ${formData}\n\n${code}`;
    } else {
      code += `, {
  method: '${endpoint.method.split(',')[0]}'
});`;
    }

    return code;
  };

  const endpoints = [
    {
      id: 'test',
      method: 'GET, POST',
      path: '/test',
      title: 'Test API',
      description: 'Test endpoint to verify API functionality and server status',
      requestParams: {
        message: { 
          type: 'string', 
          default: 'test', 
          description: 'Optional message to echo back (POST only)' 
        },
        file: { 
          type: 'file', 
          required: false, 
          description: 'Optional file to test upload functionality (POST only)' 
        }
      },
      response: {
        status: "operational",
        version: "1.0.0",
        timestamp: "ISO-8601 timestamp",
        endpoints: {
          test: "/test",
          predict: "/predict",
          web_predict: "/web/predict",
          status: "/web/status/<task_id>",
          download: "/download/<token>"
        },
        models: {
          yolo_n: true,
          yolo_s: true,
          yolo_m: true,
          mobilenet: true,
          vgg16: true
        },
        directories: {
          run_output: true,
          run_extract: true,
          input: true,
          models: true
        },
        cuda: {
          available: true,
          device_count: 1,
          device_name: "NVIDIA GeForce RTX 3080"
        },
        system: {
          cpu_percent: 23.5,
          memory_percent: 45.2,
          disk_percent: 68.7
        }
      },
      notes: [
        "If POST method is used, the response will include an \"echo\" field with POSTed JSON data",
        "If POST method is used, the response will include a \"files\" array with details of uploaded files if present"
      ]
    },
    {
      id: 'direct',
      method: 'POST',
      path: '/predict',
      title: 'Direct Processing API',
      description: 'Synchronously processes uploaded files and returns results immediately',
      requestParams: {
        files: { 
          type: 'file', 
          required: true, 
          description: 'One or more files to process. For input_type=0: Single ZIP file with JPG/PNG/JPEG + JGW files, or individual JPG/PNG/JPEG + JGW files. For input_type=1: Either ZIP file with GeoTIFF files, or individual GeoTIFF (.tif, .tiff) files' 
        },
        input_type: { 
          type: 'string', 
          default: '0', 
          description: 'String, \'0\' for image data (JPG/PNG + JGW), \'1\' for GeoTIFF data' 
        },
        classification_threshold: { 
          type: 'string', 
          default: '0.35', 
          description: 'String, default \'0.35\'' 
        },
        prediction_threshold: { 
          type: 'string', 
          default: '0.5', 
          description: 'String, default \'0.5\'' 
        },
        save_labeled_image: { 
          type: 'string', 
          default: 'false', 
          description: 'String, default \'false\'' 
        },
        output_type: { 
          type: 'string', 
          default: '0', 
          description: 'String, default \'0\' (0=JSON, 1=TXT)' 
        },
        yolo_model_type: { 
          type: 'string', 
          default: 'm', 
          description: 'String, default \'m\' (n/s/m)' 
        }
      },
      response: {
        status: "success",
        message: "Processing completed",
        output_path: "string"
      },
      errors: [
        {
          status: 400,
          response: {
            error: "string"
          }
        }
      ],
      contentType: "multipart/form-data or application/json",
      acceptTypes: "If Accept: application/json: JSON response, Otherwise: ZIP file containing results"
    },
    {
      id: 'web',
      method: 'POST',
      path: '/web/predict',
      title: 'Web Processing API (Queued)',
      description: 'Asynchronously processes files with progress tracking',
      requestParams: {
        files: { 
          type: 'file', 
          required: true, 
          description: 'One or more files to process. For input_type=0: Single ZIP file with JPG/PNG/JPEG + JGW files, or individual JPG/PNG/JPEG + JGW files. For input_type=1: Either ZIP file with GeoTIFF files, or individual GeoTIFF (.tif, .tiff) files' 
        },
        input_type: { 
          type: 'string', 
          default: '0', 
          description: 'String, \'0\' for image data (JPG/PNG + JGW), \'1\' for GeoTIFF data' 
        },
        classification_threshold: { 
          type: 'string', 
          default: '0.35', 
          description: 'String, default \'0.35\'' 
        },
        prediction_threshold: { 
          type: 'string', 
          default: '0.5', 
          description: 'String, default \'0.5\'' 
        },
        save_labeled_image: { 
          type: 'string', 
          default: 'false', 
          description: 'String, default \'false\'' 
        },
        output_type: { 
          type: 'string', 
          default: '0', 
          description: 'String, default \'0\' (0=JSON, 1=TXT)' 
        },
        yolo_model_type: { 
          type: 'string', 
          default: 'm', 
          description: 'String, default \'m\' (n/s/m)' 
        }
      },
      response: {
        task_id: "string",
        message: "Task queued successfully"
      },
      errors: [
        {
          status: 503,
          response: {
            error: "Server is busy. Please try again later."
          }
        }
      ],
      contentType: "multipart/form-data or application/json"
    },
    {
      id: 'status',
      method: 'GET',
      path: '/web/status/<task_id>',
      title: 'Task Status',
      description: 'Get task status and progress',
      requestParams: {
        task_id: { 
          type: 'string', 
          required: true, 
          description: 'Task ID received from /web/predict endpoint' 
        }
      },
      response: {
        completed: false,
        download_token: "string (included only when completed is true)",
        has_detections: true,
        total_detections: 42
      },
      errors: [
        {
          status: 404,
          response: {
            error: "Task not found"
          }
        }
      ],
      notes: [
        "When completed is false, the task is either queued, processing, failed, or cancelled",
        "When completed is true, a download_token will be included for downloading results",
        "When completed is true, has_detections indicates if any objects were found",
        "When no objects are detected, a marker file is created but has_detections will be false",
        "When has_detections is true, total_detections provides the count of all detected objects",
        "When error is true, an error_message will explain what went wrong"
      ],
      errorStateResponse: {
        completed: false,
        error: true,
        error_message: "Description of the error that occurred"
      }
    },
    {
      id: 'download',
      method: 'GET',
      path: '/download/<token>',
      title: 'Download Results',
      description: 'Download processed results using token',
      requestParams: {
        token: { 
          type: 'string', 
          required: true, 
          description: 'Download token received from /web/status endpoint' 
        },
        filename: { 
          type: 'string', 
          required: false, 
          description: 'Optional custom filename for the downloaded file',
          default: 'results-YYYY-MM-DD.zip'
        }
      },
      responseHeaders: {
        'Content-Type': 'application/zip or text/plain',
        'Content-Disposition': 'attachment; filename=result_YYYYMMDD.zip or filename=result_YYYYMMDD.txt',
        'Content-Length': 'file size in bytes',
        'X-Has-Detections': 'true or false',
        'X-Total-Detections': 'count (when available)'
      },
      errors: [
        {
          status: 401,
          response: {
            error: "Invalid token or token payload"
          }
        },
        {
          status: 404,
          response: {
            error: "Task or ZIP file not found"
          }
        },
        {
          status: 500,
          response: {
            error: "ZIP file corrupted or empty"
          }
        }
      ],
      notes: [
        "Tokens are generated using JWT (JSON Web Tokens)",
        "Token payload includes session_id and task_id",
        "Tokens expire after 2 hours (MAX_TOKEN_AGE_HOURS)",
        "Tokens are verified using auth_handler.verify_download_token",
        "ZIP file integrity is verified before sending",
        "When no objects are detected in any image, a text file is returned instead of a ZIP",
        "The X-Has-Detections header can be used to determine if any detections were found",
        "Clients should check the Task Status endpoint before downloading to know what to expect"
      ]
    },
    {
      id: 'cancel',
      method: 'POST',
      path: '/web/cancel/<task_id>',
      title: 'Cancel Task',
      description: 'Cancel a running or queued task',
      requestParams: {
        task_id: { 
          type: 'string', 
          required: true, 
          description: 'Task ID to cancel' 
        }
      },
      response: {
        status: "success",
        message: "Task cancelled successfully"
      },
      errors: [
        {
          status: 404,
          response: {
            error: "Task not found or cannot be cancelled"
          }
        }
      ],
      notes: [
        "Sets cancellation flag on task",
        "Removes task from processing queue if queued",
        "Terminates execution if task is processing",
        "Cleans up input/output folders for the task",
        "Cleans up extract directory if it exists",
        "Immediately stops any ongoing processing"
      ]
    },
    {
      id: 'server-status',
      method: 'GET',
      path: '/server-status',
      title: 'Server Status',
      description: 'Get current server status and statistics',
      requestParams: {},
      response: {
        uptime_seconds: 12345.67,
        start_time: "ISO-8601 timestamp",
        max_concurrent_tasks: 4,
        max_queue_size: 10,
        memory_usage_mb: 1024.5,
        cpu_usage_percent: 45.2,
        active_tasks: 3,
        processing_tasks: 2,
        queue_size: 1,
        queued_task_ids: ["task_id_1"],
        processing_task_ids: ["task_id_2", "task_id_3"],
        total_tasks: 100,
        completed_tasks: 85,
        failed_tasks: 10,
        cancelled_tasks: 5
      },
      errors: [
        {
          status: 503,
          response: {
            error: "Server is temporarily unavailable"
          }
        }
      ],
      notes: [
        "Returns real-time server metrics and statistics",
        "All numeric values are updated at time of request",
        "Task counts reflect current server state",
        "Uptime is provided in seconds with millisecond precision"
      ]
    }
  ];

  const renderEndpoint = (endpoint) => (
    <EndpointCard key={endpoint.id}>
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          {endpoint.method.split(',').map((method, i) => (
            <MethodChip 
              key={i}
              label={method.trim()} 
              method={method.trim()}
            />
          ))}
                        <Typography
                          sx={{
                            fontFamily: 'monospace',
                            fontSize: '1rem',
              fontWeight: 500,
              color: 'text.secondary'
                          }}
                        >
                          {endpoint.path}
                        </Typography>
                      </Box>

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          {endpoint.title}
        </Typography>
                      
                      <Typography color="text.secondary" sx={{ mb: 3 }}>
                        {endpoint.description}
                      </Typography>

        {(endpoint.method.includes('POST') || endpoint.requestParams) && (
          <>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
              Example Request
            </Typography>

            {endpoint.contentType && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                Content-Type: {endpoint.contentType}
              </Typography>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                cURL
                      </Typography>
              <CodeBlock>
                <pre style={{ margin: 0, overflow: 'auto' }}>
                  {generateCurlRequest(endpoint)}
                </pre>
                <CopyButtonContainer className="copy-button-container">
                  <Tooltip 
                    title={copiedStates[`${endpoint.id}-curl`] ? "Copied!" : "Copy to clipboard"} 
                    placement="left"
                  >
                    <CopyButton
                      size="small"
                      copied={copiedStates[`${endpoint.id}-curl`] ? 1 : 0}
                      onClick={() => handleCopy(generateCurlRequest(endpoint), `${endpoint.id}-curl`)}
                    >
                      {copiedStates[`${endpoint.id}-curl`] ? <CheckIcon /> : <CopyIcon />}
                    </CopyButton>
                  </Tooltip>
                </CopyButtonContainer>
              </CodeBlock>

              <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, color: 'text.secondary' }}>
                JavaScript (Fetch)
                      </Typography>
              <CodeBlock>
                <pre style={{ margin: 0, overflow: 'auto' }}>
                  {generateFetchRequest(endpoint)}
                </pre>
                <CopyButtonContainer className="copy-button-container">
                  <Tooltip 
                    title={copiedStates[`${endpoint.id}-fetch`] ? "Copied!" : "Copy to clipboard"} 
                    placement="left"
                  >
                    <CopyButton
                      size="small"
                      copied={copiedStates[`${endpoint.id}-fetch`] ? 1 : 0}
                      onClick={() => handleCopy(generateFetchRequest(endpoint), `${endpoint.id}-fetch`)}
                    >
                      {copiedStates[`${endpoint.id}-fetch`] ? <CheckIcon /> : <CopyIcon />}
                    </CopyButton>
                  </Tooltip>
                </CopyButtonContainer>
              </CodeBlock>
                      </Box>
          </>
        )}

        {endpoint.requestParams && (
          <>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
              Parameters
                      </Typography>
                      <Box sx={{ mb: 3 }}>
              {Object.entries(endpoint.requestParams).map(([name, param]) => (
                <Box key={name} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {name}
                      {param.required && (
                        <Typography component="span" color="error" sx={{ ml: 0.5 }}>*</Typography>
                      )}
                              </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {param.description}
                      {param.default !== undefined && ` (Default: ${param.default})`}
                      {param.range && ` (Range: ${param.range})`}
                              </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
          </>
        )}

        {endpoint.acceptTypes && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Accept:</strong> {endpoint.acceptTypes}
                  </Typography>
          </Alert>
        )}

        {endpoint.responseHeaders && (
          <>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
              Response Headers
            </Typography>
            <CodeBlock>
              <pre style={{ margin: 0, overflow: 'auto' }}>
                {JSON.stringify(endpoint.responseHeaders, null, 2)}
              </pre>
            </CodeBlock>
          </>
        )}

        {endpoint.response && Object.keys(endpoint.response).length > 0 && (
          <>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
              Response
            </Typography>
            <CodeBlock>
              <pre style={{ margin: 0, overflow: 'auto' }}>
                {JSON.stringify(endpoint.response, null, 2)}
              </pre>
            </CodeBlock>
          </>
        )}

        {endpoint.notes && (
          <>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
              Notes
                          </Typography>
            {typeof endpoint.notes === 'string' ? (
                          <Typography variant="body2" color="text.secondary">
                {endpoint.notes}
                          </Typography>
            ) : (
              <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                {endpoint.notes.map((note, i) => (
                  <Typography component="li" variant="body2" color="text.secondary" key={i} sx={{ mb: 1 }}>
                    {note}
                      </Typography>
                    ))}
                  </Box>
            )}
          </>
        )}

        {endpoint.errors && (
          <>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              Error Responses
            </Typography>
            {endpoint.errors.map((error, index) => (
              <ErrorResponseBox key={index}>
                <StatusCode>
                  {error.status}
                </StatusCode>
                <Box>
                  <pre 
                    style={{ 
                      margin: 0, 
                      overflow: 'auto',
                      fontFamily: 'monospace', 
                      fontSize: '0.875rem',
                      color: 'rgba(0, 0, 0, 0.7)'
                    }}
                  >
                    {JSON.stringify(error.response, null, 2)}
                  </pre>
                </Box>
              </ErrorResponseBox>
            ))}
          </>
        )}
      </Box>
    </EndpointCard>
  );

  return (
    <Container maxWidth="lg">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: '2.5rem',
                background: 'linear-gradient(45deg, #2D3436 30%, #636E72 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              API Documentation
            </Typography>
            <Typography 
              variant="h6"
              color="text.secondary"
              sx={{ 
                maxWidth: '700px',
                mx: 'auto',
                mb: 3,
                fontWeight: 500,
                lineHeight: 1.6,
                fontSize: '1.125rem',
              }}
            >
              Complete reference for integrating with our satellite image analysis API
            </Typography>
          </Box>

          <GlassPaper sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <InfoIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Base URL
              </Typography>
            </Box>
            <CodeBlock sx={{ mb: 0 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                https://sightlinks.org/api
              </Typography>
              <CopyButtonContainer className="copy-button-container">
                <Tooltip 
                  title={copiedStates['base-url'] ? "Copied!" : "Copy to clipboard"} 
                  placement="left"
                >
                  <CopyButton
                    size="small"
                    copied={copiedStates['base-url'] ? 1 : 0}
                    onClick={() => handleCopy('https://sightlinks.org/api', 'base-url')}
                  >
                    {copiedStates['base-url'] ? <CheckIcon /> : <CopyIcon />}
                  </CopyButton>
                </Tooltip>
              </CopyButtonContainer>
            </CodeBlock>
          </GlassPaper>

                    <Box sx={{ mb: 4 }}>
            <Alert severity="info" sx={{ mb: 4 }}>
              <Typography variant="body2">
                <strong>Additional Information:</strong>
                <ul style={{ marginTop: 8, marginBottom: 0 }}>
                  <li>Maximum file size: 5GB</li>
                  <li>CORS enabled for all origins with credentials support</li>
                  <li>Preflight requests cached for 24 hours</li>
                  <li>Supports methods: GET, POST, PUT, DELETE, OPTIONS, PATCH</li>
                  <li>Background tasks: cleanup thread for removing old files and queue processor thread for handling tasks</li>
                  <li>Error responses include stack traces in development mode</li>
                  <li>All endpoints support error handling with appropriate status codes</li>
                  <li>Task errors are tracked and reported via the status API endpoint</li>
                  <li>File operations are logged for debugging and monitoring</li>
                  <li>ZIP file integrity is verified before download</li>
                </ul>
                        </Typography>
            </Alert>
                      </Box>
                      
          <GlassPaper sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Storage sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Data Sources and Format Requirements
            </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Image Data */}
              <Box sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: 'rgba(9, 132, 227, 0.06)',
                border: '1px solid rgba(9, 132, 227, 0.15)',
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Image Data with Georeferencing (JPG/PNG + JGW)
                      </Typography>
                <Typography variant="body2" color="text.secondary">
                  Image data must include a world file (JGW) alongside each image to provide georeferencing information. 
                  World files include coordinate transformation parameters that position the image in a geographic space.
                  Each image file (.jpg, .jpeg, .png) must have a corresponding world file (.jgw, .jpgw, .pngw) with the same base name.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  <strong>For example:</strong> if you have "image01.jpg", you must also have "image01.jgw" or "image01.jpgw" in the same directory.
                </Typography>
              </Box>
              
              {/* GeoTIFF */}
              <Box sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 184, 148, 0.06)',
                border: '1px solid rgba(0, 184, 148, 0.15)',
              }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  GeoTIFF Format
                      </Typography>
                <Typography variant="body2" color="text.secondary">
                  GeoTIFF files (.tif, .tiff) contain both image data and embedded georeferencing information in a single file.
                  These files include geographical metadata like coordinate system information, map projection, and coordinate reference points.
                  This format is commonly used for satellite imagery, aerial photography, and digital elevation models.
                      </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  <strong>Recommended Sources:</strong> USGS Earth Explorer, Digimap (UK academic institutions), OpenAerialMap, and Sentinel Hub provide GeoTIFF data suitable for use with this API.
                </Typography>
              </Box>

              {/* Data Recommendations */}
              <Box sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: 'rgba(253, 121, 168, 0.06)',
                border: '1px solid rgba(253, 121, 168, 0.15)',
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  File Organization Recommendations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For optimal processing:
                </Typography>
                <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      Group related images together in a single ZIP file
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      Keep world files (.jgw) in the same directory as their corresponding images
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      Avoid deeply nested folder structures within ZIP files
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      Ensure all images are in the same coordinate system/projection
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      For best results, use high-resolution imagery (≤ 0.5m/pixel)
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Box>
          </GlassPaper>

          <GlassPaper sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Speed sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                System Workflow and Specifications
                      </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
              <Box sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(9, 132, 227, 0.04)',
                border: '1px solid rgba(9, 132, 227, 0.1)',
              }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                  File Management
                              </Typography>
                <List dense disablePadding>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Each task creates a unique session ID: timestamp_uuid</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Files are uploaded to: input/{"{session_id}"}/</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Processing results saved to: run/output/{"{session_id}"}/</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Results are compressed into ZIP with standardized name format</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• ZIP files always download as result_YYYYMMDD.zip with current date</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• ZIP file integrity is verified after creation</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Original directories are deleted after successful compression</Typography>
                  </ListItem>
                </List>
              </Box>

              <Box sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(9, 132, 227, 0.04)',
                border: '1px solid rgba(9, 132, 227, 0.1)',
              }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                  Task Execution
                      </Typography>
                <List dense disablePadding>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Tasks use execute() function with various parameters</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Tasks can be cancelled at any time during processing</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Cancellation checks happen at key processing points</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Cancelled tasks are immediately terminated</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• All resources (directories) are cleaned up after tasks</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Output files retained for download based on configured time limit</Typography>
                  </ListItem>
                </List>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(9, 132, 227, 0.04)',
                border: '1px solid rgba(9, 132, 227, 0.1)',
              }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                  Supported Features
                              </Typography>
                <List dense disablePadding>
                  {[
                    "Maximum file size: 5GB",
                    "CORS enabled for all origins with credentials support",
                    "Preflight requests cached for 24 hours",
                    "Supports methods: GET, POST, PUT, DELETE, OPTIONS, PATCH",
                    "Error responses include stack traces in development mode",
                    "ZIP file integrity is verified before download"
                  ].map((item, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <Typography variant="body2">• {item}</Typography>
                    </ListItem>
                  ))}
                </List>
                      </Box>

              <Box sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(9, 132, 227, 0.04)',
                border: '1px solid rgba(9, 132, 227, 0.1)',
              }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                  Download Behavior
                      </Typography>
                <List dense disablePadding>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• When objects detected: Returns a ZIP file with results</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• When no objects detected: Returns a text file instead of ZIP</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• X-Has-Detections header indicates if objects were found</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• X-Total-Detections header provides count when available</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Tokens are generated using JWT with 2-hour expiration</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Typography variant="body2">• Token payload includes session_id and task_id</Typography>
                  </ListItem>
                </List>
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Parameter Validation
              </Typography>
              <Box sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(9, 132, 227, 0.04)',
                border: '1px solid rgba(9, 132, 227, 0.1)',
              }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr' }, gap: 1 }}>
                  {[
                    { param: "input_type", desc: "Must be '0' (Image Data) or '1' (GeoTIFF Data)" },
                    { param: "classification_threshold", desc: "String representation of float, default '0.35'" },
                    { param: "prediction_threshold", desc: "String representation of float, default '0.5'" },
                    { param: "save_labeled_image", desc: "String 'true' or 'false', default 'false'" },
                    { param: "output_type", desc: "String '0' (JSON) or '1' (TXT), default '0'" },
                    { param: "yolo_model_type", desc: "String 'n', 's', or 'm', default 'm'" }
                  ].map((param, idx) => (
                    <React.Fragment key={idx}>
                      <Box sx={{ 
                        py: 1, 
                        px: 1,
                        backgroundColor: 'rgba(9, 132, 227, 0.04)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                          {param.param}
                        </Typography>
                      </Box>
                      <Box sx={{ py: 1, px: 1 }}>
                        <Typography variant="body2">
                          {param.desc}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
                        </Box>
          </GlassPaper>

          {endpoints.map(renderEndpoint)}
        </motion.div>
      </PageContainer>
    </Container>
  );
}

export default ApiDocs; 