#!/usr/bin/env node

import { exit } from "node:process";
import { JSDOM } from "jsdom";
import cytoscape from "cytoscape";
import serialize from "w3c-xmlserializer";
import { program } from "commander";
import { readFileSync, writeFileSync } from "node:fs";

// TODO: Inlining those values would be faster than read it every time
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { version, description } = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json")).toString()
);
// import pkg from "../package.json" assert { type: "json" };

// browser polyfills
class XMLSerializer {
  serializeToString(node) {
    return serialize(node);
  }
}
global.XMLSerializer = XMLSerializer;

const dom = new JSDOM(`<!DOCTYPE html><div id="cy"></div>`);
global.window = dom.window;
global.document = dom.window.document;

// CLI
program
  .description(description)
  .version(version)
  .option("-d, --destination <path>")
  .option("-s, --source <path>");
program.parse();

const defaults = {
  elements: [],
  style: [],
  layout: {
    name: "grid",
  },
  format: "svg",
  quality: 85,
  resolvesTo: "base64uri",
  background: "transparent",
  width: 400,
  height: 400,
};

const matches = program.opts();
let src = matches.source || "";
const dst = matches.destination || "";
const sourceRaw = JSON.parse(readFileSync(src === "" ? 0 : src, "utf-8"));

// Core logic
const loadExtension = async (name) => {
  try {
    const ext = (await import(`cytoscape-${name}`)).default;
    cytoscape.use(ext);
  } catch (e) {}
};

const source = { ...defaults, ...sourceRaw };
if (typeof source.layout === "object") {
  if (source.layout.fit === undefined) source.layout.fit = true;
  if (source.layout.animate === undefined) source.layout.animate = false;
  if (source.layout.boundingBox === undefined)
    source.layout.boundingBox = {
      x1: 0,
      y1: 0,
      x2: source.width,
      y2: source.height,
    };
}
// TODO: only svg works for now
source.format = "svg";

await loadExtension(source.layout.name);
const container = dom.window.document.querySelector("#cy");
const cy = cytoscape({ container, ...defaults, ...source });
cy.layout(source.layout).run();

let res = "";

switch (source.format) {
  case "jpeg":
    res = cy.jpeg({
      quality: source.quality,
      bg: source.background,
      maxWidth: source.width,
      maxHeight: source.height,
      output: source.resolvesTo,
    });
    break;
  case "png":
    res = cy.png({
      bg: source.background,
      maxWidth: source.width,
      maxHeight: source.height,
      output: source.resolvesTo,
    });
    break;
  case "svg":
    await loadExtension("svg");
    res = cy.svg({
      bg: source.background,
      full: true,
    });
    break;
  case "json":
    res = JSON.stringify(cy.json());
    break;
}

// due to some bug output contains two `xmlns:xlink` attributes
res = res.replace(`<svg xmlns:xlink="http://www.w3.org/1999/xlink"`, `<svg`);

if (dst) {
  writeFileSync(dst, res);
} else {
  console.log(res);
}

// Neither `cy.stop()` nor `cy.clearQueue()` work
exit(0);
