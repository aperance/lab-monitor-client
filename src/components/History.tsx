import * as React from "react";
import { useEffect } from "react";
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

const HistoryList = (props: Props) => {
  useEffect(() => recomputeCells());

  let collectionRef: any = null;
  const recomputeCells = () => {
    if (collectionRef) collectionRef.recomputeCellSizesAndPositions();
  };

  return (
    <AutoSizer onResize={recomputeCells}>
      {({ height, width }: any) => (
        <Collection
          ref={(ref: any) => (collectionRef = ref)}
          style={{ position: "absolute", right: "0px" }} // overwritten if through class
          height={height + 320}
          width={width}
          verticalOverscanSize={5}
          cellCount={props.properties.length + 7}
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
              property={props.properties[index]}
              isSelected={props.selectedIndex === index}
              historyData={
                props.selectedIndex === index ? props.selectedData : null
              }
              handleClick={props.handleClick}
            />
          )}
          cellSizeAndPositionGetter={({ index }: { index: number }) => {
            const isBelowSelected =
              props.selectedIndex !== -1 && index > props.selectedIndex;
            const selectedHeight =
              Math.min(props.selectedData.length, 10) * 24 + 18;

            return {
              x: 0,
              y: isBelowSelected ? 40 * index + selectedHeight : 40 * index,
              width: width - 65,
              height: selectedHeight
            };
          }}
        />
      )}
    </AutoSizer>
  );
};

export default withStyles(styles)(HistoryList);
