#!/usr/bin/env node
import { styleText } from "node:util";

const lines = [
  styleText(["bold", "cyan"], "naitokosuke"),
  "",
  `${styleText("dim", "GitHub")}  https://github.com/naitokosuke`,
];

console.log(`\n${lines.map((l) => `  ${l}`).join("\n")}\n`);
