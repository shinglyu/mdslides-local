var gulp = require('gulp');
var inject = require('gulp-inject');
var debug = require('gulp-debug');
var replace = require('gulp-replace');
var copy = require('gulp-copy');
var gulp_filter = require('gulp-filter');
var path = require('path');
var del = require('del')
var open = require('gulp-open')
var through = require('through2')
var slug = require('slug')
var rename = require('gulp-rename')

var md_path = process.env.INIT_CWD //#the initial directory
var gulpfile_path = process.cwd() //#gulpfile.js location

gulp.task('default', ['clean'], function() {
  

  //gulp.src(path.join(md_loc, '*')).pipe(debug())
  //gulp.src(path.join(gulpfile_path, 'custom', '**', '*')).pipe(debug())
  //gulp.src(path.join(gulpfile_path, 'custom', '**', '*')).pipe(debug())
  //Configureing destination
  var dest_path = path.join(md_path, 'dist')
  var dest_lib_path = path.join(dest_path, 'mdslides')
  var dest = gulp.dest(dest_path)


  //Copying lib files => Should be removed after webpack is ready
  gulp.src([path.join(gulpfile_path, 'bower_components', 'reveal.js', '**', '**', '*'),
            path.join(gulpfile_path, 'custom', '**', '*')])
      .pipe(gulp.dest(path.join(dest_lib_path)))

  gulp.src([path.join(gulpfile_path, 'bower_components', 'jquery', 'dist', 'jquery.min.js')])
      .pipe(gulp.dest(path.join(dest_lib_path, 'lib', 'js')))

  //Sources
  var file_name
  var exclude = gulp_filter(['*','!README.md']);
  var content = gulp.src([path.join(md_path, '*.md')])
                    .pipe(exclude)
                    
  content.pipe(through.obj(function(file, enc, callback) {
    first_non_empty_line = getFirstNonEmptyLine(String(file.contents).split("\n"))
    file_name = slug(first_non_empty_line, "_")
    callback()
  }))

  var template = gulp.src(path.join(gulpfile_path, 'custom', 'template.html'))

  //Injecting the content into the template
  template.pipe(inject(content,{
      transform: function (filePath, file) {
         return file.contents.toString('utf8')
      }
    }))
    .pipe(replace(/<!-- inject:md -->/g, ''))
    .pipe(replace(/<!-- endinject -->/g, ''))
    .pipe(rename(function(path) {
      path.basename = file_name
      path.extname = ".html"
    }))
    .pipe(dest)
    .pipe(open('<%=file.path%>', {app: 'firefox'}))
    //.pipe(debug())

})

gulp.task('clean', function(cb) {
  del([path.join(md_path, 'dist')], {'force': true}, cb)
})

function getFirstNonEmptyLine(contents) {
    for(var i = 0; i < contents.length; i++) {
      var current_line = contents[i].replace("#", "").trim()
      if(current_line != "") {
        return current_line
      }
    }
}
