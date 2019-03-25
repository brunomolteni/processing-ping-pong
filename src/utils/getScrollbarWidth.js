export default function getScrollbarWidth() {
  const outer = document.createElement("div");
  const inner = document.createElement("div");

  outer.style.visibility = "hidden";
  outer.style.width = "100px";

  inner.style.width = "100%";

  outer.appendChild(inner);
  document.body.appendChild(outer);

  const widthWithoutScrollbar = outer.offsetWidth;

  outer.style.overflow = "scroll";

  const widthWithScrollbar = inner.offsetWidth;

  document.body.removeChild(outer);

  return widthWithoutScrollbar - widthWithScrollbar;
}
