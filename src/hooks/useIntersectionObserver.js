import { useEffect } from "react";

const useIntersectionObserver = (target, callback) => {
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5
    };

    var observer = new IntersectionObserver(callback, options);
    observer.observe(target.current);

    return () => observer.unobserve(target.current);
  }, []);
};

export default useIntersectionObserver;
