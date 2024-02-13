export default function(event, el) {
  const rect = el.getBoundingClientRect();
  // return [
  //   event.clientX - rect.left - (el.clientLeft || 0),
  //   event.clientY - rect.top - (el.clientTop || 0)
  // ];

  let point = [
    event.clientX - rect.left - (el.clientLeft || 0),
    event.clientY - rect.top - (el.clientTop || 0)
  ];

  return [point[0] / 3, point[1] / 3];
}
