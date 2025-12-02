# PROGRESS

So far we have have A working program which allows the user to select snippets
based on language and view them under proper syntax highlighting. Additionally,
we have a MongoDB database up and running which allows us to save and retrieve
snippets and languages. We also have routing for other parts of the application
and a copy button to allow the user to easily copy the code.

## Design Refining

The design has been refined signifficantly through both development and additional
definition in the supporting files.

## Implementation

We have the base application almost done, we need to update the code display to be
in its own component to allow comparissons between code snippets.

## Testing

We have not done much testing at all yet; however, we have a plan for how to write
our tests and once any components are done we will write tests for them.

## Roadblocks and Problems

React router dom having issues when it is not installed correctly

- Fixed by deleting one of the instances

Faced some issues with over scope on the number of snippets and languages.

- Fixed by pruning the number of snippets and languages
