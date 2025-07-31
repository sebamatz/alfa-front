import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

interface Props {
  children: ReactNode;
  componentName?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ComponentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in ${this.props.componentName || 'component'}:`, error, errorInfo);
    this.setState({ error });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={3}
          textAlign="center"
        >
          <Typography variant="h6" color="error" gutterBottom>
            {this.props.componentName ? `${this.props.componentName} Error` : 'Component Error'}
          </Typography>
          
          <Typography variant="body2" color="textSecondary" paragraph>
            This component encountered an error. Please try again.
          </Typography>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box mt={1} p={1} bgcolor="grey.100" borderRadius={1} maxWidth="100%">
              <Typography variant="caption" component="pre" style={{ textAlign: 'left', overflow: 'auto' }}>
                {this.state.error.toString()}
              </Typography>
            </Box>
          )}

          <Box mt={2}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={this.handleReset}
            >
              Retry
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ComponentErrorBoundary; 