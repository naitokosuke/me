# naitokosuke

[![npm](https://img.shields.io/npm/v/naitokosuke)](https://www.npmjs.com/package/naitokosuke)
[![CI](https://github.com/naitokosuke/me/actions/workflows/ci.yml/badge.svg)](https://github.com/naitokosuke/me/actions/workflows/ci.yml)

Self-introduction CLI of naitokosuke.

## Usage

```bash
bunx naitokosuke
```

```bash
vpx naitokosuke
```

```bash
npx naitokosuke
```

Node.js 26 or later is required.

## Development

```bash
vp install
vp pack
node dist/cli.mjs
```

## Release

Published from GitHub Actions with npm trusted publishing (OIDC) and provenance.

```bash
npm version patch
git push --follow-tags
```
