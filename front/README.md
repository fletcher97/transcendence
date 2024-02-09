# Transcendence front

## app directory
Contains either layout directories or page directories. Where layout and page structure happens.

## layout directory i. (folder_name)
Each folder with name in parenthesis represents a layout, i.e. shared UI. Page folders nested within these folders share the same layout. Layout is defined in layout.js

## layout.js
This file contains a class representing that's responsible for rendering layout, as well as rendering appropriate page sharing that layout. This file is the only path to pages that index.js has. index.js outsources route changes to layouts, and only gives layout.js the path of the subpage belonging to that layout. 

## page directory

