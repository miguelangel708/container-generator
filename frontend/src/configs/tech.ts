import { ElementType } from "@/@types/user-defined";

export const TECH_NAMES = [
  "angular",
  "react",
  "vue",
  "flask",
  "fastapi",
  "springboot",
  "node",
  "python",
  "mysql",
  "postgresql",
  "nginx",
  "laravel",
  "mariadb",
  "mongodb",
  "django",
  "express"
] as const;

// type Name = (typeof arr)[number]['name'];

export type TechName = ElementType<typeof TECH_NAMES>;

function getImgUrl(uri: string) {
  return new URL(`${uri}`, import.meta.url).href
}

export const TECH_IMAGES = TECH_NAMES.reduce<Record<TechName, string>>(
  (acc, name) => {
    acc[name] = getImgUrl(`/images/svg/${name}.svg`);
    return acc;
  },
  {} as Record<TechName, string>,
);

// TECH_IMAGES["mongodb"] = require("../assets/mongodb.jpeg");

interface TechItem {
  id: TechName;
  image: string;
}

export const TECH_ITEMS: Array<TechItem> = TECH_NAMES.map((name) => ({
  id: name,
  image: TECH_IMAGES[name],
}));
