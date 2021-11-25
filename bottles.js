objects=[];
noline="";
img="";
function back(){
    window.location="index.html";
}
function preload(){
    img=loadImage("bottles.jpg");
}
function setup(){
    canvas=createCanvas(400,350);
    canvas.position(500,215);
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
}
function draw(){
    image(img,0,0,40,350);   
    if(noline=true){
        for (i = 0; i < objects.length; i++) {
            percent=floor(objects[i].confidence*100);
            label=objects[i].label;
            textSize(15);
            strokeWeight(5);
            stroke('#a103fc');
            text(label+"  "+percent+"%",objects[i].x-30,objects[i].y-30);
            noFill();
            stroke('#cee310');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            document.getElementById("objects").innerHTML="There are 4 big objects in the image from which cocossd model has detected "+objects.length+" objects";
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded");
    noline=true;
    objectDetector.detect(img,gotResults);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}