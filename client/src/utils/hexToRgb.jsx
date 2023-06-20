export function hexToRgb(hex) {
  // Remove the '#' character if present
  hex = hex.replace("#", "");

  // Split the hex code into three parts: red, green, and blue
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  // Return the RGB representation as an object
  return `${red},${green},${blue}`;
}
