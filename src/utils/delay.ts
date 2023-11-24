export const delay = (timeMs = 100) =>
  new Promise((resolve) => setTimeout(resolve, timeMs));
