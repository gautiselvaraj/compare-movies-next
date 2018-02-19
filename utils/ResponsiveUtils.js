export const xsOnly = () => window.outerWidth <= 480;
export const smOnly = () => window.outerWidth > 480 && window.outerWidth <= 768;
export const mdOnly = () => window.outerWidth > 768 && window.outerWidth <= 992;
export const lgOnly = () =>
  window.outerWidth > 992 && window.outerWidth <= 1200;
export const xlOnly = () => window.outerWidth > 1200;
export const smAndDown = () => window.outerWidth <= 768;
export const mdAndDown = () => window.outerWidth <= 992;
export const lgAndDown = () => window.outerWidth <= 1200;
export const smAndUp = () => window.outerWidth > 480;
export const mdAndUp = () => window.outerWidth > 768;
export const lgAndUp = () => window.outerWidth > 1200;
