# FedexSignupForm

## UX decisions

there were two decisions I needed to make as they were not specified in the task description:

1. how to display the validation to the user
2. what to do with the API response

to provide quick, yet unobtrusive feedback to the user I decided to highlight the field as invalid without displaying error message - only displaying 1 error at a time - when the user is tries to submit invalid form

as far as response goes, the only thing that the api returned other than what was submitted was the generated uid - so I decided to display it as a snackbar - as a sort of success notification.

## Componoent architecture

The application is pretty minimalistic - folder architecture is organised by type into components, services, pages, models etc.
all of the shared functinality is in the src folder. If page was bigger, then components unique to each page and not shared with other pages, would be placed in the corresponding page's folder for ease of discovery.

Additionally, I created a service for creating frms - in order t improve its testability and potentially can accomodate more forms and be made more configurable

## dependencies

I'm relying on Angular material library for styling of components

## potential improvements:

1. make it mobile friendly
2. split each page intp a separate module - since there's only 1 page - this is an overkill for now, but could be invaluable for larger application - this would improve the first page load times. I'd also set up pre-loading to proactively load follow-up routes before the user has navigated to them to create smoother second page load experience
3. if application was larger and haad multiple types of layout e.g. for authenticated and non-authenticatedd users - I would create a standalone layout componentss for different scenarios insstead fo just putting a header into app component - I'd have layout ono per page basis
4. state management - different appraoches can be taken - I like having redux style architecture - howoever, would like to look into splitting it into modules if the application grew to a large size with multiple teams working on it
5. re-orrganise applicaation by module instead of type
6. escape special characters in the validator regexps
7. refactor inputs into a reusable input component nd add ChangeDetectionStrategy.OnPush to it too improve change detection speed
8. display error messages per field under each individual field on blur

## Accessibility

aria labels and validity is added via angular material

## Testing:

as most of the logic is concentrated in the signup component - I wrote a few integration tests to test out valid and invalid cases. I mocked out the services to test them in isolation - in the signup.component.spec.ts

Additionally, I added unit tests for the validation functions that I wrote as well as the form-level tests in the form service. I have not added any tests for the auth service because it is quite trivial.

---

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
