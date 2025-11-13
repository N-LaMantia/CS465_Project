# Style Guide

## Markdown

- All `.md` files must have one first level header that is the title of the file
- All headers must have a blank line before and after
- All code blocks must be indented by 4 spaces
- All code blocks must have a blank line before and after

## Comments

- All sourcecode files must have a file level comment that describes the file
- All comments must be updated (if necessary) before a pull request

### File Comment Example

    ```
    /**
     * A description of the file contents
     *
     * @file
     * @author Firstname Lastname
     * Contributors:
     *
     * Contents: Optional section to further describe the contents if it has
     *           multiple parts
     */

    ```

- All functions must have a function level comment that describes the function

### Function Comment Example

    ```
    /**
     * A description of the function
     *
     * @function
     * @author Firstname Lastname
     * Contributors:
     *
     * @param param1 Description of param1
     * @param param2 Description of param2
     *
     * @return Description of return value
     *
     * @throws Error Description of thrown error
     */

    ```

- Use `//` for single line comments and `/** */` for multi-line comments
- Use single line comments to describe functionality as necessary
- To describe variables use multi-line comments `/** description */`
- If a logical operation is not yet implemented use a placeholder `// TODO: description`

For more information see [https://jsdoc.app/](https://jsdoc.app/)

## Naming Conventions

### Files, Variables, and Functions

- All variables and functions should be named in camelCase and describe what the
  variable or function does.
- All Components should be named in PascalCase and should be a proper noun.
- All files should be named in PascalCase and should be a proper noun. If a file
  primarily contains a component it should be named after the component.

### CSS

- All CSS classes should be named in kebab-case (lowercase) and should be a
  proper noun.

### HTML

- All HTML tags should be properly indented and given new lines as necessary.

### Javascript

- When exporting a function use `export default function functionName() {...}`
- Returning "html" from a function should be done with

```
return (
    <div>
        innerHTML
    </div>
)
```

### Indentation and Line Length

- Use 4 spaces for indentation
- Use 80 characters for maximum line length

Curly braces should in the K&R style

```
if (condition) {
    doSomething();
}
```
