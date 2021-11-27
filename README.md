# git-print

Print normalized list of git status files for command line usage.

```console
$ git status -s

# Output:
$ M  README.md
$  M src/index.js
$ ?? src/index.spec.js

$ git-print

# Output:
$ /path/to/README.md /path/to/src/index.js /path/to/src/index.spec.js
```

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)
- [Changelog](#changelog)
- [API usage](#api-usge)

## Installation

yarn

```console
$ yarn add git-print --dev
```

npm

```console
$ npm install git-print --save-dev
```

## Usage

```console
$ git-print [OPTIONS]
```

When there are no changes in the current git repository, `git-print` exits with status code `1` instead of printing an
empty file list. This allows for streamlined conditional chaining with other commands.

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

```console
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

package.json:

```json
"scripts": {
  "prettier": "yarn prettier --write $(git-print --staged-only || printf '.')"
}
```

## Development

Clone this repository and execute:

```console
$ yarn run bootstrap
```

See list of available commands:

```console
$ yarn run
```

### Optional

Install [Yarn editor SDKs](https://yarnpkg.com/getting-started/editor-sdks/).

## Changelog

See the [releases](https://github.com/michalsvorc/git-print/releases) page.

## API usage

List of similar projects with API usage:

- [staged-git-files](https://www.npmjs.com/package/staged-git-files)
- [git-changed-files](https://www.npmjs.com/package/git-changed-files)
- [jest-changed-files](https://www.npmjs.com/package/jest-changed-files)
