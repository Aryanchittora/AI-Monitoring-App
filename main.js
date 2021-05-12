alarm = "";
objects = [];
status = "";

function preload() {
    alarm = loadSound('alert.mp3');
    if (alarm != "") {
        console.log("Alert Sound Ready");
    }
}

function setup() {
    // Canvas
    camvas = createCanvas(350, 350);

    //Webcam 
    video = createCapture(VIDEO);
    video.hide();

    // COCO Ssd
    Model = ml5.objectDetector('cocossd', loaded);
}

function draw() {
    image(video, 0, 0, 350, 350);

    if (status != "") {
        Model.detect(video, gotresult);

        if (objects.length > 0) {
            for (i = 0; i < objects.length; i++) {
                percent = floor(objects[i].confidence * 100);
                document.getElementById("result").innerHTML = "Objets Detected = " + objects.length;

                fill('#4169e1');
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke('#4169e1');
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
        else {
            document.getElementById("result").innerHTML = "Nothing Found";
            setTimeout(function(){
                alarm.play();
            }, 5000);
        }
    }
}

function loaded() {
    console.log("COCO Is Ready");
    status = true;
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    alarm.setVolume(1);
    alarm.rate(1);
}

function gotresult(error, results) {
    document.getElementById("status").innerHTML = "Status = Objects Detected";

    if (error) {
        console.error(error);
    }
    else if (results.length > 0) {
        console.log(results);
        objects = results;
    }
}

function stop_sound() {
    alarm.stop();
}