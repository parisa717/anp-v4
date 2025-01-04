# Nexus UI

Home of the Nexus frontend apps, set up via [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) and [NX](https://nx.dev/)

## Content

- [Prerequisite](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)
  - [Scaffolding](#scaffolding)
  - [Development and building](#development-and-building)
  - [Testing](#testing)
    - [Integration tests](#integration-tests)
  - [Docker](#docker)
  - [Connecting to gateway](#connecting-to-gateway)
  - [Additional](#additional)
- [Packages](#packages)
  - [Component library](#component-library)
  - [Internationalization](#internationalization)
- [House rules](#house-rules)
  - [Git](#git)
  - [Code quality](#code-quality)

## Prerequisite

To install, develop and build the projects you'll need [Node.js](https://nodejs.org/en), version 20 or above.  
We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage node versions

**Using Docker is highly recommended**. To execute commands from inside of the docker, run `make cli`.

## Installation

### In the Docker <recommended>

Follow instructions from the https://avag-it.atlassian.net/wiki/x/A4DeCw

### In the host machine

`npm i` to install dependencies for all apps

## Usage

### Scaffolding

Run `make create-ui` to open a prompt which will guide you in setting up a new nexus-ui app. The new app will be created using `@nexus-ui/concept-car` app as a template. For that reason all cross app feature should be added to the
`@nexus-ui/concept-car` app to make sure that each new app has the same features

### Development and building

`make start` to serve an app in dev mode. Here are the URLs for each application when started through docker:

- Workshop Scheduler: https://workshop-scheduler.nexus.dev
- Technical Admin: https://technical-admin.nexus.dev
- Mock GQL Server: https://mock-gql-server.nexus.dev

`make build` to build an app  
`make start-prod` to serve an app in prod mode

### Manual

Execute all commands from the `app` directory.

`npx nx dev <app-name>` to serve an app in dev mode  
`npx nx build <app-name>` to build an app  
`npx nx preview <app-name>` to serve an app in prod mode

`npx nx run-many -t <command>` to run a command for all apps

### Testing

Unit and integration tests are handled by [Cypress](https://www.cypress.io/) and are located in `cypress` folder in the individual nexus-ui app folder.  
The folder structure of unit and integration test should reflect the application folder structure.

`npm nx test:open <app-name>` to spin up [Cypress launchpad](https://docs.cypress.io/guides/getting-started/opening-the-app#The-Launchpad) used to choose the type of tests to run, interact with the components and debug tests.

#### Integration tests

In Cypress world, integration tests are called component tests and are found in `/cypress/component` folder.

`npx nx test:component <app-name>` to run component tests in headless mode

### Connecting to gateway

1. Follow the steps in the following confluence document: https://avag-it.atlassian.net/wiki/x/A4DeCw
2. You will need the following gateways:
   - `technical-admin-gateway`: https://gitlab.avag.eu/nexus/service/gateway/technical-admin-gateway
   - `workshop-scheduler-gateway`: https://gitlab.avag.eu/nexus/service/gateway/workshop-scheduler-gateway
3. If you are running into issues with the installation on a `macOS` machine, try to check out the comments at the end of the confluence document: https://avag-it.atlassian.net/wiki/spaces/NXA/pages/199131139/20.20.40+Development+environment+installation?focusedCommentId=302088195

### Additional

`npx nx graph` to open the project graph of the workspace in the browser  
`npx nx affected -t <command>` to run custom commands for all affected projects

## House rules

### Git

The repo uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for structuring the commit messages and enforces it via [commitlint](https://commitlint.js.org/) and [husky git hooks](https://typicode.github.io/husky/).

Example of a conventional commit message taken from [docs](https://www.conventionalcommits.org/en/v1.0.0/#examples)

```
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

NXA-111
```

### Code quality

Code quality is being enforced via [eslint](https://eslint.org/) and [prettier](https://prettier.io/) by running both on staged files before committing.

This is done via [lint-staged](https://www.npmjs.com/package/lint-staged) in `pre-commit` hook. Prettier will format all staged files and eslint will report errors in the console preventing committing code changes until the errors are addressed.

## Packages

### Component library

#### `@nexus-ui/ui`

Most of the reusable components are provided by [PrimeReact](https://primereact.org/) and can be inspected at [PrimeReact docs](https://primereact.org/button/).

Other reusable components that aren't available in PrimeReact component library are available via [`@nexus-ui/ui` package](https://gitlab.avag.eu/nexus/nexus-ui/-/tree/main/packages/ui).

Component library is implemented with [storybook](https://storybook.js.org/) workshop environment

`npx nx storybook @nexus-ui/ui` to serve storybook documentation

### Internationalization

#### `@nexus-ui/i18n`

Translations are handled by `@nexus-ui/i18n` package via [`i18next`](https://i18next.com/) and [`react-i18next`](https://react.i18next.com/) frameworks.

`@nexus-ui/i18n` is a wrapper around `react-i18next` that handles loading json resource files by exposing `initInternationalization` function which takes an array of languages that the app supports.

```tsx
import { initInternationalization } from '@nexus-ui/i18n'

initInternationalization(['de', 'en'])
```

All the resource files are currently kept in the package folder to be shared between various packages and apps.

Deutch (de) language is the fallback language as well as the default.

### Execute mock GraphQL server

1. Run `npx nx mock-server @nexus-ui/workshop-scheduler`.
2. Open the browser console and paste the code from `apps/workshop-scheduler/src/mockServer/requestExample.js`. It'll output the mock data for appointments.

## GraphQL

We are using [GraphQL-Codegen](https://the-guild.dev/graphql/codegen) package to automate the generation of
RTK Query hooks and TypeScript types based on GraphQL schema and GraphQL operations files.

### Automatic generation of TypeScript types based on GraphQL schema

#### `@nexus-ui/workshop-scheduler` application

Prior to building the workshop-scheduler application we generate the TypeScript types based on the server GraphQL schema
Currently, it is placed under `apps/workshop-scheduler/src/api/types.generated.ts`.

If you wish to generate those types on your own, execute `npx nx gql:generate @nexus-ui/workshop-scheduler`.

### Automatic generation of RTK Query hooks and corresponding TypeScript types based on GraphQL operations files

#### `@nexus-ui/workshop-scheduler` application

Prior to building the workshop-scheduler application we generate RTK Query hooks and corresponding TypeScript types
based on the project files with the `.graphql` extension.
Currently, those files have `.generated` in their name, for example, `GetAppointments.generated.ts`.

If you wish to generate those hooks & types on your own, execute `npx nx gql:generate @nexus-ui/workshop-scheduler`.
