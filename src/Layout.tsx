import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import NavBar from "./components/NavBar";
import AssetTableContainer from "./containers/AssetTableContainer";
import FilterBarContainer from "./containers/FilterBarContainer";
import DrawersContainer from "./containers/DrawersContainer";
import LogLevelContainer from "./containers/LogLevelContainer";
import ErrorMessageContainer from "./containers/ErrorMessageContainer";
import ActionResponseContainer from "./containers/ActionResponseContainer";

const styles = createStyles({
  root: {
    height: "calc(100vh - 80px)",
    paddingTop: "68px",
    display: "flex",
    overflowX: "hidden"
  },
  filter: { flex: 0, borderRight: "1px solid #0000001f" },
  table: { flex: 1 }
});

interface Props extends WithStyles<typeof styles> {}

class Layout extends React.Component<Props> {
  public render() {
    return (
      <div>
        <NavBar />
        <div className={this.props.classes.root}>
          <div className={this.props.classes.filter}>
            <FilterBarContainer />
          </div>
          <div className={this.props.classes.table}>
            <AssetTableContainer />
          </div>
        </div>
        <DrawersContainer />
        <LogLevelContainer />
        <ErrorMessageContainer />
        <ActionResponseContainer />
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
