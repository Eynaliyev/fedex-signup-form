# FedexSignupForm

// TO DO:
fix: password validation field highlighting
add: descriptive / per field error messages

2. add tests
   component - add some tests checking the erroor sstate of fields
   validator functions test - for valid and invalid cases
3. documentation in readme
4. address previous comments

// consider turning sign up page into a separate module - overkill for now

imporvements:

1. make it mobile friendly
2. split each page intp a separate module - since there's only 1 page - this is an overkill

Accessibility
aria labels and validity is added via angular materia

Testing:
as most of the logic is concentrated in the signup component - I wrote a few e2e tests to test out valid and invalid cases. I mocked out the services to test them in isolation - in the signup.component.spec.ts

Additionally, I added unit tests for the validation functinos that I wrote.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
