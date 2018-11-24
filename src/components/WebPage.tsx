import * as React from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import OpenIcon from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles({
  button: {
    position: "absolute",
    right: "18px",
    top: "18px",
    backgroundColor: "white",
    opacity: 0.5
  }
});

interface Props {
  url: string | null;
}

const WebPage = (props: Props) => {
  const classes = useStyles();

  return props.url === null ? null : (
    <>
      <Button
        variant="fab"
        mini={true}
        className={classes.button}
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
};

export { WebPage };
