import { Container, Typography, Box, Tabs, Tab, Chip, Alert, Divider, Grid } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Lock, Send, Api, Storage, Speed } from '@mui/icons-material';
import { GlassPaper, PageContainer } from '../components/StyledComponents';

function ApiDocs() {
  const [selectedTab, setSelectedTab] = useState(0);

  const endpoints = [
    {
      method: 'GET/POST',
      path: '/api/test',
      description: 'Test endpoint to verify API functionality and server status',
      version: 'v1',
      rateLimit: 'None',
      response: {
        status: 'operational',
        version: '1.0.0',
        timestamp: 'ISO-8601-timestamp',
        endpoints: {
          test: '/api/test',
          predict: '/api/predict',
          web_predict: '/web/predict',
          status: '/web/status/<task_id>',
          download: '/download/<token>'
        },
        models: {
          yolo_n: true,
          yolo_s: true,
          mobilenet: true,
          vgg16: true
        },
        cuda: {
          available: true,
          device_count: 1,
          device_name: 'GPU-NAME'
        },
        system: {
          cpu_percent: 0.0,
          memory_percent: 0.0,
          disk_percent: 0.0
        }
      },
      examples: [
        {
          title: 'Basic Test',
          curl: 'curl http://localhost:8000/api/test'
        },
        {
          title: 'Upload Test',
          curl: 'curl -X POST http://localhost:8000/api/test -F "file=@test.zip"'
        }
      ]
    },
    {
      method: 'POST',
      path: '/api/predict',
      description: 'Synchronously processes uploaded files and returns results immediately',
      version: 'v1',
      rateLimit: 'None',
      request: {
        type: 'multipart/form-data',
        body: {
          file: 'ZIP file containing images',
          input_type: 'String (0=Digimap, 1=Custom)',
          classification_threshold: 'Number (0-1, default: 0.35)',
          prediction_threshold: 'Number (0-1, default: 0.5)',
          save_labeled_image: 'Boolean (default: false)',
          output_type: 'String (0=JSON, 1=TXT)',
          yolo_model_type: 'String (n/s/m/l)'
        }
      },
      response: {
        status: 'success',
        message: 'Processing completed',
        output_path: 'path/to/result.zip'
      },
      errors: [
        { code: 400, message: 'Invalid input' },
        { code: 500, message: 'Internal server error' }
      ],
      examples: [
        {
          title: 'Basic Processing',
          curl: 'curl -X POST http://localhost:8000/api/predict \\\n  -F "file=@images.zip" \\\n  -F "input_type=0" \\\n  -F "classification_threshold=0.35" \\\n  -F "prediction_threshold=0.5"'
        },
        {
          title: 'Custom Processing',
          curl: 'curl -X POST http://localhost:8000/api/predict \\\n  -F "file=@images.zip" \\\n  -F "input_type=1" \\\n  -F "save_labeled_image=true" \\\n  -F "output_type=1" \\\n  -F "yolo_model_type=s"'
        }
      ]
    },
    {
      method: 'POST',
      path: '/web/predict',
      description: 'Asynchronously processes files with progress tracking',
      version: 'v1',
      rateLimit: 'None',
      request: {
        type: 'multipart/form-data',
        body: {
          file: 'ZIP file containing images',
          input_type: 'String (0=Digimap, 1=Custom)',
          classification_threshold: 'Number (0-1, default: 0.35)',
          prediction_threshold: 'Number (0-1, default: 0.5)',
          save_labeled_image: 'Boolean (default: false)',
          output_type: 'String (0=JSON, 1=TXT)',
          yolo_model_type: 'String (n/s/m/l)'
        }
      },
      response: {
        task_id: 'uuid',
        message: 'Task queued successfully'
      },
      errors: [
        { code: 503, message: 'Server is busy. Please try again later.' }
      ],
      examples: [
        {
          title: 'Queue Processing Task',
          curl: 'curl -X POST http://localhost:8000/web/predict \\\n  -F "file=@images.zip" \\\n  -F "input_type=0" \\\n  -F "classification_threshold=0.35"'
        }
      ]
    },
    {
      method: 'GET',
      path: '/web/status/<task_id>',
      description: 'Get task status and progress',
      version: 'v1',
      rateLimit: 'None',
      response: {
        percentage: '0-100',
        log: 'current_stage',
        has_detections: 'boolean',
        download_token: 'token (only when completed)',
        error: 'error_message (only when failed)'
      },
      examples: [
        {
          title: 'Check Task Status',
          curl: 'curl http://localhost:8000/web/status/550e8400-e29b-41d4-a716-446655440000'
        }
      ]
    },
    {
      method: 'GET',
      path: '/download/<token>',
      description: 'Download processed results using token',
      version: 'v1',
      rateLimit: 'None',
      response: {
        type: 'application/zip',
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename=result.zip',
          'Content-Length': 'file size in bytes'
        }
      },
      examples: [
        {
          title: 'Download Results',
          curl: 'curl -O -J http://localhost:8000/download/eyJhbGciOiJIUzI1NiIs...'
        }
      ]
    },
    {
      method: 'POST',
      path: '/web/cancel/<task_id>',
      description: 'Cancel a running or queued task',
      version: 'v1',
      rateLimit: 'None',
      response: {
        status: 'success',
        message: 'Task cancelled successfully'
      },
      errors: [
        { code: 404, message: 'Task not found or cannot be cancelled' }
      ],
      examples: [
        {
          title: 'Cancel Task',
          curl: 'curl -X POST http://localhost:8000/web/cancel/550e8400-e29b-41d4-a716-446655440000'
        }
      ]
    },
    {
      method: 'GET',
      path: '/api/server-status',
      description: 'Get current server status and statistics',
      version: 'v1',
      rateLimit: 'None',
      response: {
        total_tasks_processed: 'int',
        total_files_processed: 'int',
        failed_tasks: 'int',
        cancelled_tasks: 'int',
        current_tasks: 'int',
        queued_tasks: 'int',
        uptime_seconds: 'float',
        max_concurrent_tasks: 'int',
        max_queue_size: 'int',
        memory_usage_mb: 'float',
        cpu_usage_percent: 'float'
      },
      examples: [
        {
          title: 'Get Server Status',
          curl: 'curl http://localhost:8000/api/server-status'
        }
      ]
    }
  ];

  const authentication = {
    type: 'Bearer Token',
    example: 'Authorization: Bearer your-api-key',
    description: 'Include your API key in the Authorization header for all requests.',
    keyTypes: [
      { name: 'Development', prefix: 'dev_', rateLimit: '100/hour' },
      { name: 'Production', prefix: 'prod_', rateLimit: '1000/hour' },
      { name: 'Enterprise', prefix: 'ent_', rateLimit: 'Custom' }
    ],
    security: [
      'Keys are encrypted at rest using AES-256',
      'Automatic key rotation every 90 days',
      'IP address whitelisting available',
      'Request logging and audit trails'
    ]
  };

  const sdks = [
    { language: 'Python', version: '2.1.0', status: 'stable' },
    { language: 'JavaScript', version: '2.0.1', status: 'stable' },
    { language: 'Java', version: '1.9.0', status: 'beta' },
    { language: 'Go', version: '0.8.0', status: 'alpha' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <PageContainer>
        <motion.div {...fadeInUp}>
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
                mb: 4,
                fontWeight: 500,
                lineHeight: 1.6,
                fontSize: '1.125rem',
              }}
            >
              Complete reference for integrating with our satellite image analysis API
            </Typography>
          </Box>

          <Box sx={{ 
            mb: 4, 
            p: 3, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: 2,
            border: '1px solid rgba(0, 0, 0, 0.08)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Available Endpoints
            </Typography>
            {endpoints.map((endpoint, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1,
                  '&:last-child': { mb: 0 }
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    mr: 2,
                    color: 'text.secondary'
                  }}
                >
                  {`${index + 1}. ${endpoint.path}`}
                </Typography>
                <Chip 
                  label={endpoint.method}
                  size="small"
                  sx={{ 
                    backgroundColor: '#2D3436',
                    color: 'white',
                    fontSize: '0.75rem',
                    height: '20px'
                  }}
                />
              </Box>
            ))}
          </Box>

          <GlassPaper sx={{ p: 4 }}>
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange}
              sx={{ mb: 4 }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab 
                icon={<Send sx={{ mr: 1 }} />} 
                label="Endpoints" 
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                icon={<Lock sx={{ mr: 1 }} />} 
                label="Authentication" 
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                icon={<Code sx={{ mr: 1 }} />} 
                label="SDKs" 
                sx={{ textTransform: 'none' }}
              />
            </Tabs>

            {selectedTab === 0 && (
              <Box>
                {endpoints.map((endpoint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                        <Typography
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: 'primary.main',
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            mr: 2,
                          }}
                        >
                          {endpoint.method}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: 'monospace',
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            mr: 2,
                            color: 'text.primary'
                          }}
                        >
                          {endpoint.path}
                        </Typography>
                        <Chip 
                          label={endpoint.version} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                          sx={{ mr: 1 }}
                        />
                        <Chip 
                          label={endpoint.rateLimit} 
                          size="small" 
                          color="default" 
                          variant="outlined"
                        />
                      </Box>
                      
                      <Typography color="text.secondary" sx={{ mb: 3 }}>
                        {endpoint.description}
                      </Typography>

                      {endpoint.request && (
                        <>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                            Request
                          </Typography>
                          <Box
                            sx={{
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                              borderRadius: '8px',
                              p: 2,
                              mb: 3,
                              fontFamily: 'monospace',
                              overflow: 'auto',
                              maxHeight: '300px',
                            }}
                          >
                            <pre style={{ margin: 0 }}>
                              {JSON.stringify(endpoint.request, null, 2)}
                            </pre>
                          </Box>
                        </>
                      )}

                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Response
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          borderRadius: '8px',
                          p: 2,
                          mb: 3,
                          fontFamily: 'monospace',
                          overflow: 'auto',
                          maxHeight: '300px',
                        }}
                      >
                        <pre style={{ margin: 0 }}>
                          {JSON.stringify(endpoint.response, null, 2)}
                        </pre>
                      </Box>

                      {endpoint.errors && endpoint.errors.length > 0 && (
                        <>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Error Codes
                          </Typography>
                          <Box sx={{ mb: 3 }}>
                            {endpoint.errors.map((error, idx) => (
                              <Alert 
                                key={idx} 
                                severity="error" 
                                sx={{ mb: 1 }}
                                icon={false}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography sx={{ fontWeight: 600, mr: 2 }}>
                                    {error.code}
                                  </Typography>
                                  <Typography>
                                    {error.message}
                                  </Typography>
                                </Box>
                              </Alert>
                            ))}
                          </Box>
                        </>
                      )}

                      {endpoint.examples && endpoint.examples.length > 0 && (
                        <>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Examples
                          </Typography>
                          {endpoint.examples.map((example, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                {example.title}
                              </Typography>
                              <Box
                                sx={{
                                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                  borderRadius: '8px',
                                  p: 2,
                                  fontFamily: 'monospace',
                                  whiteSpace: 'pre-wrap',
                                  wordBreak: 'break-all',
                                }}
                              >
                                {example.curl}
                              </Box>
                            </Box>
                          ))}
                        </>
                      )}
                    </Box>
                    {index < endpoints.length - 1 && (
                      <Box sx={{ 
                        my: 6,
                        py: 0.25,
                        backgroundColor: '#2D3436',
                        borderTop: '2px solid rgba(0, 0, 0, 0.12)',
                        borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        width: '100%'
                      }} />
                    )}
                  </motion.div>
                ))}
              </Box>
            )}

            {selectedTab === 1 && (
              <motion.div {...fadeInUp}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Authentication Type
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {authentication.type}
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Example
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '8px',
                      p: 2,
                      mb: 3,
                      fontFamily: 'monospace',
                    }}
                  >
                    <Typography variant="body2">
                      {authentication.example}
                    </Typography>
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    API Key Types
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {authentication.keyTypes.map((keyType, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 2,
                          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2">
                            {keyType.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Prefix: <code>{keyType.prefix}</code>
                          </Typography>
                        </Box>
                        <Chip 
                          label={`${keyType.rateLimit}`}
                          size="small"
                          color={keyType.name === 'Enterprise' ? 'primary' : 'default'}
                          variant="outlined"
                        />
                      </Box>
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Security Features
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {authentication.security.map((feature, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          py: 1,
                          display: 'flex',
                          alignItems: 'center',
                          '&:before': {
                            content: '""',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: '#0984E3',
                            marginRight: 2,
                          },
                        }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            )}

            {selectedTab === 2 && (
              <motion.div {...fadeInUp}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                    Official SDKs for popular programming languages
                  </Typography>
                  <Grid container spacing={2}>
                    {sdks.map((sdk, idx) => (
                      <Grid item xs={12} sm={6} md={3} key={idx}>
                        <Box
                          sx={{
                            p: 2,
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            borderRadius: '8px',
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" gutterBottom>
                            {sdk.language}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Version {sdk.version}
                          </Typography>
                          <Chip
                            label={sdk.status}
                            size="small"
                            color={
                              sdk.status === 'stable' ? 'success' :
                              sdk.status === 'beta' ? 'warning' : 'default'
                            }
                            sx={{ mt: 1 }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            )}
          </GlassPaper>
        </motion.div>
      </PageContainer>
    </Container>
  );
}

export default ApiDocs; 