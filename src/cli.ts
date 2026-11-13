#!/usr/bin/env node
import { styleText } from "node:util";
import figlet from "figlet";

const links = [
  { label: "GitHub", url: "https://github.com/naitokosuke" },
  { label: "Twitter", url: "https://twitter.com/naitokosuke" },
];

// Wide terminals get ANSI Shadow, narrow ones the compact Rubifont
const wide = (process.stdout.columns ?? 80) >= 104;
const font = wide ? "ANSI Shadow" : "Rubifont";
const name = figlet
  .textSync("naitokosuke", { font })
  .split("\n")
  .filter((l) => l.trim());

// Pixel hearts as tall as each font (2 pixel rows per terminal line)
// prettier-ignore
const hearts = {
  large: [
    "..###....###..",
    ".#####..#####.",
    "##############",
    "##############",
    "##############",
    ".############.",
    ".############.",
    "..##########..",
    "...########...",
    "....######....",
    ".....####.....",
    "......##......",
  ],
  small: [
    ".##....##.",
    "####..####",
    "##########",
    "##########",
    ".########.",
    "..######..",
    "...####...",
    "....##....",
  ],
};

// 2x2 pixels per cell, indexed by TL | TR<<1 | BL<<2 | BR<<3
const quadrants = " ▘▝▀▖▌▞▛▗▚▐▜▄▙▟█";
function render(rows: string[]) {
  const on = (x: number, y: number) => +(rows[y]?.[x] === "#");
  const lines: string[] = [];
  for (let y = 0; y < rows.length; y += 2) {
    let line = "";
    for (let x = 0; x < rows[0].length; x += 2) {
      line +=
        quadrants[on(x, y) | (on(x + 1, y) << 1) | (on(x, y + 1) << 2) | (on(x + 1, y + 1) << 3)];
    }
    lines.push(line);
  }
  return lines;
}
const heart = render(wide ? hearts.large : hearts.small);

const truecolor =
  process.stdout.isTTY && process.stdout.hasColors(2 ** 24) && !process.env.NO_COLOR;
const lime = (s: string) =>
  truecolor ? `\x1b[38;2;140;252;0m${s}\x1b[39m` : styleText("green", s);
const link = (href: string, text: string) =>
  process.stdout.isTTY ? `\x1b]8;;${href}\x07${text}\x1b]8;;\x07` : text;

const logo = heart.map((h, i) => lime(`${h}  ${name[i]}`));

const lines = [
  "",
  ...logo,
  "",
  ...links.map(
    ({ label, url }) =>
      `${styleText("dim", label.padEnd(9))}${link(url, url.replace("https://", ""))}`,
  ),
  "",
];

console.log(lines.map((l) => `  ${l}`).join("\n"));
