# A Light / Dark Themed Next.js Starter Kit

> Starting a NextJS project can be quite time-consuming and tedious. So why waste your precious time when you can have pretty much everything you need to start a new
> **Next.js** project packed in this **Starter Kit**

> Thank you to [Kahlil](https://github.com/kahlil/dark) for the inspiration. I've started by forking the repo and
> ended up making quite some changes.
>
> Added eslint and prettier from
> [paulintrognon.fr](https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js).

## Included in this Starter Kit

1. Type System with [Typescript](https://www.typescriptlang.org/)
2. Linting with [Eslint](https://eslint.org/) & [Prettier](https://prettier.io)
3. Code Analysis with [Github super-linter](https://github.com/github/super-linter)
4. Ui Library [Chakra UI](https://chakra-ui.com)
5. Pre-commit hooks with [Pretty Quic](https://github.com/azz/pretty-quic) & [Husky](https://typicode.github.io/husk)
6. Unit Testing with [Jest](https://jestjs.io/) & [Texting Library](https://testing-library.com/)
7. E2E Testing with [Cypress](https://cypress.io)
8. CI/CD with [Github Actions](https://github.com/features/actions)

## Getting Started

You can use this **Starter Kit** in a couple of different ways.

1. You can use this starter kit as an example for **NextJs**
   `yarn create next-app my-app --example https://github.com/alveshelio/next-chakra-ui-starter-kit`
2. You can generate a new Repo from this one with
   [github.com/alveshelio/next-chakra-ui-starter-kit](https://github.com/alveshelio/next-chakra-ui-starter-kit/generate)
3. You can clone this repo
   `git clone https://github.com/alveshelio/next-chakra-ui-starter-kit my-app`
4. `cd my-app`
5. Install dependencies `yarn install`
6. Start the server `yarn dev`
7. Hit the ground running with Next.js, TypeScript & Chakra UI

Please refer to the respective docs (linked above) in order to learn about these technologies.

## Documentation

### CI/CD

This starter kit is using Github Actions to handle the **CI / CD**. Whenever we commit to a branch or main we are
going to run the linter, unit tests and e2e tests. And when we push to main we are going to publish the site to
Amazon S3.
If you are using a different **CI / CD** you'll need to remove all the files in directory `.github/workflows`

#### How to remove code linting with Github super-linter?

If you don't wish to analyse your code with super-linter you can simply remove file `.github/workflows/linter.yml`

#### How to remove code linting with Github super-linter?

You're not using NextJS as a Static Site Generator (SSG)
First you need to change the script `build` in `package.json` to
`"build": "next build"`. <br />
Then you need to remove file `.github/workflows/deploy.yml`

#### I'm deploying my site to another provider other than **Vercel**

The Github action configured in this starter kit will deploy a static site to an Amazon S3 bucket, if you want to
deploy to another provider, in that case you need to updated
file `. github/workflows/deploy.yml` to suite your platform needs.

## Warning

You could be tempted to use `const { colorMode, toggleColorMode } = useColorMode()` to toggle the theme color
directly within a page, don't do that. `colorMode` will always return undefined.
You need to use `usetColorMode()` hook within a component and import this component in the page where you want to use it.

## Notes

I recommend you use [n](https://github.com/tj/n) to manage your Node and Yarn versions.

## License

MIT
