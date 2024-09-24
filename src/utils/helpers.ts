import { LatLngExpression } from "leaflet";

export function isDifferentCoord(
  posA: LatLngExpression,
  posB: LatLngExpression,
) {
  if (Array.isArray(posA) && Array.isArray(posB)) {
    if (posA[0] === posB[0] && posA[1] === posB[0]) return false;
  } else if (Array.isArray(posA) && !Array.isArray(posB)) {
    if (posA[0] === posB.lat && posA[1] === posB.lng) return false;
  } else if (!Array.isArray(posA) && Array.isArray(posB)) {
    if (posA.lat === posB[0] && posA.lng === posB[1]) return false;
  } else if (!Array.isArray(posA) && !Array.isArray(posB)) {
    if (posA.lat === posB.lat && posA.lng === posB.lng) return false;
  }
  console.log("DIFFERENT");
  return true;
}
