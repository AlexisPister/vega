function devicePixelRatio() {
  return typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
}

export default function(canvas, width, height, origin, scaleFactor, opt) {
  const inDOM = typeof HTMLElement !== 'undefined'
              && canvas instanceof HTMLElement
              && canvas.parentNode != null,
        context = canvas.getContext('2d');
        // ratio = inDOM ? devicePixelRatio() : scaleFactor;

  const ratio = 3;

  // canvas.width = width * ratio;
  // canvas.height = height * ratio;
  canvas.width = width;
  canvas.height = height;

  for (const key in opt) {
    context[key] = opt[key];
  }

  if (inDOM && ratio !== 1) {
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }

  context.pixelRatio = 1;
  // context.pixelRatio = ratio;

  context.setTransform(
    ratio, 0, 0, ratio,
    ratio * origin[0],
    ratio * origin[1]
  );

  // context.scale(ratio, ratio);

  return canvas;
}
