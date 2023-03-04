# git-print

Print normalized git status output for command line usage.

```shell
$ git status -s

# Output:
$ M  README.md
$  M src/index.js
$ ?? src/index.spec.js

$ git-print

# Output:
$ /path/to/README.md /path/to/src/index.js /path/to/src/index.spec.js
```

## Content

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)
- [Development](#development)
- [Acknowledgement](#acknowledgement)

## Installation

npm:

```shell
npm install --save-dev git-print
```

yarn:

```shell
yarn add --dev git-print
```

## Usage

```shell
git-print [OPTIONS]
```

When there are no changes in the current git repository, `git-print` exits with status code `1` instead of printing an empty file list.

This allows for streamlined conditional chaining with other commands.

## Options

#### --cwd=`<string>`

Default: `./`

Provide a custom execution path.

#### --deleted=`<boolean>`

Default: `true`

Toggle listing of files with status `deleted`.

#### --staged=`<boolean>`

Default: `true`

Toggle listing of `staged` files.

#### --staged-only=`<boolean>`

Default: `true`

Shorthand option for listing of `staged` files only.

This option makes the output suitable for processing with linting and formatting tools.

Same as manually specifying options:

```shell
git-print \
  --staged=true \
  --deleted=false \
  --unstaged=false \
  --untracked=false
```

#### --unstaged=`<boolean>`

Default: `true`

Toggle listing of `unstaged` files.

#### --untracked=`<boolean>`

Default: `true`

Toggle listing of `untracked` files.

## Examples

Run Prettier formatting on staged files, or format the current directory when no files are staged.

`package.json`:

```json
{
  "scripts": {
    "prettier": "yarn prettier --write $(git-print --staged-only || printf '.')"
  }
}
```

## Development

### Requirements

- [Yarn](https://yarnpkg.com/getting-started/install)
- [Editor SDKs](https://yarnpkg.com/getting-started/editor-sdks)

### Setup

Install dependencies:

```shell
yarn install
```

Run development server:

```shell
yarn run dev
```

Execute build:

```shell
yarn start [OPTIONS]
```

### Guidelines

- [TypeScript style guide](https://google.github.io/styleguide/tsguide.html)
- [Conventional commits](https://github.com/conventional-changelog/commitlint#what-is-commitlint)
- [Releases](https://github.com/conventional-changelog/standard-version)

## Acknowledgement

List of similar projects with API usage:

- [staged-git-files](https://www.npmjs.com/package/staged-git-files)
- [git-changed-files](https://www.npmjs.com/package/git-changed-files)
- [jest-changed-files](https://www.npmjs.com/package/jest-changed-files)
