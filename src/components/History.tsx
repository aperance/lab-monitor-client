/**
 *
 * @packageDocumentation
 */

import React, {useState} from "react";
import {useSelector} from "react-redux";
import {ListItem, ListItemText, makeStyles} from "@material-ui/core";
import {List, AutoSizer} from "react-virtualized";

import {StoreState} from "../redux/store";

/**
 * CSS-in-JS styling.
 * @hidden
 */
const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "0 12px 0 12px"
  },
  selectedRow: {backgroundColor: "rgba(0, 0, 0, 0.04)"},
  text: {fontSize: "0.75rem"}
});

/**
 * Redux selector function (equivilant to mapStateToProps).
 */
const reduxSelector = (state: StoreState) => {
  const selectedRow = state.userSelection.rows[0];
  const historyData = state.historyData[selectedRow] ?? {};
  const properties = Object.keys(historyData);

  return {historyData, properties};
};

const HistoryList = () => {
  const classes = useStyles();
  const {historyData, properties} = useSelector(reduxSelector);
  const [selectedProperty, setSelectedProperty] = useState("");

  return (
    <div className={classes.root}>
      <div style={{flex: 1}}>
        <AutoSizer>
          {({width, height}) => (
            <List
              width={width}
              rowHeight={32}
              height={height}
              rowCount={properties.length}
              rowRenderer={({key, index, style}) => (
                <ListItem
                  button
                  style={style}
                  key={key}
                  className={
                    properties[index] === selectedProperty
                      ? classes.selectedRow
                      : undefined
                  }
                  onClick={() => setSelectedProperty(properties[index])}
                  dense={true}
                  divider={true}
                >
                  <ListItemText
                    classes={{primary: classes.text}}
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
        {historyData[selectedProperty] && (
          <>
            <pre>{`History for ${selectedProperty}`}</pre>
            {Object.values(historyData[selectedProperty]).map(([x, y]) => (
              <pre key={x + y}>{`  ${x}:  ${y}`}</pre>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryList;
