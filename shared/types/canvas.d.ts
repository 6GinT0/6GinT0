import type { Database } from "./supabase";

export type Point = {
  x: number;
  y: number;
};

export type Stroke = {
  points: Point[];
  lightColor: string;
  darkColor: string;
};

export type Sign = Database["public"]["Tables"]["canvas"]["Insert"]["sign"];
