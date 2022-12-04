export const requestFullscreen = () => {
  const body = document.body as any;
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitRequestFullscreen) {
    /* Safari */
    body.webkitRequestFullscreen();
  } else if (body.msRequestFullscreen) {
    /* IE11 */
    body.msRequestFullscreen();
  }
};

export const exitFullscreen = () => {
  const doc = document as any;
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.webkitExitFullscreen) {
    /* Safari */
    doc.webkitExitFullscreen();
  } else if (doc.msExitFullscreen) {
    /* IE11 */
    doc.msExitFullscreen();
  }
};

export const toggleFullscreen = () => {
  if (
    (window as any).fullScreen ||
    (window.innerWidth == screen.width && window.innerHeight == screen.height)
  ) {
    exitFullscreen();
  } else {
    requestFullscreen();
  }
};
