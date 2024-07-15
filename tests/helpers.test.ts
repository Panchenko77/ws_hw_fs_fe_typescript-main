import {
  moduleW2LocalWidth,
  moduleX2LocalX,
  moduleY2LocalY,
  localX2ModuleX,
  localY2ModuleY,
  isOverlap,
  isLegal,
} from "../src/helpers"; // Adjust the import path according to your file structure

import { COLUMN_WIDTH, GUTTER_SIZE } from "../src/constants";
import ModuleInterface from "../src/types/ModuleInterface";

// Example modules for testing
const moduleA: ModuleInterface = {
  id: 1,
  coord: { x: 0, y: 0, w: 2, h: 2 },
};

const moduleB: ModuleInterface = {
  id: 2,
  coord: { x: 1, y: 1, w: 2, h: 2 },
};

const moduleC: ModuleInterface = {
  id: 3,
  coord: { x: 3, y: 3, w: 20, h: 20 },
};

// Test cases for moduleW2LocalWidth function
describe("moduleW2LocalWidth", () => {
  it("calculates local width correctly", () => {
    expect(moduleW2LocalWidth(2)).toEqual(2 * COLUMN_WIDTH - GUTTER_SIZE);
  });
});

// Test cases for moduleX2LocalX function
describe("moduleX2LocalX", () => {
  it("calculates local X coordinate correctly", () => {
    expect(moduleX2LocalX(2)).toEqual(moduleW2LocalWidth(2) + GUTTER_SIZE * 2);
  });
});

// Test cases for moduleY2LocalY function
describe("moduleY2LocalY", () => {
  it("returns local Y coordinate correctly", () => {
    expect(moduleY2LocalY(2)).toEqual(2 + GUTTER_SIZE);
  });
});

// Test cases for localX2ModuleX function
describe("localX2ModuleX", () => {
  it("converts local X coordinate to module X correctly", () => {
    expect(localX2ModuleX(25)).toEqual(
      Math.round((25 - GUTTER_SIZE) / COLUMN_WIDTH)
    );
  });
});

// Test cases for localY2ModuleY function
describe("localY2ModuleY", () => {
  it("converts local Y coordinate to module Y correctly", () => {
    expect(localY2ModuleY(25)).toEqual(
      Math.round((25 - GUTTER_SIZE) / 10) * 10
    );
  });
});

// Test cases for isOverlap function
describe("isOverlap", () => {
  it("detects overlap correctly", () => {
    expect(isOverlap(moduleA, moduleB)).toEqual(true); // Should overlap
    expect(isOverlap(moduleA, moduleC)).toEqual(false); // Should not overlap
  });
});

// Test cases for isLegal function
describe("isLegal", () => {
  it("checks legality of module position correctly", () => {
    expect(isLegal(moduleA)).toEqual(true); // Should be legal
    expect(isLegal(moduleC)).toEqual(false); // Should not be legal
  });
});
