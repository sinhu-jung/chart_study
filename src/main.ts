import "./style.css";
import { getDoughnutChartPaths } from "./circleChartOption";

const app = document.querySelector<HTMLDivElement>("#app")!;
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

svg.setAttribute("width", "100%");
svg.setAttribute("height", "100%");
svg.setAttribute("viewBox", "-1 -1 2 2");
svg.setAttribute("style", "transform: rotate(90deg);");

svg.innerHTML = getDoughnutChartPaths([
  { category: "c0", percent: 0.1 },
  { category: "c1", percent: 0.1 },
  { category: "c2", percent: 0.1 },
  { category: "c3", percent: 0.1 },
  { category: "c4", percent: 0.1 },
  { category: "c0", percent: 0.1 },
  { category: "c1", percent: 0.1 },
  { category: "c2", percent: 0.1 },
  { category: "c3", percent: 0.1 },
  { category: "c4", percent: 0.1 },
]);

app.appendChild(svg);
