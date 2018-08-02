import * as React from "react";

interface Props {
  url: string | null;
}

class WebPage extends React.Component<Props> {
  public render() {
    return (
      this.props.url && (
        <iframe
          src={this.props.url}
          title="iframe"
          width="100%"
          height="100%"
          style={{ borderWidth: "0px" }}
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      )
    );
  }
}

export default WebPage;
