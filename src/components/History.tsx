import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import { List, AutoSizer } from "react-virtualized";

const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "0 12px 0 12px"
  },
  selectedRow: { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  text: { fontSize: "0.75rem" }
});

interface Props {
  historyData: { [x: string]: Array<[string, string | null]> };
  properties: string[];
}

const HistoryList = (props: Props) => {
  const classes = useStyles();
  const [selectedProperty, setSelectedProperty] = useState("");

  return (
    <div className={classes.root}>
      <div style={{ flex: 1 }}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              rowHeight={32}
              height={height}
              rowCount={props.properties.length}
              rowRenderer={({ key, index, style }) => (
                <ListItem
                  button
                  style={style}
                  key={key}
                  className={
                    props.properties[index] === selectedProperty
                      ? classes.selectedRow
                      : undefined
                  }
                  onClick={() => setSelectedProperty(props.properties[index])}
                  dense={true}
                  divider={true}
                >
                  <ListItemText
                    classes={{ primary: classes.text }}
                    primary={props.properties[index]}
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

export default HistoryList;
