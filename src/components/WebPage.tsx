import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import OpenIcon from "@material-ui/icons/OpenInNew";

const styles = createStyles({
  button: {
    position: "absolute",
    right: "18px",
    top: "18px",
    backgroundColor: "white",
    opacity: 0.5
  }
});

interface Props extends WithStyles<typeof styles> {
  url: string | null;
}

function WebPage(props: Props) {
  return props.url === null ? null : (
    <>
      <Button
        variant="fab"
        mini={true}
        className={props.classes.button}
        href={props.url}
        target="_blank"
      >
        <OpenIcon />
      </Button>
      <iframe
        src={props.url}
        id="qqq"
        title="iframe"
        width="100%"
        height="100%"
        draggable={false}
        style={{ userSelect: "none", borderWidth: "0px" }}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </>
  );
}

export default withStyles(styles)(WebPage);
