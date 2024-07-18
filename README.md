# BE-FSW

## Pre-reading Rules to Contribute
- The documentation about commit message convetion: https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13
- Best practice for branch naming and commit message: https://medium.com/@shinjithkanhangad/git-good-best-practices-for-branch-naming-and-commit-messages-a903b9f08d68

## How to Contribute
- Create a new branch with the following naming convention: `<type>/<task>`
- Make your changes
- Push your changes to the branch you created
- Pull request your branch into develop

## How to Setup
- Clone this repository
- Run this command to instal dependencies:
```
npm install
```
- Run this command to pull .env file
```
npx dotenv-vault@latest pull
```
- OR Rename .env.example to .env and fill in the section that must be filled
- Run this command to start the development server:
```
npm run dev
```
