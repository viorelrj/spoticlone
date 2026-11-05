function debounce<F extends (...args: never[]) => unknown>(
  func: F,
  wait: number,
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null;

  return (...args: Parameters<F>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

export default debounce;
