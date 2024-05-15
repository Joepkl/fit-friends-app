const statusColors = ["bronze", "silver", "gold"];

export function getColorClass(
  status: number,
  isText: boolean | null = null,
  isBorder: boolean | null = null,
  isBackground: boolean | null = null
) {
  let prefix;
  if (isText) {
    prefix = "text-";
  } else if (isBorder) {
    prefix = "border-";
  } else if (isBackground) {
    prefix = "bg-";
  }
  return prefix + statusColors[status];
}
