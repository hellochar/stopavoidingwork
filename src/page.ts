import { isInRange } from "./util";

export function scrollToPage(page: number) {
  const top = window.innerHeight * page;
  window.scrollTo({
    behavior: "smooth",
    left: 0,
    top: top,
  });
}

export function isPageActive(page: number) {
  return isInRange(window.scrollY / window.innerHeight, page - 0.05, page + 1);
}
