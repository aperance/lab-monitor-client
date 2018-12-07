import * as React from "react";
import { useState } from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { List, AutoSizer } from "react-virtualized";

const styles = createStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "0 12px 0 12px"
  },
  selectedRow: { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  text: { fontSize: "0.75rem" }
});

interface Props extends WithStyles<typeof styles> {
  historyData: { [x: string]: Array<[string, string | null]> };
}

const HistoryList = (props: Props) => {
  const [selectedProperty, setSelectedProperty] = useState("");

  const properties = Object.keys(props.historyData);

  return (
    <div className={props.classes.root}>
      <div style={{ flex: 1 }}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              rowHeight={32}
              height={height}
              rowCount={properties.length}
              rowRenderer={({ key, index, style }) => (
                <ListItem
                  button
                  style={style}
                  key={key}
                  className={
                    properties[index] === selectedProperty
                      ? props.classes.selectedRow
                      : undefined
                  }
                  onClick={() => setSelectedProperty(properties[index])}
                  dense={true}
                  divider={true}
                >
                  <ListItemText
                    classes={{ primary: props.classes.text }}
                    primary={properties[index]}
                  />
                </ListItem>
              )}
            />
          )}
        </AutoSizer>
      </div>
      <div
        style={{
          flex: 1,
          padding: "16px 16px 16px 16px",
          borderTop: "1px solid #0000001f"
        }}
      >
        {props.historyData[selectedProperty] && (
          <>
            <pre>{`History for ${selectedProperty}`}</pre>
            {Object.values(props.historyData[selectedProperty]).map(
              ([x, y]) => (
                <pre>{`  ${x}:  ${y}`}</pre>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(HistoryList);
