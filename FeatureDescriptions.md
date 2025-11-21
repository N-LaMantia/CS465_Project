# Features

## #: Feature template (replace with feature name)

description

### Requirements

- Requirement 1

## 1: Display list of snippets with filtering/sorting

Users should be able to sort what snippets they want to see by selecting a language or a snippet.

### Requirements
- the application shall allow the user to select wether they want to sort by language or by snippet
- - after previous is selected have a selection tool for what languages or what snippets to show
  - (can this be all in one, checkboxes?)

## 2: Display information/use cases for selected snippet

### Requirements
- Retrieves text information from documented snippets and presents them below
the snippet code in the UI
- Text related to the snippets shall be stored alongside the snippet code
- Information shall describe the functional use of the snippet
- Use cases shall include examples of situations where the snippet shall be
usefull

## 3: Display list of languages available for the selected snippet

Drop down menu to display all of the languages possible for the selected snippet. 

### Requirements

- Must be legible and free of spelling or grammar mistakes.
- Must be a vertical list of all languages for the selected snippet. 

## 4: Display list of all languages

A drop down menu displaying all languages. 

### Requirements

- Must be legible and free of spelling or grammar mistakes.
- Must be selectable and when selected, select UI will change.

## 5: Display list of snippets for the chosen language

### Requirements

## 6: Allow the user to copy snippets easily

Have a button to copy the snippet to the clipboard

### Requirements

- A button near snippet that indicates it is a copy button and when clicked copys the snippet to the clipboard.

## Design Phase notes

### App flow

- Display list of snippets
- Sort/filter snippets (name, line count, language)
- Selecting snippet gives information/use cases for the snippet
- Allows user to select language(s) to view the snippet in
- Possibly provide examples for snippet use
- Copy snippet

### Alternate Flow

- Display list of languages
- sort/filter languages
- display list of snippets for the language
- sort/filter snippets
- selecting snippet gives information/use cases
- copy snippet

### Settings?

- Preferred language
- Dark/light mode?
- Favorited snippets
