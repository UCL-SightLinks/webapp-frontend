import { Container, Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Description, Code, LibraryBooks, 
  ChevronRight, School, Build 
} from '@mui/icons-material';
import { 
  GlassPaper, IconBox, 
  AnimatedButton, PageContainer, HeroSection 
} from '../components/StyledComponents';
import { useNavigate } from 'react-router-dom';

function Documentation() {
  const navigate = useNavigate();

  const mainSections = [
    {
      title: 'GitHub Setup',
      description: 'How to run and set up our project',
      icon: Description,
      items: ['Prerequisites', 'Installation Steps', 'Running the Application'],
      path: '/github-setup'
    },
    {
      title: 'API Documentation',
      description: 'Complete API reference and usage',
      icon: Code,
      items: ['Authentication', 'Endpoints Reference', 'Response Examples'],
      path: '/api-docs'
    },
    {
      title: 'Algorithm Guide',
      description: 'Understanding our computer vision approach',
      icon: School,
      items: ['Core Concepts', 'Technical Details', 'Implementation'],
      path: '/algorithm-guide'
    }
  ];

  const quickLinks = [
    { title: 'Setup Guide', icon: Build, path: '/github-setup' },
    { title: 'API Reference', icon: Code, path: '/api-docs' },
    { title: 'Algorithm', icon: LibraryBooks, path: '/algorithm-guide' },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <Container maxWidth="lg">
      <PageContainer>
        <motion.div {...fadeInUp}>
          <HeroSection>
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
                Documentation
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
                Everything you need to know about our satellite image analysis platform
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              {quickLinks.map((link, index) => (
                <AnimatedButton
                  key={index}
                  variant="outlined"
                  startIcon={<link.icon />}
                  onClick={() => navigate(link.path)}
                  sx={{ 
                    borderRadius: '20px',
                    px: 3,
                    py: 1,
                    minWidth: '160px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    }
                  }}
                >
                  {link.title}
                </AnimatedButton>
              ))}
            </Box>
          </HeroSection>

          <Grid container spacing={4}>
            {mainSections.map((section, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <GlassPaper sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 4,
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
                    }
                  }}>
                    <IconBox sx={{ mb: 3 }}>
                      <section.icon sx={{ fontSize: 30 }} />
                    </IconBox>
                    
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                      {section.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 4, flex: 1 }}>
                      {section.description}
                    </Typography>
                    
                    <Box>
                      {section.items.map((item, idx) => (
                        <AnimatedButton
                          key={idx}
                          fullWidth
                          onClick={() => navigate(section.path)}
                          sx={{
                            justifyContent: 'space-between',
                            textAlign: 'left',
                            mb: idx !== section.items.length - 1 ? 1 : 0,
                            py: 1.5,
                            color: 'text.primary',
                            borderRadius: '8px',
                            '&:hover': {
                              backgroundColor: 'rgba(9, 132, 227, 0.08)',
                            }
                          }}
                          endIcon={<ChevronRight />}
                        >
                          {item}
                        </AnimatedButton>
                      ))}
                    </Box>
                  </GlassPaper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 8 }}>
            <GlassPaper sx={{ 
              p: 8, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Project Report
              </Typography>
              <Typography 
                color="text.secondary" 
                sx={{ 
                  mb: 4, 
                  maxWidth: '600px', 
                  mx: 'auto',
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}
              >
                Explore our comprehensive project report covering requirements, research, algorithms, design, implementation, testing, and evaluation.
              </Typography>
              <AnimatedButton 
                variant="contained" 
                size="large"
                href="http://students.cs.ucl.ac.uk/2024/group15/index.html"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  borderRadius: '30px',
                  px: 6,
                  py: 2,
                  background: 'linear-gradient(45deg, #0984E3 30%, #74B9FF 90%)',
                  boxShadow: '0 8px 24px rgba(9, 132, 227, 0.25)',
                  mb: 8
                }}
              >
                View Full Report
              </AnimatedButton>
            </GlassPaper>
          </Box>

          <Box sx={{ mt: 8 }}>
            <GlassPaper sx={{ 
              p: 8, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Need Help?
              </Typography>
              <Typography 
                color="text.secondary" 
                sx={{ 
                  mb: 4, 
                  maxWidth: '600px', 
                  mx: 'auto',
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}
              >
                Can't find what you're looking for? Our support team is here to help.
              </Typography>
              <AnimatedButton 
                variant="contained" 
                size="large"
                sx={{ 
                  borderRadius: '30px',
                  px: 6,
                  py: 2,
                  background: 'linear-gradient(45deg, #0984E3 30%, #74B9FF 90%)',
                  boxShadow: '0 8px 24px rgba(9, 132, 227, 0.25)',
                }}
              >
                Contact Support
              </AnimatedButton>
            </GlassPaper>
          </Box>
        </motion.div>
      </PageContainer>
    </Container>
  );
}

export default Documentation; 