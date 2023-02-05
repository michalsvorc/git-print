# TypeScript Node.js template

Overview:

- Language: [TypeScript](https://www.typescriptlang.org)
- Package manager: [Yarn](https://yarnpkg.com) Plug'n'Play
- Testing: [Jest](https://jestjs.io)
- Linting: [TypeScript ESLint](https://typescript-eslint.io)
- Formatting: [Prettier](https://prettier.io)
- Module system: [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

## Installation

npm:

```console
npm install --save ts-nodejs-template
```

yarn:

```console
yarn add ts-nodejs-template
```

## Usage

```typescript
import { result } from "ts-nodejs-template";

console.log(result);
```

## Development

### Requirements

- [Yarn](https://yarnpkg.com/getting-started/install)
- [Editor SDKs](https://yarnpkg.com/getting-started/editor-sdks)

### Setup

Install dependencies and set up repository:

```console
yarn install && yarn run bootstrap
```

Development server:

```console
yarn run dev
```

### Guidelines

- [TypeScript style guide](https://google.github.io/styleguide/tsguide.html)
- [Conventional commits](https://github.com/conventional-changelog/commitlint#what-is-commitlint)
- [Releases](https://github.com/conventional-changelog/standard-version)
