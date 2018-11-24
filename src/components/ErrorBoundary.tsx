import * as React from "react";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  public state = { hasError: false };

  public static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    console.log(error);

    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default ErrorBoundary;
