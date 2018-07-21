import * as React from "react";
import NavBar from "./components/NavBar";
import AssetTableContainer from "./containers/AssetTableContainer";
import FilterBarContainer from "./containers/FilterBarContainer";
import DrawersContainer from "./containers/DrawersContainer";
import LogLevelContainer from "./containers/LogLevelContainer";
import ActionResponseContainer from "./containers/ActionResponseContainer";

class Layout extends React.Component {
  public render() {
    return (
      <div>
        <NavBar />
        <div
          style={{
            height: "calc(100vh - 80px)",
            paddingTop: "68px",
            display: "flex",
            overflowX: "hidden"
          }}
        >
          <div style={{ flex: 0, borderRight: "1px solid #0000001f" }}>
            <FilterBarContainer />
          </div>
          <div style={{ flex: 1 }}>
            <AssetTableContainer />
          </div>
        </div>
        <DrawersContainer />
        <LogLevelContainer />
        <ActionResponseContainer />
      </div>
    );
  }
}

export default Layout;
