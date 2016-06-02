# ngStarRating
A star rating/rater directive. It depends/relies on Google's [Material Icons](https://design.google.com/icons/).

## Usage

  - Include `angular.js` and ensure the Material Icons are being used.
  - Add `ngStarRating` as a dependency of your module:
  ```js
  angular.module('yourApp', ['ngStarRating']);
  ```
  - To use the read-only directive (where `data.rating` refers to the scope's `data.rating` value):
  ```html
  <star-rating ng-model="data.rating" max="5"></star-rating>
  ```
  - To use the 'writable' rating (where `rate-action` refers to a callback function in the scope that accepts a number):
  ```html
  <star-rater rate-action="submitRating"></star-rater>
  ```

  - To style:
  ```css
  .star-rating .material-icons {
    font-size: 16px;
    color: #5b6273;
  }
  ```
