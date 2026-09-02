export const dot2inch = (dot: number) =>
  dot / 72

export const inch2dot = (inch: number) =>
  inch * 72

export const inch2cm = (inch: number) =>
  inch * 2.54

export const px2dot = (px: number, ppi: number) =>
  px / ppi * 72

export const dot2px = (dot: number, ppi: number) => 
  dot / 72 * ppi

export const cm2inch = (cm: number) =>
  cm * 0.3937008

export const cm2dot = (cm: number) =>
  inch2dot(cm2inch(cm))