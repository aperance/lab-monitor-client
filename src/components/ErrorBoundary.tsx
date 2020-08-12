import * as React from "react";

interface State {
  hasError: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
class ErrorBoundary extends React.Component<{}, State> {
  public state = {hasError: false};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    console.log(error);

    return {hasError: true};
  }

  public render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default ErrorBoundary;
