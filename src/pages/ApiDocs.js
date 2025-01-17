import { Container, Typography, Box, Tabs, Tab, Chip, Alert, Divider, Grid } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Lock, Send, Api, Storage, Speed } from '@mui/icons-material';
import { GlassPaper, PageContainer } from '../components/StyledComponents';

function ApiDocs() {
  const [selectedTab, setSelectedTab] = useState(0);

  const endpoints = [
    {
      method: 'POST',
      path: '/api/analyze',
      description: 'Upload and analyze satellite imagery',
      version: 'v1',
      rateLimit: '100 requests/hour',
      request: {
        type: 'multipart/form-data',
        body: {
          image: 'File (JPEG, PNG)',
          options: {
            detectZebraCrossings: 'boolean',
            confidence: 'number (0-1)',
            modelVersion: 'string (optional)',
            returnAnnotatedImage: 'boolean (optional)',
            region: {
              topLeft: { lat: 'number', lng: 'number' },
              bottomRight: { lat: 'number', lng: 'number' }
            }
          }
        }
      },
      response: {
        success: true,
        processingTime: '1.23s',
        modelVersion: '2.1.0',
        results: {
          zebraCrossings: [
            {
              id: 'zc_123456',
              confidence: 0.95,
              bbox: {
                x1: 100,
                y1: 200,
                x2: 300,
                y2: 400
              },
              coordinates: {
                lat: 51.5074,
                lng: -0.1278
              },
              metadata: {
                orientation: 45,
                length: 15,
                width: 3,
                stripeCount: 8
              }
            }
          ],
          annotatedImageUrl: 'https://api.example.com/images/annotated/123.jpg'
        }
      },
      errors: [
        { code: 400, message: 'Invalid image format' },
        { code: 401, message: 'Invalid or missing API key' },
        { code: 429, message: 'Rate limit exceeded' }
      ],
      examples: [
        {
          title: 'Basic Analysis',
          curl: 'curl -X POST https://api.example.com/v1/analyze \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -F "image=@satellite.jpg" \\\n  -F "options={\\"detectZebraCrossings\\": true, \\"confidence\\": 0.8}"'
        },
        {
          title: 'With Region',
          curl: 'curl -X POST https://api.example.com/v1/analyze \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -F "image=@satellite.jpg" \\\n  -F "options={\\"region\\": {\\"topLeft\\": {\\"lat\\": 51.51, \\"lng\\": -0.13}, \\"bottomRight\\": {\\"lat\\": 51.50, \\"lng\\": -0.12}}}"'
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
                            fontSize: '1rem',
                            mr: 2,
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
                    </Box>
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