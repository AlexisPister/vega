import {pickVisit} from '../visit';
import {truthy} from 'vega-util';

export function pick(test) {
  test = test || truthy;

  return function(context, scene, x, y, gx, gy) {
    // x *= context.pixelRatio;
    // y *= context.pixelRatio;

    return pickVisit(scene, item => {
      const b = item.bounds;

      // first hit test against bounding box
      if ((b && !b.contains(gx, gy)) || !b) {
        return;
      }

      // if in bounding box, perform more careful test
      if (test(context, item, x, y, gx, gy)) {
        return item;
      }
    });
  };
}

export function hitPath(path, filled) {
  return function(context, o, x, y) {

    var item = Array.isArray(o) ? o[0] : o,
        fill = (filled == null) ? item.fill : filled,
        stroke = item.stroke && context.isPointInStroke, lw, lc;

    if (stroke) {
      lw = item.strokeWidth;
      lc = item.strokeCap;
      context.lineWidth = lw != null ? lw : 1;
      context.lineCap   = lc != null ? lc : 'butt';
    }

    // Previous code
    // return path(context, o) ? false :
    //   (fill && context.isPointInPath(x, y)) ||
    //   (stroke && context.isPointInStroke(x, y));

    // Change: go back from vis to canvas coordinates.
    // CHECK HOW TO HANDLE PADDING THERE
    const transform = context.getTransform();
    const scaleFactor = transform.a;
    const dx = transform.e - (25 * scaleFactor);
    const dy = transform.f - (25 * scaleFactor);
    const xCanvas = x * scaleFactor + dx;
    const yCanvas = y * scaleFactor + dy;

    // const dx = transform.e - (25 * scaleFactor * context.pixelRatio);
    // const dy = transform.f - (25 * scaleFactor * context.pixelRatio);
    // const xCanvas = x * (scaleFactor * context.pixelRatio) + dx;
    // const yCanvas = y * (scaleFactor * context.pixelRatio) + dy;

    path(context, o);

    // const test = (fill && context.isPointInPath(x * scaleFactor, y * scaleFactor)) ||
    //   (stroke && context.isPointInStroke(x * scaleFactor, y * scaleFactor));
    const test = (fill && context.isPointInPath(xCanvas, yCanvas)) ||
      (stroke && context.isPointInStroke(xCanvas, yCanvas));

    return test;
  };
}

export function pickPath(path) {
  return pick(hitPath(path));
}
