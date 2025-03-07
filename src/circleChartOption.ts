interface CategoryStatisticData {
  category: string;
  percent: number;
}

function getCoordinatesForPercent(percent: number) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return { x, y };
}

interface ArcSVGCommandAttributes {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isLargeArcFlag: number;
}

enum COLORS_BY_CATEGORY {
  "c0" = "#FF0000",
  "c1" = "#00FF00",
  "c2" = "#0000FF",
  "c3" = "#FF00FF",
}

function getCategoryDataPath(
  { startX, startY, endX, endY, isLargeArcFlag }: ArcSVGCommandAttributes,
  idx: number
) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    `M ${startX} ${startY} A 1 1 0 ${isLargeArcFlag} 1 ${endX} ${endY} L 0 0`
  );
  path.setAttribute(
    "fill",
    COLORS_BY_CATEGORY[`c${idx % 3}` as keyof typeof COLORS_BY_CATEGORY]
  );
  return path.outerHTML;
}

function getDoughnutChartPaths(data: CategoryStatisticData[]) {
  let accumulatedPercent = 0;
  const paths = data.map(({ percent }, idx) => {
    const { x: startX, y: startY } =
      getCoordinatesForPercent(accumulatedPercent);
    accumulatedPercent += percent;
    const { x: endX, y: endY } = getCoordinatesForPercent(accumulatedPercent);
    const isLargeArcFlag = percent > 0.5 ? 1 : 0;

    return getCategoryDataPath(
      { startX, startY, endX, endY, isLargeArcFlag },
      idx
    );
  });
  return paths.join("");
}

export { getDoughnutChartPaths };
