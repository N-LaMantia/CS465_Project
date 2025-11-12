# Guidelines

## GIT Usage

### Major Branches

- main
- dev

### Flow

- All work must be done on branches off the `dev` branch
- All work must be merged into the `dev` branch through PRs
- Branches must be deleted after PR
- Version numbers should be updated in the README.md/package.json when merging.
  (pushes to `dev` are minor revisions, pushes to `main` are major revisions)
- All commit messages must contain a description of the change

### Pull Requests

- All PRs must have a description of the change (who, what, when, why)
- PRs must be approved by at least two members of the team

### Testing

- Tests should be run through GitHub Actions after every push to `dev`
- Tests should be created for new features and updated for bug fixes
- Tests should validate all required functionality as defined in the [Feature Descriptions](./FeatureDescriptions.md) file.

## Style Guide

[Style Guide](./StyleGuide.md)

## Communication

- Discord will be the main communication channel
- All communication should be in English
- Monday.com will be used for task management (like a to-do list)

## Documentation

- The majority of the documentation will be auto-generated according to comments.

### Requirements

- All features must have a set of requirements that must be defined in the
  [Feature Descriptions](./FeatureDescriptions.md) file.

#### Prior to Coding

- Base requirements for the project and each feature must be defined.
