import React from "react";
import { Box } from "@mui/material";
import { useDrag, useDragDropManager } from "react-dnd";
import { useRafLoop } from "react-use";

import ModuleInterface from "../types/ModuleInterface";
import {
  moduleW2LocalWidth,
  moduleX2LocalX,
  moduleY2LocalY,
  localX2ModuleX,
  localY2ModuleY,
} from "../helpers";

type ModuleProps = {
  data: ModuleInterface;
  updatePosition: (
    id: number,
    newCoord: { x: number; y: number; w: number; h: number }
  ) => void;
  isLegalPosition: (m: ModuleInterface) => boolean;
};

const Module = (props: ModuleProps) => {
  const {
    data: {
      id,
      coord: { x, y, w, h },
    },
    updatePosition,
    isLegalPosition,
  } = props;

  // Transform x, y to left, top
  const [{ top, left }, setPosition] = React.useState(() => ({
    top: moduleY2LocalY(y),
    left: moduleX2LocalX(x),
  }));

  const dndManager = useDragDropManager();
  const initialPosition = React.useRef<{ top: number; left: number }>();

  // Use request animation frame to process dragging
  const [stop, start] = useRafLoop(() => {
    const movement = dndManager.getMonitor().getDifferenceFromInitialOffset();

    if (!initialPosition.current || !movement) {
      return;
    }

    const moduleX = localX2ModuleX(initialPosition.current.left + movement.x);
    const moduleY = localY2ModuleY(initialPosition.current.top + movement.y);

    const newTop = moduleY2LocalY(moduleY);
    const newLeft = moduleX2LocalX(moduleX);

    if (
      isLegalPosition({
        id,
        coord: { x: moduleX, y: moduleY, w, h },
      })
    ) {
      updatePosition(id, { x: moduleX, y: moduleY, w, h });
      setPosition({
        top: newTop,
        left: newLeft,
      });
    }
  }, false);

  // Wire the module to DnD drag system
  const [, drag] = useDrag(
    () => ({
      type: "module",
      item: () => {
        // Track the initial position at the beginning of the drag operation
        initialPosition.current = { top, left };

        // Start raf
        start();
        return { id };
      },
      end: stop,
    }),
    [top, left]
  );

  return (
    <Box
      ref={drag}
      display="flex"
      position="absolute"
      border={1}
      borderColor="grey.500"
      padding="10px"
      bgcolor="rgba(0, 0, 0, 0.5)"
      top={top}
      left={left}
      width={moduleW2LocalWidth(w)}
      height={h}
      sx={{
        transitionProperty: "top, left",
        transitionDuration: "0.1s",
        "& .resizer": {
          opacity: 0,
        },
        "&:hover .resizer": {
          opacity: 1,
        },
      }}
    >
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={40}
        color="#fff"
        sx={{ cursor: "move" }}
        draggable
      >
        <Box sx={{ userSelect: "none", pointerEvents: "none" }}>{id}</Box>
      </Box>
    </Box>
  );
};

export default React.memo(Module);
