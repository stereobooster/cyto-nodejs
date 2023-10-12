import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, existsSync, readFileSync } from "node:fs";
import { cytoSnap } from "../index.js";

const assertEqualFiles = async (file) => {
  const f1 = readFileSync("test/data/" + file).toString()
  const f2 = readFileSync("test/tmp/" + file).toString()
  assert.equal(f1, f2);
};

if (!existsSync("test/tmp")) mkdirSync("test/tmp");
if (!existsSync("test/diff")) mkdirSync("test/diff");

test("graph 1", async () => {
  await cytoSnap("data/g1.json", "tmp/g1.svg");
  await assertEqualFiles("g1.svg");
});

test("graph 2", async () => {
  await cytoSnap("data/g2.json", "tmp/g2.svg");
  await assertEqualFiles("g2.svg");
});

test("graph 3", async () => {
  await cytoSnap("data/g3.json", "tmp/g3.svg");
  await assertEqualFiles("g3.svg");
});

test("graph 4", async () => {
  await cytoSnap("data/g4.json", "tmp/g4.svg");
  await assertEqualFiles("g4.svg");
});

test("graph 5", async () => {
  await cytoSnap("data/g5.json", "tmp/g5.svg");
  await assertEqualFiles("g5.svg");
});

test("graph 6", async () => {
  await cytoSnap("data/g6.json", "tmp/g6.svg");
  await assertEqualFiles("g6.svg");
});

test("graph 7", async () => {
  await cytoSnap("data/g7.json", "tmp/g7.svg");
  await assertEqualFiles("g7.svg");
});

test("graph 8", async (t) => {
  t.skip("elk doesn't work");
  // await cytoSnap("data/g8.json", "tmp/g8.svg");
  // await assertEqualFiles("g8.svg");
});

test("graph 9", async () => {
  await cytoSnap("data/g9.json", "tmp/g9.svg");
  await assertEqualFiles("g9.svg");
});

test("graph 10", async (t) => {
  t.skip(
    "impossible to test force layout, because it produce different layout every time"
  );
  // await cytoSnap("data/g10.json", "tmp/g10.svg");
  // await assertEqualFiles("g10.svg");
});

test("graph 11", async (t) => {
  await cytoSnap("data/g11.json", "tmp/g11.svg");
  await assertEqualFiles("g11.svg");
});