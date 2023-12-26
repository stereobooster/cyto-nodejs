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
  await cytoSnap("test/data/g1.json", "test/tmp/g1.svg");
  await assertEqualFiles("g1.svg");
});

test("graph 2", async () => {
  await cytoSnap("test/data/g2.json", "test/tmp/g2.svg");
  await assertEqualFiles("g2.svg");
});

test("graph 3", async () => {
  await cytoSnap("test/data/g3.json", "test/tmp/g3.svg");
  await assertEqualFiles("g3.svg");
});

test("graph 4", async () => {
  await cytoSnap("test/data/g4.json", "test/tmp/g4.svg");
  await assertEqualFiles("g4.svg");
});

test("graph 5", async () => {
  await cytoSnap("test/data/g5.json", "test/tmp/g5.svg");
  await assertEqualFiles("g5.svg");
});

test("graph 6", async () => {
  await cytoSnap("test/data/g6.json", "test/tmp/g6.svg");
  await assertEqualFiles("g6.svg");
});

test("graph 7", async () => {
  await cytoSnap("test/data/g7.json", "test/tmp/g7.svg");
  await assertEqualFiles("g7.svg");
});

test("graph 8", async (t) => {
  t.skip("elk doesn't work");
  // await cytoSnap("test/data/g8.json", "test/tmp/g8.svg");
  // await assertEqualFiles("g8.svg");
});

test("graph 9", async () => {
  await cytoSnap("test/data/g9.json", "test/tmp/g9.svg");
  await assertEqualFiles("g9.svg");
});

test("graph 10", async (t) => {
  t.skip(
    "impossible to test force layout, because it produce different layout every time"
  );
  // await cytoSnap("test/data/g10.json", "test/tmp/g10.svg");
  // await assertEqualFiles("g10.svg");
});

test("graph 11", async (t) => {
  await cytoSnap("test/data/g11.json", "test/tmp/g11.svg");
  await assertEqualFiles("g11.svg");
});