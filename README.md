# file-digger

[![Build Status](https://github.com/mgenware/file-digger/workflows/Build/badge.svg)](https://github.com/mgenware/file-digger/actions)
[![npm version](https://img.shields.io/npm/v/file-digger.svg?style=flat-square)](https://npmjs.com/package/file-digger)
[![Node.js Version](http://img.shields.io/node/v/file-digger.svg?style=flat-square)](https://nodejs.org/en/)

Extract files by sniffing file types (not by file extensions)

## Installation

```sh
npm i file-digger -g
```

## Usage

```
file-digger <source directory> <glob> <comma separated file types> <destination directory>
```

Some examples:

```sh
# Extract all png files.
file-digger "./src" "**/*" "png" "./dest"
```

### Supported file types

[Supported file types](https://github.com/sindresorhus/file-type#supported-file-types)
