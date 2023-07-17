function debounce<T extends (...args: any[]) => any>(func: T, wait: number = 500) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> =>
    new Promise((resolve) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => resolve(func(...args)), wait);
    });
}

export const throttle = <F extends (...args: any[]) => any>(func: F, wait: number = 500) => {
  const now = () => new Date().getTime();
  const resetStartTime = () => (startTime = now());
  let timer: ReturnType<typeof setTimeout>;
  let startTime: number = now() - wait;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      const timeLeft = startTime + wait - now();
      if (timer) {
        clearTimeout(timer);
      }
      if (startTime + wait <= now()) {
        resetStartTime();
        resolve(func(...args));
      } else {
        timer = setTimeout(() => {
          resetStartTime();
          resolve(func(...args));
        }, timeLeft);
      }
    });
};

export default debounce;
