import { COLUMN_WIDTH, GUTTER_SIZE, NUM_COLUMNS } from "./constants";
import ModuleInterface from "./types/ModuleInterface";

export const moduleW2LocalWidth = (moduleW: number) =>
  moduleW * COLUMN_WIDTH - GUTTER_SIZE;
export const moduleX2LocalX = (moduleX: number) =>
  moduleW2LocalWidth(moduleX) + GUTTER_SIZE * 2;
export const moduleY2LocalY = (moduleY: number) => moduleY + GUTTER_SIZE;

export const localX2ModuleX = (localX: number) =>
  Math.round((localX - GUTTER_SIZE) / COLUMN_WIDTH);
export const localY2ModuleY = (localY: number) =>
  Math.round((localY - GUTTER_SIZE) / 10) * 10;

export const isOverlap = (moduleA: ModuleInterface, moduleB: ModuleInterface) =>
  moduleA.coord.x < moduleB.coord.x + moduleB.coord.w &&
  moduleA.coord.x + moduleA.coord.w > moduleB.coord.x &&
  moduleA.coord.y < moduleB.coord.y + moduleB.coord.h + GUTTER_SIZE &&
  moduleA.coord.y + moduleA.coord.h + GUTTER_SIZE > moduleB.coord.y;

export const isLegal = (m: ModuleInterface) =>
  m.coord.x >= 0 && m.coord.x + m.coord.w <= NUM_COLUMNS && m.coord.y >= 0;
