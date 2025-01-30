# Contributing to Praetor

First off, thank you for considering contributing to Praetor! We value all kinds of contributions, from bug reports to documentation improvements to new features.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project and everyone participating in it are governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [project email].

## Getting Started

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/praetor.git
cd praetor
```
3. Install dependencies:
```bash
npm install
# or
yarn install
```
4. Create a branch for your changes:
```bash
git checkout -b feature/your-feature-name
```

## Development Process

1. Run tests to ensure everything is working:
```bash
npm test
```

2. Start development server:
```bash
npm run dev
```

3. Make your changes
4. Write or update tests as needed
5. Run the test suite to ensure everything still works
6. Update documentation if necessary

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation with details of any changes to the interface
3. Ensure your code follows our coding guidelines
4. Run all tests and ensure they pass
5. Submit your pull request with a clear title and description

Your pull request should include:
- A clear description of the changes
- Any updates to documentation
- New or updated tests
- Screenshot/gif if the changes affect the UI

## Coding Guidelines

### TypeScript Guidelines

- Use TypeScript strictly typed - no `any` unless absolutely necessary
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

Example:
```typescript
/**
 * Creates a new policy for managing resource permissions
 * @param name - The unique identifier for this policy
 */
export class Policy<Actor, Resource> {
    constructor(name: string) {
        // implementation
    }
}
```

### Testing Guidelines

- Write tests for all new features
- Maintain existing tests
- Aim for high test coverage
- Use descriptive test names

Example:
```typescript
describe('Policy', () => {
    it('should correctly evaluate a simple permission rule', () => {
        // test implementation
    });
});
```

## Reporting Bugs

When reporting bugs, please include:

1. Your operating system name and version
2. Any relevant details about your setup
3. Steps to reproduce the bug
4. Expected behavior
5. Actual behavior
6. Detailed description of the bug

## Suggesting Enhancements

When suggesting enhancements, please include:

1. A clear and detailed description of the feature
2. The motivation behind this feature
3. Any alternative solutions you've considered
4. If possible, a rough implementation sketch

## Working with Issues

- Search existing issues before creating a new one
- Use issue templates if available
- Be clear and descriptive
- Include examples when possible
- Tag issues appropriately

## Documentation

- Keep documentation up to date
- Document all public APIs
- Include examples in documentation
- Use clear and concise language

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a new release on GitHub
4. Publish to npm

## Questions?

Feel free to open an issue with your question or reach out to the maintainers directly.

Thank you for contributing to Praetor! 🚀