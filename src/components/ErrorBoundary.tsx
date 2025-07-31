import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper, Container } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error,
      errorInfo
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Container maxWidth="md">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            p={3}
          >
            <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
              <Typography variant="h4" color="error" gutterBottom>
                Oops! Something went wrong
              </Typography>
              
              <Typography variant="body1" color="textSecondary" paragraph>
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </Typography>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Box mt={2} p={2} bgcolor="grey.100" borderRadius={1}>
                  <Typography variant="h6" gutterBottom>
                    Error Details (Development):
                  </Typography>
                  <Typography variant="body2" component="pre" style={{ textAlign: 'left', overflow: 'auto' }}>
                    {this.state.error.toString()}
                  </Typography>
                  {this.state.errorInfo && (
                    <Typography variant="body2" component="pre" style={{ textAlign: 'left', overflow: 'auto', marginTop: '1rem' }}>
                      {this.state.errorInfo.componentStack}
                    </Typography>
                  )}
                </Box>
              )}

              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={this.handleReset}
                  style={{ marginRight: '1rem' }}
                >
                  Try Again
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 