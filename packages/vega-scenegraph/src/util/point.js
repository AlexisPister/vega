export default function(event, el) {
  const rect = el.getBoundingClientRect();
  const point = [
    event.clientX - rect.left - (el.clientLeft || 0),
    event.clientY - rect.top - (el.clientTop || 0)
  ];
  return point;
}
