/**
 * Gulp file to automate the various tasks
 * */
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const csscomb = require('gulp-csscomb');
const cleanCss = require('gulp-clean-css');
const del = require('del');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const wait = require('gulp-wait');
const sourcemaps = require('gulp-sourcemaps');

// Define paths

const paths = {
    dist: {
        base: 'dist',
        img: 'dist/img',
        images :'dist/images',
        libs: 'dist/vendor',
        fonts: 'dist/fonts',
        fontscss: 'dist/fonts',
        css: 'dist/css',
        mycss: 'dist/css',//added
        assets: 'dist/assets',//added
        js: 'dist/js',
        vendor: 'dist/vendor',
    },
    base: {
        base: './public',
        node: 'node_modules',
    },
    src: {
        base: './public',
        css: 'public/css/**/*.css',
        js: 'public/js/**/*.js',
        mycss: 'public/css/**/*.css',
        assets : 'public/assets/**/*.+(png|jpg|gif|svg|js|css)',
        html: '**/*.html',
        img: 'public/img/**/*.+(png|jpg|gif|svg|ico)',
        images :'public/images/**/*.+(png|jpg|gif|svg|ico)',
        ejs: 'views/**/*.ejs',
        fonts: 'public/fonts/**/*.+(eot|svg|ttf|woff|woff2)',
        fontscss: 'dist/fonts/**/*',
        vendor: 'public/vendor/**/*',
        scss: 'public/scss/**/*.scss',
    },
};

// Compile SCSS for dev
function scssDev() {
    return gulp
        .src(paths.src.scss)
        .pipe(wait(500))
        .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('postcss-flexbugs-fixes')])) // eslint-disable-line
        .pipe(
            autoprefixer({
                browsers: ['> 1%'],
            })
        )
        .pipe(csscomb())
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(`${paths.src.base}/css`))
        .pipe(browserSync.stream({ match: '**/*.css' }));
}

// Compile SCSS for prod
function scssProd() {
    return gulp
        .src(paths.src.scss)
        .pipe(wait(500))
        .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('postcss-flexbugs-fixes')])) // eslint-disable-line
        .pipe(
            autoprefixer({
                browsers: ['> 1%'],
            })
        )
        .pipe(csscomb())
        .pipe(gulp.dest(`${paths.dist.base}/css`));
}

// Minify CSS
function minifyCSS() {
    return gulp
        .src([`${paths.dist.css}/argon.css`])
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(`${paths.dist.base}/css`));
}
function minifyAssetCSS() {
    return gulp
        .src([`${paths.dist.base}/assets/css/argon.css`])
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(`${paths.dist.base}/assets/css/`));
}
// Minify JS
function minifyJS() {
    return gulp
        .src([`${paths.src.base}/js/argon.js`])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(`${paths.dist.base}/js`));
}
// Minify JS from assets
function minifyJSAssets() {
    return gulp
        .src([`${paths.src.base}/assets/js/argon.js`])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(`${paths.dist.base}/assets/js`));
}
// Live reload
function serve(done) {
    browserSync.init({
        files: ['public/**/*', 'views/**/*'],
        proxy: 'http://0.0.0.0:8000',
    });

    done();
}

// Watch for changes
function watch() {
    gulp.watch(paths.src.scss, scssDev);
    gulp.watch(paths.src.js, browserSync.reload);
    gulp.watch(paths.src.html, browserSync.reload);
    gulp.watch(paths.src.ejs, browserSync.reload);
}

// Clean
async function cleanDist(done) {
    await del.sync(paths.dist.base);
    done();
}

// Copy JS
async function copyJS(done) {
    gulp.src([`${paths.src.js}`]).pipe(gulp.dest(`${paths.dist.js}`));
    done();
}

// Copy images
async function copyImages(done) {
    gulp.src([`${paths.src.img}`]).pipe(gulp.dest(`${paths.dist.img}`));
    gulp.src([`${paths.src.images}`]).pipe(gulp.dest(`${paths.dist.images}`));
    done();
}

// COPY CSS (to remove we need to minify the css)========
async function copyCSS(done) {
    gulp.src([`${paths.src.mycss}`]).pipe(gulp.dest(`${paths.dist.mycss}`));
    done();
}

//copy css font
async function copyCSSFont(done) {
    gulp.src([`${paths.src.fontscss}`]).pipe(gulp.dest(`${paths.dist.fontscss}`));
    done();
}
//copy assets and its subfolders
async function copyAssets(done) {
    gulp.src([`${paths.src.assets}`]).pipe(gulp.dest(`${paths.dist.assets}`));
    done();
}
//=======================================================
function copyWoff() {
    return gulp.src('public/assets/fonts/*.woff2')
        .pipe(gulp.dest('dist/assets/fonts'));
}
// Copy fonts
async function copyFonts(done) {
    gulp.src([`${paths.src.fonts}`]).pipe(gulp.dest(`${paths.dist.fonts}`));
    done();
}

// Copy vendor
async function copyVendor(done) {
    gulp.src([`${paths.src.vendor}`]).pipe(gulp.dest(`${paths.dist.vendor}`));
    done();
}

// Build
const build = gulp.series(
    cleanDist,
    scssProd,
    copyJS,
    copyImages,
    copyFonts,
    copyCSS,
    copyAssets,
    copyCSSFont,
    copyVendor,
    minifyJS,
    minifyJSAssets,
    minifyAssetCSS,
    copyWoff
    //minifyCSS
);

// Default
const defaultTask = gulp.series(scssDev, serve, watch);

module.exports = {
    scssDev,
    scssProd,
    //minifyCSS,
    minifyAssetCSS,
    minifyJS,
    minifyJSAssets,
    serve,
    watch,
    cleanDist,
    copyJS,
    copyImages,
    copyFonts,
    copyCSS,
    copyAssets,
    copyCSSFont,
    copyVendor,
    copyWoff,
    build,
    default: defaultTask,
};
