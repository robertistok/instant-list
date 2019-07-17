export const abbrString = (val: string): string =>
  val
    .split(" ")
    .map(word => word.charAt(0).toUpperCase())
    .join("");
