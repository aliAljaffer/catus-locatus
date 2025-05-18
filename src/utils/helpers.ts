import { LatLngExpression } from "leaflet";
import supabase from "./supabase";

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
  return true;
}

export const DEFAULT_POINT: LatLngExpression = [24.732715, 46.676868];

export function formatDate(date: Date | string): string {
  let processedDate;
  if (typeof date === "string") {
    processedDate = new Date(date);
  } else processedDate = date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(processedDate);
}

export function obfuscate(str: string): string {
  const halfLen = Math.ceil(str.length / 2);
  const obfuscated = str.slice(0, halfLen) + c("*", halfLen);
  return obfuscated;
}

export function c(char: string, num: number): string {
  return Array.from({ length: num }, () => char).join("");
}

export const STALE_TIME = 1000 * 60 * 60 * 12;
export const APP_ROUTE = "/";

export async function uploadImage(file: File) {
  const { data, error } = await supabase.storage
    .from("images") // your bucket name
    .upload(`public/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  // Get the public URL of the uploaded image
  const publicUrl = supabase.storage.from("images").getPublicUrl(data.path)
    .data.publicUrl;
  return publicUrl;
}
