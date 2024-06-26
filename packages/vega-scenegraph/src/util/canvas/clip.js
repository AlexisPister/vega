import {hasCornerRadius, rectangle} from '../../path/shapes';
import {isFunction} from 'vega-util';

export default function(context, scene) {
  var clip = scene.clip;

  context.save();

  if (isFunction(clip)) {
    context.beginPath();
    clip(context);
    context.clip();
  } else {
    clipGroup(context, scene.group);
  }
}

export function clipGroup(context, group) {
  context.beginPath();

  // Added
  let xClip = group.cx ?? 0;
  let yClip = group.cy ?? 0;

  hasCornerRadius(group)
    ? rectangle(context, group, 0, 0)
    : context.rect(xClip, yClip, group.width || 0, group.height || 0);
  // hasCornerRadius(group)
  //   ? rectangle(context, group, 0, 0)
  //   : context.rect(0, 0, group.width || 0, group.height || 0);
  context.clip();
}
