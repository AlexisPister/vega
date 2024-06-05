function devicePixelRatio() {
  return typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
}


export default function(canvas, width, height, origin, scaleFactor, opt) {
  const inDOM = typeof HTMLElement !== 'undefined'
              && canvas instanceof HTMLElement
              && canvas.parentNode != null,
        context = canvas.getContext('2d');
        // ratio = inDOM ? devicePixelRatio() : scaleFactor;

  // const ratio = scaleFactor;
  const ratio = 2;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  // canvas.width = width;
  // canvas.height = height;

  for (const key in opt) {
    context[key] = opt[key];
  }

  if (inDOM && ratio !== 1) {
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }

  // context.pixelRatio = 1;
  context.pixelRatio = ratio;

  // context.setTransform(
  //   ratio, 0, 0, ratio,
  //   ratio * origin[0],
  //   ratio * origin[1]
  // );

  scaleFactor *= ratio;

  // Added: need the origin and scale for event detection later (hitpath fct)
  context.origin = origin;
  context.scale = scaleFactor;

  context.setTransform(
    scaleFactor, 0, 0, scaleFactor,
    scaleFactor * origin[0],
    scaleFactor * origin[1]
  );

  return canvas;
}
