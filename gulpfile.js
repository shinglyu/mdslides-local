var gulp = require('gulp');
var inject = require('gulp-inject');
var debug = require('gulp-debug');
var replace = require('gulp-replace');
var copy = require('gulp-copy');
var gulp_filter = require('gulp-filter');
var path = require('path');
var del = require('del')
var open = require('gulp-open')
var webpack = require('webpack')
var gutil = require('gulp-util')

var md_path = process.env.INIT_CWD //#the initial directory
var gulpfile_path = process.cwd() //#gulpfile.js location

gulp.task('default', ['clean', 'webpack'], function() {
  

  //gulp.src(path.join(md_loc, '*')).pipe(debug())
  //gulp.src(path.join(gulpfile_path, 'custom', '**', '*')).pipe(debug())
  //gulp.src(path.join(gulpfile_path, 'custom', '**', '*')).pipe(debug())
  //Configureing destination
  var dest_path = path.join(md_path, 'dist')
  var dest_lib_path = path.join(dest_path, 'mdslides')
  var dest = gulp.dest(dest_path)


  //Copying lib files => Should be removed after webpack is ready
  //gulp.src([path.join(gulpfile_path, 'bower_components', 'reveal.js', '**', '**', '*'),
  //          path.join(gulpfile_path, 'custom', '**', '*')])
  gulp.src([path.join(gulpfile_path, 'bower_components', 'reveal.js', 'plugin', '**', '*')])
      .pipe(gulp.dest(path.join(dest_lib_path, 'plugin')))

  //gulp.src([path.join(gulpfile_path, 'bower_components', 'jquery', 'dist', 'jquery.min.js')])
  //    .pipe(gulp.dest(path.join(dest_lib_path, 'lib', 'js')))

  //Sources
  var exclude = gulp_filter(['*','!README.md']);
  var content = gulp.src([path.join(md_path, '*.md')])
                    .pipe(exclude)

  var template = gulp.src(path.join(gulpfile_path, 'custom', 'template.html'))

  //Injecting the content into the template
  template.pipe(inject(content,{
      transform: function (filePath, file) {
         return file.contents.toString('utf8')
      }
    }))
    .pipe(replace(/<!-- inject:md -->/g, ''))
    .pipe(replace(/<!-- endinject -->/g, ''))
    .pipe(dest)
    .pipe(open('<%=file.path%>', {app: 'firefox'}))
    //.pipe(debug())

})

gulp.task('clean', function(cb) {
  del([path.join(md_path, 'dist')], {'force': true}, cb)
})

gulp.task('webpack', function(cb) {
  webpack({
      entry: "./custom/entry.js",
      output: {
        //path: __dirname,
        path: path.join(md_path, "dist"),
        filename: "bundle.js"

      },
      module: {
        loaders: [
          { test: /\.css$/, loader: "style!css"  }
        ]
      }
    }, function(err, stats){
      if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
        // output options
      }));
      cb();
    }
  )
})
