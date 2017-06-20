# Blossom UI

Blossom has been built for the ground up to provide an easy way for beginner and advanced web designers and developers to get their hands on a simple but powerful design framework. With a massive library of web elements, Blossom allows users to build & design intuitive websites efficiently.

---

### Getting started

#### Self hosting
Download the [ZIP bundle](http://getblossom.io/introduction)

Include it in your markup

`<link rel="stylesheet" type="text/css" href="/blossom-ui/css/blossom.min.css"/>`

`<script src="/blossom-ui/js/blossom.js"></script>`

#### NodeJS Dependancy

Install the package

`npm install blossom-ui --save`

Directly link to the files built in your working directory

#### CDN Hosting

_Coming soon_

---

### Elements
The [Elements section](http://getblossom.io/elements/buttons) provides a vast range of elements needed to build a site from scratch; ranging from buttons to progress bars, you have all the building blocks needed to make a truly unique page.

Just hover over the element you want to use and click the _code_ icon. You'll see the HTML markup needed to clone the element for your website.

### Design
The [Design section](http://getblossom.io/elements/buttons) gives you all the helper classes needed to make a customized layout. Use the [12 Column Grid](http://getblossom.io/design/grid) to make the basic structure of your page.

Make sure to start planning for mobile versions from the start by using several grid classes and breakpoints on your elements.

### Utility
The [Utility section](http://getblossom.io/utility/js) provides additional helper classes and methods to add that next level of detail to your page.

Ensure that you use Blossom JS as mentioned in the section to get your Progress Bars and Dropdowns working correctly.

### Theming
Most theming can be achieved by editing the `variables.styl` file within Blossom's `src` folder. Changing single variables will have an effect across your whole website so try to experiment from the start to see what suits your site the most.

A new [theming guide](http://getblossom.io/customization) has been released, going into detail about different parts of theming.

### Building
Upon installing Blossom, a gulpfile with come along with all source files in the install directory. Run `gulp build` to watch the source directory and to allow Blossom to be recompiled each time you edit any .styl files.

The file `_.styl` in included within Blossoms source folder so that custom Style markup can be written in and compiled directly with Blossom.

When you are ready for production, simply run `gulp build` so that Blossom JS and Blossom CSS can be compiled and minified.

### Issues
Found any issues with the build? Make sure you let me know by posting an issue.

###### Feel free to post enhancements in the Issues section

---

Licensed under MIT - Copyright (c) Cindr.io 2017
