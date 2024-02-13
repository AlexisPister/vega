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

      // console.log(item, x, y, gx, gy, test);

      // if in bounding box, perform more careful test
      if (test(context, item, x, y, gx, gy)) {
        console.log("OOOOK")
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

    // let test =  path(context, o) ? false :
    //   (fill && context.isPointInPath(x, y)) ||
    //   (stroke && context.isPointInStroke(x, y));

    // console.log(222, path(context, o), path, context);
    console.log(path);

    // let test =  path(context, o) ? false :
    //   (fill && context.isPointInPath(x, y)) ||
    //   (stroke && context.isPointInStroke(x, y));


    // console.log(context.isPointInPath(0, 0))
    // console.log(context.isPointInPath(3, 3))
    // console.log(context.isPointInPath(104, 92))
    // console.log(context.isPointInPath(304, 280))
    // console.log(context.isPointInStroke(0, 0))
    // console.log(context.isPointInStroke(3, 3))
    // console.log(context.isPointInStroke(104, 92))
    // console.log(context.isPointInStroke(304, 280))

    // console.log(context, lw, lc)

    path(context, o);

    // console.log(context.isPointInPath(x * 3, y * 3));
    // console.log(context.isPointInPath(x, y));

    let test = (fill && context.isPointInPath(x * 3, y * 3)) ||
      (stroke && context.isPointInStroke(x * 3, y * 3));

    return test;
  };
}

export function pickPath(path) {
  return pick(hitPath(path));
}
