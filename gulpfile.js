var concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const { watch, src, dest } = require('gulp');
const modifyHTMLlinks = require("gulp-processhtml");
const htmlmin = require("gulp-htmlmin");

// Configuration
var configuration = {
    paths: {
        src: {
            html: './src/*.html',
        },
        dist: './dist'
    }
};

function js() {
    src(['src/playerFrames.js', 'src/player.js', 'src/monsters.js', 'src/block.js',
        'src/powerups.js', 'src/blockType.js', 'src/blockSpawner.js', 'src/main.js', 'src/pose.js',])
        .pipe(uglify())
        // So use gulp-rename to change the extension
        .pipe(concat('index.js'))
        .pipe(dest('dist/'));
}
exports.default = function () {
    src('./Sprites/**/*.png')
        .pipe(dest(configuration.paths.dist + "/Sprites"));
    src(configuration.paths.src.html)
        .pipe(modifyHTMLlinks())
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                removeComments: true
            })
        )
        .pipe(dest(configuration.paths.dist));
    js();
    return Promise.resolve('done');
}

function watchTask() {
    watch('src/*.js', { usePolling: true, ignoreInitial: false }, js());
}

exports.watch = watchTask;

/* <script src="src/playerFrames.js"></script>
<script src="src/player.js"></script>
<script src="src/monsters.js"></script>
<script src="src/block.js"></script>
<script src="src/powerups.js"></script>
<script src="src/blockType.js"></script>
<script src="src/blockSpawner.js"></script>
<script src="src/main.js"></script> */
