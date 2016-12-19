# Installation

{{Name}} theme uses [Gulp](http://gulpjs.com) to compile Sass. Gulp needs Node.

#### Step 1
Make sure you have Node and npm installed. 
You can read a guide on how to install node here: https://docs.npmjs.com/getting-started/installing-node

#### Step 2
Install bower: `npm install -g bower`.

#### Step 3
Go to the root of {{Name}} theme and run the following commands: `npm run setup`.

#### Step 4
Update `browserSyncProxy` in **config.json**.

#### Step 5
Run the following command to compile Sass and watch for changes: `gulp`.

#### My Remarks
I need to install gulp (after step 4) with command `node install -g gulp`.
In Windows 7 environment I use latest (2.11.0) 64-bit version of Git for Windows.
You need the drupal module link_css to make browserSync working!

#### More about Gulp, KSS and drupal theming
* https://www.chenhuijing.com/blog/drupal-101-theming-with-gulp/
* https://css-tricks.com/gulp-for-beginners/
* https://github.com/SyneticNL/Gulp-for-Drupal
* https://github.com/kss-node/kss/blob/spec/SPEC.md
* https://github.com/philj/gulp-kss
* https://github.com/kss-node/kss-node/issues/161#issuecomment-222281133
* https://github.com/WebDevLuke/kss-orion-theme
* Guru - Drupal 8 theme with extreem Gulp integration: https://github.com/digitaldonkey/guru
* Hitchhiker - another Drupal theme with Gulp integration: https://www.drupal.org/sandbox/legaudinier/2704379
* Zen


#### Living style sheet with KSS example: 
http://numenta.org/styleguide/
