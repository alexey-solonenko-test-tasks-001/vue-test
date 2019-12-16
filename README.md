
VIDEO SLOT ASSESSMENT

https://picsum-asolonenko.herokuapp.com/


** IMPLEMENTED

- components and modularity - done (parent-child, code-split). It's the first time ever I work with Vue, hope the result makes sense.
- load image thumbnails - done.
- modal + iframe. Could not launch iframe. To regain points: shows image, 'Save As' dialogue button, link to 'unsplash'.
- pagination, thumbnails per page - done.
- responsiveness - done.
- author's filter - done both, on the page, and on the server, see checkbox on the page.
- debouncing - done, + disabling input for long searchs, + searging/no results.
- ESCMAScript 2015 - destructuring, promises/ async/await, etc.
- CSS - no framework, flexbox. It was the first time I used BEM, hope it makes sense.
- SCSS - used node-sass, vars, mixins, basic syntax.
- npm run dev:scss-nodemon to compile css from scss
- deployed to heroku (see link above), locally either npm run serve or serve -s dist (needs https://www.npmjs.com/package/serve ) 

** OWN ADDITIONS
- loading spinners
- 'Save As' download button
- 'brute' server search by author search keyword. 

** AMENDED
- did not manage get Total Count from API response, thus mocked the pagination inside the app. I could not resolve total number of items to restrict thumbs/per page vs max number of pages?
- To regain extra points for the the above I made a dummy search by Author keyword on the server. It INTENTIONALLY calls API multiple times to collect all matches. Proper way is to implement a call with /username/ param to unsplash API. But that was not in the assignment.

** DID NOT UNDERSTAND
Could not understand assignment description:
- interface labels (such as Page , Next , Prev etc.) aren't hardcoded (use object labels or similar) 
-- should I have set up i18n for Vue JS, please?





Modal Iframe
Could not make it work. Looks like its cors-prevented. 

Author' Filtering

# vs-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
