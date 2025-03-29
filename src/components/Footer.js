import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  GitHub as GitHubIcon,
  Language as WebsiteIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderTop: '1px solid rgba(0, 0, 0, 0.08)',
  padding: theme.spacing(4, 0),
  marginTop: 'auto',
  textAlign: 'center'
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: 'all 0.2s ease',
  margin: theme.spacing(0, 1),
  '&:hover': {
    transform: 'translateY(-2px)',
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(9, 132, 227, 0.08)',
  }
}));

function Footer() {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2D3436 30%, #636E72 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            SightLinks
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}
          >
            Advanced satellite imagery analysis with computer vision technology
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          <SocialButton 
            size="large" 
            aria-label="GitHub repository"
            href="https://github.com/UCL-SightLinks/SightLinks-Main"
            target="_blank"
            component="a"
          >
            <GitHubIcon />
          </SocialButton>
          <SocialButton 
            size="large" 
            aria-label="Report website"
            href="https://students.cs.ucl.ac.uk/2024/group15/"
            target="_blank"
            component="a"
          >
            <WebsiteIcon />
          </SocialButton>
          <SocialButton 
            size="large" 
            aria-label="Contact email"
            href="mailto:yiliu.li@outlook.com"
            component="a"
          >
            <EmailIcon />
          </SocialButton>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          © 2023 SightLinks. All rights reserved.
        </Typography>
      </Container>
    </FooterWrapper>
  );
}

export default Footer; 