import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const aasaPath = resolve(
  root,
  "dist/.well-known/apple-app-site-association"
);
const joinPath = resolve(root, "dist/join/index.html");
const appID = "K794F89ADB.com.EclipseStudio.Kupid";

const [aasaSource, joinSource] = await Promise.all([
  readFile(aasaPath, "utf8"),
  readFile(joinPath, "utf8")
]);
const aasa = JSON.parse(aasaSource);
const details = aasa?.applinks?.details;
if (!Array.isArray(details) || details.length !== 1) {
  throw new Error("AASA must contain exactly one scoped applinks detail.");
}
if (details[0]?.appIDs?.length !== 1 || details[0].appIDs[0] !== appID) {
  throw new Error("AASA is not scoped to the Kupid application identifier.");
}
const expectedComponents = [
  { path: "/join", fragment: "invite=?*" },
  { path: "/join/", fragment: "invite=?*" }
];
const components = details[0].components ?? [];
for (const expected of expectedComponents) {
  if (!components.some(
    (component) => component["/"] === expected.path
      && component["#"] === expected.fragment
      && component.exclude !== true
  )) {
    throw new Error(`AASA is missing ${expected.path} fragment scoping.`);
  }
}

for (const forbidden of [
  "location.search",
  "localStorage",
  "sessionStorage",
  "fetch(",
  "XMLHttpRequest",
  "sendBeacon"
]) {
  if (joinSource.includes(forbidden)) {
    throw new Error(`Join fallback contains forbidden network/storage surface: ${forbidden}`);
  }
}
for (const required of ["location.hash", "hashchange", "invite", "icloud.com"]) {
  if (!joinSource.includes(required)) {
    throw new Error(`Join fallback is missing required behavior: ${required}`);
  }
}

console.log("Validated serverless Me & You invitation assets.");
