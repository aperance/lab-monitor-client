import * as React from "react";

interface InjectedProps {
  subViewWidth: number;
  isDragging: boolean;
  startDrag: () => void;
}

interface Props {
  children: (injectedProps: InjectedProps) => React.ReactNode;
}

interface State {
  subViewWidth: number;
  isDragging: boolean;
}

class MouseTracker extends React.Component<Props, State> {
  public state: State = { subViewWidth: 800, isDragging: false };

  public changeWidth(e: any) {
    if (this.state.isDragging) {
      this.setState({
        subViewWidth: Math.max(window.innerWidth - e.pageX, 400)
      });
    }
  }

  public render() {
    return (
      <div
        onMouseUp={() => this.setState({ isDragging: false })}
        onMouseLeave={() => this.setState({ isDragging: false })}
        onMouseMove={e => this.changeWidth(e)}
      >
        {this.props.children({
          subViewWidth: this.state.subViewWidth,
          isDragging: this.state.isDragging,
          startDrag: () => this.setState({ isDragging: true })
        })}
      </div>
    );
  }
}

export default MouseTracker;
