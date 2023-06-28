var concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const { task, src, dest } = require('gulp');

// Configuration
var configuration = {
    paths: {
        src: {
            html: './*.html',
        },
        dist: './dist'
    }
};

exports.default = function () {
    src(configuration.paths.src.html)
        .pipe(dest(configuration.paths.dist));
    src(['src/playerFrames.js', 'src/player.js', 'src/monsters.js', 'src/block.js',
        'src/powerups.js', 'src/blockType.js', 'src/blockSpawner.js', 'src/main.js', 'src/pose.js',])
        .pipe(uglify())
        // So use gulp-rename to change the extension
        .pipe(concat('index.js'))
        .pipe(dest('dist/'));
    return Promise.resolve('done');
}
/* <script src="src/playerFrames.js"></script>
<script src="src/player.js"></script>
<script src="src/monsters.js"></script>
<script src="src/block.js"></script>
<script src="src/powerups.js"></script>
<script src="src/blockType.js"></script>
<script src="src/blockSpawner.js"></script>
<script src="src/main.js"></script> */
