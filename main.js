LeftWristX=0;
LeftWristY=0;

scoreLW=0;
scoreRW=0;

RightWristX=0;
RightWristY=0;
song="";
function preload()
{
   song=loadSound("music.mp3");
}

function setup()
{
   canvas=createCanvas(600,500);
   canvas.center();
   
   video=createCapture(VIDEO);
   video.hide();

   posenet=ml5.poseNet(video,modelLoaded);
   posenet.on("pose",gotResult);
}

function gotResult(results)
{
   if(results.length>0)
   {
      console.log(results);
      LeftWristX=results[0].pose.leftWrist.x;
      LeftWristY=results[0].pose.leftWrist.y;
      console.log("X of left wrist is:"+LeftWristX);
      console.log("Y of Left Wrist is:"+LeftWristY);

      RightWristX=results[0].pose.rightWrist.x;
      RightWristY=results[0].pose.rightWrist.y;
      console.log("X of Right Wrist is:"+RightWristX);
      console.log("Y of Right Wrist is:"+RightWristY);
      scoreLW=results[0].pose.keypoints[9].score;
      console.log("Score of Left wrist is:"+scoreLW);

      scoreRW=results[0].pose.keypoints[10].score;
      console.log("Score of the right wrist is:"+scoreRW);
   }


}

function modelLoaded()
{
   console.log("Posnet is working");
}

function draw()
{
   image(video,0,0,600,600);
   fill("#000099");
   stroke("#47ffff");

   if(scoreLW>0.2)
{
   circle(LeftWristX,LeftWristY,20);

   Number_leftWristY=Number(LeftWristY);
   NLW=floor(Number_leftWristY);

   volume=NLW/500;
   document.getElementById("volume").innerHTML="Volume="+volume;
   song.setVolume(volume);
}

if(scoreRW>0.2)
{
   circle(RightWristX,RightWristY,20);
   if(RightWristY>0 && RightWristY<=100)
   {
      document.getElementById("speed").innerHTML="Speed=0.5x";
      song.rate(0.5);
   }
   else if(RightWristY>100 && RightWristY<=200)
      {
         document.getElementById("speed").innerHTML="Speed=1x";
         song.rate(1);
      
   }
   else if(RightWristY>200 && RightWristY<=300)
      {
         document.getElementById("speed").innerHTML="Speed=1.5x";
         song.rate(1.5);
        
   }
   
   else if(RightWristY>300 && RightWristY<=400)
      {
         document.getElementById("speed").innerHTML="Speed=2x";
         song.rate(2);
        
   }
   
   else if(RightWristY>400 && RightWristY<=500)
      {
         document.getElementById("speed").innerHTML="Speed=2.5x";
         song.rate(2.5);
        
   }
 } 
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}