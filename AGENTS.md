# Development Guidelines for Agentic Coding

This document provides essential development guidelines for agentic coding agents working in this repository. It includes build/lint/test commands, code style guidelines, and references to existing configuration files.

**If an existing AGENTS.md file is present, follow its guidelines instead.**

## 1. Build/Lint/Test Commands

### Determining the Project Type
Before running any commands, agents MUST examine the repository to identify the technology stack:
- Check for `package.json` (Node.js/JavaScript/TypeScript projects)
- Check for `Cargo.toml` (Rust projects)
- Check for `pyproject.toml` or `setup.py` (Python projects)
- Check for `go.mod` (Go projects)
- Check for `Makefile`, `justfile`, or other build scripts

### Common Command Patterns

#### JavaScript/TypeScript Projects (Node.js, React, Next.js, etc.)
- **Build**: `npm run build` or `yarn build` or `pnpm build`
- **Development server**: `npm run dev` or `yarn dev` or `pnpm dev`
- **Lint**: `npm run lint` or `yarn lint` or `pnpm lint` (often uses ESLint, Prettier)
- **Type checking**: `npm run type-check` or `yarn type-check` or `pnpm type-check` (TypeScript)
- **Test**:
  - All tests: `npm test` or `yarn test` or `pnpm test`
  - Single test file: `npm test -- [test-file-path]` or `npx vitest run [file]`
  - Watch mode: `npm run test:watch`
- **Format**: `npm run format` or `yarn format` or `pnpm format`

#### Python Projects
- **Install dependencies**: `pip install -r requirements.txt` or `poetry install`
- **Lint**: `ruff check . --fix` and `ruff format .`
- **Type checking**: `mypy .` (if configured)
- **Test**: `pytest` (all tests), `pytest path/to/test.py::TestClass::test_method` (single test)
- **Build**: `python -m build` or `poetry build`

#### Rust Projects
- **Build**: `cargo build`
- **Check**: `cargo check`
- **Test**: `cargo test` (all tests), `cargo test test_name` (single test)
- **Format**: `cargo fmt`
- **Lint**: `cargo clippy`

#### Go Projects
- **Build**: `go build ./...`
- **Test**: `go test ./...` (all tests), `go test -v ./path/to/package` (specific package)
- **Format**: `gofmt -w .`
- **Lint**: `golangci-lint run`

### Important Notes for Testing
- **Never run all tests** if you can run a single test or a subset; full test suites can take minutes to hours
- **Always verify** the correct test command by checking the project's `package.json` scripts or documentation
- **If a test fails twice**, stop and ask for help; do not attempt to fix flaky tests without understanding the root cause
- **Add tests** for new functionality; follow existing test patterns in the codebase

### Running a Single Test
- **JavaScript/TypeScript**: Use test runner specific flags (e.g., `vitest run path/to/test.spec.ts`, `jest path/to/test.js`)
- **Python**: Use `pytest path/to/test.py::test_function` or `pytest -k "test_name"`
- **Rust**: Use `cargo test test_name`
- **Go**: Use `go test -run TestName ./package/path`

## 2. Code Style Guidelines

### General Principles
- **Consistency**: Follow existing code patterns and conventions in the repository
- **Readability**: Write code that is easy to understand and maintain
- **Simplicity**: Prefer simple, straightforward solutions over clever but complex ones
- **Safety**: Handle errors gracefully, validate inputs, and avoid security vulnerabilities

### Language-Specific Guidelines

#### TypeScript/JavaScript
- **Imports**: Use ES6 import/export syntax; group imports (external, internal, type imports)
- **Types**: Use strict TypeScript; prefer `interface` for object shapes, `type` for unions, intersections
- **Naming**: `camelCase` for variables/functions, `PascalCase` for classes/components, `UPPER_SNAKE_CASE` for constants
- **Error handling**: Use `try/catch` for async operations; throw appropriate error types
- **Components**: Use functional components with hooks; keep components small and focused

#### Python
- **Imports**: Group imports (standard library, third-party, local) with blank lines between
- **Types**: Use type hints (`def foo(bar: str) -> int:`); prefer `Optional[X]` over `Union[X, None]`
- **Naming**: `snake_case` for variables/functions, `PascalCase` for classes, `UPPER_SNAKE_CASE` for constants
- **Error handling**: Use specific exception types; avoid bare `except:` clauses
- **Documentation**: Use docstrings (Google or NumPy style) for public functions/classes

#### Rust
- **Imports**: Group imports (`std`, external crates, internal modules`); use `use` statements
- **Types**: Leverage Rust's type system; use `Result` and `Option` appropriately
- **Naming**: `snake_case` for variables/functions, `PascalCase` for types/traits, `SCREAMING_SNAKE_CASE` for constants
- **Error handling**: Use `Result<T, E>`; propagate errors with `?` operator
- **Documentation**: Use `///` doc comments for public items

#### Go
- **Imports**: Group imports (standard library, third-party, internal); use `goimports` for formatting
- **Types**: Use strong typing; define interfaces where appropriate
- **Naming**: `camelCase` for variables/functions, `PascalCase` for exported identifiers, `mixedCaps` for unexported
- **Error handling**: Return `error` as the last return value; handle errors explicitly
- **Documentation**: Use `//` comments for exported functions/types

### Error Handling Patterns
- **Be explicit**: Handle errors where they occur; don't ignore them
- **Provide context**: Include relevant information in error messages
- **Use appropriate error types**: Create custom error types for domain-specific errors
- **Logging**: Use structured logging for debugging and observability

### Comments and Documentation
- **Comments should explain "why" not "what"**: Code should be self-explanatory; comments should provide context, reasoning, or edge cases
- **Avoid redundant comments**: Don't repeat what the code already says
- **Document public APIs**: Include parameter descriptions, return values, and examples
- **Keep documentation up-to-date**: Update comments when code changes

### Testing Guidelines
- **Write unit tests** for new functionality
- **Follow existing test patterns** in the codebase
- **Use descriptive test names**: `test_should_do_something_when_condition`
- **Test edge cases**: Include boundary conditions, error scenarios, and invalid inputs
- **Keep tests independent**: Tests should not depend on each other or shared state

## 3. Repository-Specific Configuration

### Cursor Rules
Check for Cursor development rules in:
- `.cursor/rules/` directory (may contain `.mdc` files)
- `.cursorrules` file in the repository root

If present, **ALWAYS follow these rules** as they contain project-specific conventions and requirements.

### GitHub Copilot Instructions
Check for Copilot instructions in:
- `.github/copilot-instructions.md`
- `.github/actions/copilot/` or similar directories

If present, incorporate these instructions into your work as they provide project-specific guidance.

### Editor Configuration
Respect editor configuration files:
- `.editorconfig` for basic editor settings
- `.prettierrc`, `.eslintrc`, `.stylelintrc` for formatting/linting
- `pyproject.toml` for Python tool configuration
- `Cargo.toml` for Rust configuration

## 4. Development Workflow

**Before Making Changes**: Understand codebase, follow existing patterns, run existing tests, plan tasks.

**During Implementation**: Make incremental changes, write tests, follow style guidelines, document complex logic.

**After Implementation**: Run tests, fix linting issues, check types, verify build.

## 5. Important Reminders

**Security**: Never commit secrets; validate inputs; use secure defaults.

**Performance**: Consider performance implications; profile when needed; optimize judiciously.

**Compatibility**: Maintain backward compatibility; support multiple platforms; handle deprecated APIs.

**Communication**: Be concise; focus on the task; ask for clarification.

---

*This document is a template. Agents should adapt it based on the specific repository's configuration and conventions.*