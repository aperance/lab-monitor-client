import React, { Component } from "react";
import { Collection, List, AutoSizer } from "react-virtualized";
import HistoryItem from "./HistoryItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({});

class HistoryList extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.recomputeCells();
  }

  recomputeCells() {
    this.collectionRef && this.collectionRef.recomputeCellSizesAndPositions();
  }

  render() {
    return (
      <AutoSizer onResize={this.recomputeCells.bind(this)}>
        {({ height, width }) => (
          <Collection
            ref={ref => (this.collectionRef = ref)}
            height={height}
            width={width}
            cellCount={this.props.properties.length}
            cellRenderer={({ key, index, isScrolling, style }) => (
              <HistoryItem
                key={key}
                style={style}
                property={this.props.properties[index]}
                selected={this.props.selectedIndex === index}
                handleClick={this.props.handleClick}
              />
            )}
            cellSizeAndPositionGetter={({ index }) => {
              const isSelected = this.props.selectedIndex === index;
              const isBelowSelected =
                this.props.selectedIndex !== -1 &&
                index > this.props.selectedIndex;
              return {
                x: 0,
                y: isBelowSelected ? 41 * (index + 1) : 41 * index,
                width,
                height: isSelected ? 82 : 41
              };
            }}
          />
        )}
      </AutoSizer>
    );
  }
}

export default withStyles(styles)(HistoryList);
