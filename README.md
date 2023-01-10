## Hexlet tests and linter status:

[![Actions Status](https://github.com/elenashcherbinina/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/elenashcherbinina/frontend-project-46/actions)
[![Node CI](https://github.com/elenashcherbinina/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/elenashcherbinina/frontend-project-46/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/83a85c1fbd15ca143ee0/maintainability)](https://codeclimate.com/github/elenashcherbinina/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/83a85c1fbd15ca143ee0/test_coverage)](https://codeclimate.com/github/elenashcherbinina/frontend-project-46/test_coverage)

## Project description:

The compare utility finds and shows the difference between two json or yaml-files.

Formatters:

- `stylish` (as default)
- `plain`
- `json`

## Requirements:

node.js 16.0+

## Install:

```
git clone git@github.com:elenashcherbinina/frontend-project-46.git
npm ci or make install
```

## Usage:

```
gendiff [options] <filepath1> <filepath2>
```

## Options:

- `-V, --version` shows current application version
- `-h, --help` shows help information
- `-f, --format` select format for output

## Project Demos:

**1. Getting diff for `json` files**

[![asciicast](https://asciinema.org/a/o1412RIu6ckAfIxS7s75goXIn.svg)](https://asciinema.org/a/o1412RIu6ckAfIxS7s75goXIn)

**2. Getting diff for `yaml` files**

[![asciicast](https://asciinema.org/a/xnGlkJIA2DX84TVbcxUo0oGA1.svg)](https://asciinema.org/a/xnGlkJIA2DX84TVbcxUo0oGA1)

**3. Getting diff for json-files in `stylish` format**

[![asciicast](https://asciinema.org/a/5lyQZAMFb5gaPmLygQWLug5yW.svg)](https://asciinema.org/a/5lyQZAMFb5gaPmLygQWLug5yW)

**4. Getting diff for json-files in `plain` format**

[![asciicast](https://asciinema.org/a/zE2BVg14jKpRB8C9nC53dE9i8.svg)](https://asciinema.org/a/zE2BVg14jKpRB8C9nC53dE9i8)

**5. Getting diff for json-files in `json` format**

[![asciicast](https://asciinema.org/a/CK12SPfcJp0VRbQ4gl3kh6meW.svg)](https://asciinema.org/a/CK12SPfcJp0VRbQ4gl3kh6meW)
