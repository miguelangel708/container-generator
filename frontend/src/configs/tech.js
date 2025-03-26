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
  "Laravel",
  "mariadb",
];

export const TECH_IMAGES = TECH_NAMES.reduce((acc, name) => {
  acc[name] = require(`../assets/${name}.png`);
  return acc;
}, {});
TECH_IMAGES["mongodb"] = require("../assets/mongodb.jpeg");

export const TECH_ITEMS = TECH_NAMES.map((name) => ({
  id: name,
  image: TECH_IMAGES[name],
}));
