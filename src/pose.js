
window.onload = function () {
    const video = document.getElementById('video');
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const windowAspectRatio = windowHeight / windowWidth;

    document.getElementById('main-container').style.width = windowWidth + "px";
    document.getElementById('main-container').style.height = windowHeight + "px";
    const getCameraSelection = async () => {
        const updatedConstraints = {
            video: {
                // deviceId: deviceId,
                facingMode: "user",
                // width: 480, height: 640,
                frameRate: { max: 12 },
            }
        };
        navigator.mediaDevices.getUserMedia(updatedConstraints).then((stream) => {
            video.srcObject = stream;
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
    };

    let started = false;
    let detector;
    let poses = [];
    var startTime;
    const keypointIndex = [5, 6];
    async function init() {
        // show loading
        document.getElementById('loader-container').style.top = windowHeight / 2 - 100 + "px";
        document.getElementById('loader-container').style.left = windowWidth / 2 - 50 + "px";
        document.getElementById('loader-container').classList.toggle('hidden');
        //SINGLEPOSE_LIGHTNING, MULTIPOSE_LIGHTNING
        await tf.ready();
        const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
        detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
        await getCameraSelection();
        // finish loading
        document.getElementById('loader-container').classList.toggle('hidden');
        // try {
        //     window.flutter_inappwebview
        //         .callHandler('gameState', 'loaded');
        // } catch (error) {

        // }

    }
    async function poseDetect() {
        // Pass in a video stream to the model to detect poses.
        const start = Date.now();
        const pose = await detector.estimatePoses(video);
        // check if pose is valid
        if (pose.length > 0) {
            const keypoints = keypointIndex.map(index => pose[0].keypoints[index]);
            const avg_x = keypoints.map(keypoint => keypoint.x).reduce((a, b) => a + b) / keypoints.length;
            const avg_score = keypoints.map(keypoint => keypoint.score).reduce((a, b) => a + b) / keypoints.length;
            if (avg_score > 0.5) {
                poses.push(pose);

                // convert video x to game canvas x 
                if (!gameoverActionDone) {
                    const videoAspectRatio = video.videoHeight / video.videoWidth;
                    if (windowAspectRatio >= videoAspectRatio) {
                        const ratio = windowHeight / video.videoHeight;
                        const player_x = windowWidth - avg_x * ratio + (video.videoWidth * ratio - windowWidth) / 2;
                        player.x = player_x - player.width / 2;
                    } else {
                        const ratio = windowWidth / video.videoWidth;
                        const player_x = windowWidth - avg_x * ratio;
                        player.x = player_x - player.width / 2;
                    }
                }
            }
        }
        if (poses.length > 12 && pause) {
            poses.shift();
            const jump_positions = poses.map(pose => pose[0].keypoints[5]);
            const jump_y_positions = jump_positions.map(jump_position => jump_position.y);
            const jumpPeaksAndTroughs = findPeaksAndTroughs(jump_y_positions, windowHeight);
            const jump_peaks_n = jumpPeaksAndTroughs.peaks.length;
            const jump_troughs_n = jumpPeaksAndTroughs.troughs.length;
            const jumpSpeed = (jump_peaks_n + jump_troughs_n);
            const jumpDistance = Math.max(...jump_y_positions) - Math.min(...jump_y_positions);
            if (jumpSpeed > 1 && jumpDistance > windowHeight / 24) {
                pause = false;
                if (startTime == null) {
                    startTime = Date.now();
                }
                try {
                    window.flutter_inappwebview
                        .callHandler('gameState', 'start');
                } catch (error) {
                    console.error(error);
                }
            }
        }
        const detectTime = Date.now() - start;
        // when frameRate is 12, each frame has 83 millseconds;
        let delay = Math.max(83 - detectTime, 0);

        // console.log(pose);
        // name: 0"nose", 1"left_eye", 2"right_eye", 3"left_ear", 4"right_ear", 5"left_shoulder", 6"right_shoulder", 7"left_elbow",
        //8"right_elbow", 9"left_wrist", 10"right_wrist", 11"left_hip", 12"right_hip", 13"left_knee", 14"right_knee", 15"left_ankle", 16"right_ankle"
        // [0:{keypoints:[0:{y:123,x:123,score:0.5,name:'nose'},1:{}],score}]
        setTimeout(() => {
            poseDetect();
        }, delay);
    }

    init().then(() => {
        poseDetect();
    });

}

function findPeaksAndTroughs(array, windowHeight) {
    array = group(2, array);
    const start = 1;                        // Starting index to search
    const end = array.length - 2;           // Last index to search
    var obj = { peaks: [], troughs: [] };// Object to store the indexs of peaks/thoughs
    const variation = 5;

    for (var i = start; i <= end; i++) {
        var current = array[i];
        var last = array[i - 1];
        var next = array[i + 1];

        if (current > (next + variation) && current > (last + variation))
            obj.peaks.push(i);
        else if (current < (next - variation) && current < (last - variation))
            obj.troughs.push(i);
    }
    return obj;
}
function group(n, arr) {
    // initialize array to be returned
    let res = [];
    // validate n
    if (n > 0 && n <= arr.length) {
        // iterate over arr while updating acc
        res = arr.reduce((acc, num, index) => {
            // if the current index has no remainder with n, add a new number
            if (index % n === 0) acc.push(num);
            // else update the last added number to the array
            else acc[acc.length - 1] += num;
            // return acc in each iteration
            return acc;
        }, []);
    }
    return res;
}