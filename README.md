# ngStarRating
A star rating/rater directive. It depends/relies on Google's [Material Icons](https://design.google.com/icons/).

## Usage

  - Include `angular.js` and ensure the Material Icons are being used.
  - Add `ngStarRating` as a dependency of your module:
  
  ```js
  angular.module('yourApp', ['ngStarRating']);
  ```

  - Html:
  
  ```html
  <star-rating ng-model="data.rating" max="5"></star-rating>
  <!-- OR, for read-only -->
  <star-rating read-only="true" max="10"></star-rating>
  ```

  - To style:
  
  ```css
  .star-rating .material-icons {
    font-size: 16px;
    color: #5b6273;
  }
  ```

## License
MIT

