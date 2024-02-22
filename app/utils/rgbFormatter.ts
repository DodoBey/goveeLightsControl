type ColorType = {
  r: number;
  g: number;
  b: number;
};

export const rgbFormatter = (color: ColorType) => {
  const formattedRGBColor = `rgb(${color?.r} ${color?.g} ${color?.b})`;
  return formattedRGBColor;
};
