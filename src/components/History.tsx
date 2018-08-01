import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Collection, AutoSizer } from "react-virtualized";
import HistoryItem from "./HistoryItem";

const styles = createStyles({});

interface Props extends WithStyles<typeof styles> {
  properties: string[];
  selectedIndex: number;
  selectedData: Array<[string, string | null]>;
  handleClick: (property: string) => void;
}

class HistoryList extends React.Component<Props> {
  public collectionRef: any = null;

  public componentDidUpdate() {
    this.recomputeCells();
  }

  public recomputeCells() {
    if (this.collectionRef) this.collectionRef.recomputeCellSizesAndPositions();
  }

  public render() {
    return (
      <AutoSizer onResize={this.recomputeCells.bind(this)}>
        {({ height, width }: any) => (
          <Collection
            ref={(ref: any) => (this.collectionRef = ref)}
            style={{ position: "absolute", right: "0px" }} // overwritten if through class
            height={height + 320}
            width={width}
            verticalOverscanSize={5}
            cellCount={this.props.properties.length + 7}
            cellRenderer={({
              key,
              index,
              style
            }: {
              key: number;
              index: number;
              style: any;
            }) => (
              <HistoryItem
                key={key}
                style={style}
                property={this.props.properties[index]}
                isSelected={this.props.selectedIndex === index}
                historyData={
                  this.props.selectedIndex === index
                    ? this.props.selectedData
                    : null
                }
                handleClick={this.props.handleClick}
              />
            )}
            cellSizeAndPositionGetter={({ index }: { index: number }) => {
              const isSelected = this.props.selectedIndex === index;
              const isBelowSelected =
                this.props.selectedIndex !== -1 &&
                index > this.props.selectedIndex;
              return {
                x: 0,
                y: isBelowSelected ? 40 * (index + 7) : 40 * index,
                width: width - 65,
                height: isSelected ? 320 : 40
              };
            }}
          />
        )}
      </AutoSizer>
    );
  }
}

export default withStyles(styles)(HistoryList);
