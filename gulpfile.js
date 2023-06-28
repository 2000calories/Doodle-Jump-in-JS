var concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const { src, dest } = require('gulp');

exports.default = function () {
    // gulp.task('scripts', function () {
    //     return gulp.src(['./src/playerFrames.js', './src/player.js', './src/monsters.js', './src/block.js',
    //         './src/powerups.js', './src/blockType.js', './src/blockSpawner.js', './src/main.js',])
    //         .pipe(concat('index.js'))
    //         .pipe(gulp.dest('./dist/'));
    // });
    return src(['src/playerFrames.js', 'src/player.js', 'src/monsters.js', 'src/block.js',
        'src/powerups.js', 'src/blockType.js', 'src/blockSpawner.js', 'src/main.js',])
        .pipe(uglify())
        // So use gulp-rename to change the extension
        .pipe(concat('index.js'))
        .pipe(dest('dist/'));
}

{/* <script src="src/playerFrames.js"></script>
<script src="src/player.js"></script>
<script src="src/monsters.js"></script>
<script src="src/block.js"></script>
<script src="src/powerups.js"></script>
<script src="src/blockType.js"></script>
<script src="src/blockSpawner.js"></script>
<script src="src/main.js"></script> */}
