# KA32 Web ClientDev

##### Technology Stack:
  - [Angular 6](https://.angular.io/)
  - [Angular Material](http://angular.material.io)
  - [ASP.NET Core 2.1](https://www.asp.net/)
##### Tools
  - Angular-Cli
  - VS Code
  - Chrome
  - Postman


### 1. Dev. Setup

##### 1.1 Install Dev. Tools
- VS Code
   - VS Code Extensions
     - Debugger for Chrome
     - vscode-icons
     - TSLint
     - JSLint
     - ESLint
     - Path Intellisense
     - npm
     - npm intellisense
     - JS-CSS-HTML Formatter
     - HTML Snippets
     - GitLens
     - Git Blame
     - EditorConfig for VS Code
     - C#
     - Angular 6 Snippets
- Postman
- Chrome, Firefox Developer Edition
- Git Bash
- Node 8.11 or higher
- Angular cli v6 or higher, Angular v 6.0.7
     ```sh
     $ npm install -g @angular/cli
     ```
    or go to https://cli.angular.io/ and follow the instructions to install
---

### 2. Clone Source Code
  We use Git version control system hosted for free at Microsoft VSTS (ka32.visualstudio.com) > Project name: KA32-RE-Web-Client.
  
  Clone the source code to the local directory (for ex: d:\KA32\Web-Client).
  In Git Bash:
  ```sh
  $ cd d:\
  $ mkdir KA32
  $ mkdir KA32\Web-Client
  $ cd d:\KA32\Web-Client
  $ git clone https://ka32.visualstudio.com/KA32-RE-Web-Client/_git/KA32-RE-Web-Client
  ```
---
### 3. Restore packages:
  ```sh
    $ cd d:\KA32\Web-Client
    $ npm install
  ```
---
#### Project at VSTS

See [VSTS Project](https://ka32.visualstudio.com/_git/KA32-RE-Web-Client)

# KA32WebClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## UI Coloring tips
    background-image: linear-gradient(rgb(134, 95, 197) 0%, rgb(48, 44, 108) 100%);
	
## Enable SSL in localhost
	Install browser-sync to get certificates from it
	In Chrome, go to chrome://flags   > Enable "Allow invalid certificates for resources loaded from localhost"