const playerFrames={"player 1.png":{frame:{x:276,y:0,w:164,h:255}},"player 2.png":{frame:{x:173,y:270,w:174,h:225}},"player 3.png":{frame:{x:440,y:0,w:164,h:215}},"player 4.png":{frame:{x:347,y:270,w:174,h:225}},"player 5.png":{frame:{x:372,y:737,w:187,h:231}},"player 6.png":{frame:{x:770,y:0,w:173,h:270}},"player 7.png":{frame:{x:355,y:496,w:182,h:214}},"player 8.png":{frame:{x:414,y:968,w:215,h:213}},"player 9.png":{frame:{x:175,y:496,w:180,h:220}},"player 10.png":{frame:{x:521,y:270,w:175,h:219}},"player 11.png":{frame:{x:721,y:496,w:185,h:215}},"player 12.png":{frame:{x:0,y:270,w:173,h:214}},"player 13.png":{frame:{x:629,y:968,w:220,h:247}},"player 14.png":{frame:{x:559,y:737,w:190,h:191}},"player 15.png":{frame:{x:118,y:0,w:158,h:201}},"player 16.png":{frame:{x:0,y:737,w:186,h:225}},"player 17.png":{frame:{x:203,y:968,w:211,h:210}},"player 18.png":{frame:{x:696,y:270,w:175,h:226}},"player 19.png":{frame:{x:537,y:496,w:184,h:221}},"player 20.png":{frame:{x:0,y:968,w:203,h:219}},"player 21.png":{frame:{x:749,y:737,w:192,h:179}},"player 22.png":{frame:{x:604,y:0,w:166,h:159}},"player 23.png":{frame:{x:0,y:496,w:175,h:241}},"player 24.png":{frame:{x:186,y:737,w:186,h:209}},"player 25.png":{frame:{x:0,y:0,w:118,h:102}}};
function rangesOverlap(t,i){return t.start<=i.end&&t.end>=i.start||i.start<=t.end&&i.end>=t.start}function generateRandomInteger(t,i){return Math.floor(t+Math.random()*(i-t+1))}const playerImg=new Image;playerImg.src="Sprites/players.png";let playerId=generateRandomInteger(1,25);var player=new function(){this.x=window.innerWidth/2,this.y=window.innerHeight-200,this.img=playerImg,this.playerId=playerId,this.frameX=playerFrames["player "+this.playerId+".png"].frame.x,this.frameY=playerFrames["player "+this.playerId+".png"].frame.y,this.frameW=playerFrames["player "+this.playerId+".png"].frame.w,this.frameH=playerFrames["player "+this.playerId+".png"].frame.h,this.width=80,this.height=this.width*this.frameH/this.frameW,this.xSpeed=6.7,this.ySpeed=0,this.springBootsDurability=0,this.flyingHatDurability=0,this.rocketDurability=0,this.flyingHatySpeed=-40,this.rocketySpeed=-60,this.flyingHatDistance=.5*this.flyingHatySpeed*this.flyingHatySpeed/.34,this.rocketDistance=.5*this.rocketySpeed*this.rocketySpeed/.34,this.direction="left",this.inPowerup=!1,this.update=function(){if(dead){var t=Date.now();if(ctx.font="60px Arial",ctx.fillStyle="red",ctx.textAlign="center",ctx.fillText("Game Over",screenWidth/2,screenHeight/2),!gameoverActionDone){try{window.flutter_inappwebview.callHandler("returnScore",score,startTime,t)}catch(t){console.error(t)}setTimeout(function(){window.location.reload()},3e3),gameoverActionDone=!0}}else{if(this.ySpeed+=gravity,this.y<=screen.height/2-200&&this.ySpeed<=0)for(var i=0;i<blocks.length;i++)blocks[i].y-=this.ySpeed;else this.y+=this.ySpeed;yDistanceTravelled-=this.ySpeed,0<this.flyingHatDurability&&(this.flyingHatDurability+=this.ySpeed,0<=this.ySpeed)&&(this.flyingHatDurability=0),0<this.rocketDurability&&(this.rocketDurability+=this.ySpeed,0<=this.ySpeed)&&(this.rocketDurability=0)}for(var e,s,i=0;i<blocks.length;i++)0<=this.ySpeed&&this.x>=blocks[i].x-this.width+15&&this.x<=blocks[i].x+blocks[i].width-15&&this.y>=blocks[i].y-this.height&&this.y<=blocks[i].y+blocks[i].height-this.height&&(["spring","springBoots","flyingHat","rocket"].includes(blocks[i].powerup)?this.inPowerup=!0:this.inPowerup=!1,"break"===blocks[i].type||0!==blocks[i].monster?(this.jump(blocks[i].powerup,blocks[i].type),blocks[i]=0):(0<blocks[i].playerId&&(this.playerId=blocks[i].playerId),this.jump(blocks[i].powerup,blocks[i].type),blocks[i].powerup=0)),this.y>blocks[i].y&&(this.inPowerup||0===blocks[i].monster||void 0===blocks[i].monster||0!=this.springBootsDurability||0!=this.flyingHatDurability||0!=this.rocketDurability||(e=rangesOverlap({start:this.x+10,end:this.x+this.width-10},{start:blocks[i].x+10,end:blocks[i].x+50-10}),s=rangesOverlap({start:this.y+10,end:this.y+this.height-10},{start:blocks[i].y+10,end:blocks[i].y+50-10}),e&&s&&(dead=!0)));for(i=blocks.length-1;0<i;i--)if(blocks[i].y>screenHeight){lowestBlock=i+1;break}this.y>=screenHeight-70&&(dead=!0),45<=lowestBlock&&(difficulty<6&&(difficulty+=1),blockSpawner())},this.jump=function(t,i){this.ySpeed=-13.2,"changePlayer"===t&&(this.springBootsDurability=0,this.flyingHatDurability=0,this.rocketDurability=0,this.frameX=playerFrames["player "+this.playerId+".png"].frame.x,this.frameY=playerFrames["player "+this.playerId+".png"].frame.y,this.frameW=playerFrames["player "+this.playerId+".png"].frame.w,this.frameH=playerFrames["player "+this.playerId+".png"].frame.h),"springBoots"===t&&(this.springBootsDurability=6),"flyingHat"===t&&(this.springBootsDurability=0,this.flyingHatDurability=this.flyingHatDistance),"rocket"===t&&(this.springBootsDurability=0,this.flyingHatDurability=0,this.rocketDurability=this.rocketDistance),0===i&&("spring"===t&&(this.ySpeed=-20),"flyingHat"===t&&(this.ySpeed=-40),"rocket"===t)&&(this.ySpeed=-60),0!==this.springBootsDurability&&(this.ySpeed=-20,--this.springBootsDurability)},this.draw=function(){ctx.drawImage(this.img,this.frameX,this.frameY,this.frameW,this.frameH,this.x,this.y,this.width,this.height),0!==this.springBootsDurability&&ctx.drawImage(springBootsImg,this.x+25,this.y+this.height-10,30,30),0<this.flyingHatDurability&&ctx.drawImage(flyingHatImg,this.x+20,this.y-30+5,40,30),0<this.rocketDurability&&ctx.drawImage(rocketImg,this.x+20,this.y-30+5,40,30)}};
var monsterChances={smallRed:30};function spawnMonster(){return 0===Math.round(Math.random()*monsterChances.smallRed)?(monsterChances.smallRed=30,"smallRed"):(monsterChances.smallRed*=.98,0)}var smallRed=new function(){this.img=new Image,this.img.src="Sprites/Monsters/virus1.png",this.xDif=0,this.yDif=0,this.width=50,this.height=50,this.draw=function(s,t){ctx.drawImage(this.img,s+this.xDif,t+this.yDif,this.width,this.height)}},monsterFunctions={smallRed:smallRed};
function block(){this.x,this.y,this.width=100,this.height=15,this.powerup,this.type,this.monster,this.direction="right",this.moveTime=10,this.playerId=0,this.randomId=generateRandomInteger(1,25),this.draw=function(){switch("break"===this.type?ctx.fillStyle="#876537":"sideways"===this.type?ctx.fillStyle="#14a7c8":ctx.fillStyle="#6fbb1d",0===this.monster?ctx.fillRect(this.x,this.y,this.width,this.height):(ctx.fillRect(this.x,this.y,this.width,this.height),monsterFunctions[this.monster].draw(this.x,this.y)),this.powerup){case"spring":ctx.drawImage(springImg,this.x+35,this.y-30,30,30);break;case"springBoots":ctx.drawImage(springBootsImg,this.x+35,this.y-40,40,40);break;case"flyingHat":ctx.drawImage(flyingHatImg,this.x+35,this.y-30,40,30);break;case"rocket":ctx.drawImage(rocketImg,this.x+35,this.y-30,40,30);break;case"changePlayer":for(;this.randomId==playerId;)this.randomId=generateRandomInteger(1,25);this.playerId=this.randomId,frameX=playerFrames["player "+this.playerId+".png"].frame.x,frameY=playerFrames["player "+this.playerId+".png"].frame.y,frameW=playerFrames["player "+this.playerId+".png"].frame.w,frameH=playerFrames["player "+this.playerId+".png"].frame.h,ctx.drawImage(playerImg,frameX,frameY,frameW,frameH,this.x+35,this.y-40,40*frameW/frameH,40)}},this.update=function(){"sideways"===this.type&&(this.x>=screenWidth-this.width?this.direction="left":this.x<=0&&(this.direction="right"),"right"===this.direction?this.x+=2.5:this.x-=2.5),"smallRed"===this.monster&&("right"===this.direction?(this.x+=1,--this.moveTime,0===this.moveTime&&(this.direction="left",this.moveTime=10)):(--this.x,--this.moveTime,0===this.moveTime&&(this.direction="right",this.moveTime=10)))}}
var powerupChances={spring:20,springBoots:20,flyingHat:25,rocket:25,changePlayer:25};const originPowerupChances=powerupChances;function spawnPowerup(){var f=["spring","springBoots","flyingHat","rocket","changePlayer"];for(let A=0;A<f.length;A++){var s=f[A];if(0===Math.round(Math.random()*powerupChances[s]))return powerupChances[s]=originPowerupChances[s],s;powerupChances[s]*=.98}return 0}const springBootsDataUrl="data:image/png;base64,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",springDataUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABkCAMAAADjVt21AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAJ9QTFRF+f8AAAAA+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+f8A+P0B+f8AnZF1AwAAADV0Uk5T/wAktttJbZLq4PUKH8EV1cs+aGOheBB9Gk4Fl43l715ypzSxKi+7nP7Q+qyCU4dYRGzGZDliPkRaAAAEb0lEQVR4nK1ZaWODKBQkongbzxijae6jSZO2u/v/f9s+NB4oiaYy/dIAjiDMYx6gCQcKxTcu4SKklf9v8jqn8whifpnQJsUY9cHFGFqafB7vpoa9DE2E6m3f4jGVu/rxFkmBT3W9r3mc1XsdYalyJsqjbP7OkjOtcp7TOBaKO/Bk/CpNBthSEzYt0rmt5yhplRiyvKYPzXgLC7DIKWWZnRUbGfWPDzmTpPmT59twJCmTL92e6bLXXaV9sNYslWFLi7dJSqpqRMZm6GC4mJdM2zEs8OUDreDJON1xGvOdYRw0frZYpLReK19sHcQH/jLJAbX1CBKbXTX4Cov7EEEb7TlDiy1K8ZRTY9ucwoE4o4Gv78EV+UJ4HOS4Amh2oHdPAI8+Qc6nAB74OgKiGODFchsAu7N+DBwREnGXFRfnKc4ImU0O5Np4RgtXD+kSUu6gfBh5dUh+63B5CEum439tlZoBAbhyEzEtWvEE7z2+Tl/0MV9H220piU4cg+AQNXqyzKN/Baitd/aZJzciPMRVi5bSzWAjy72feZmzLRxp3ZHnRfa8J5vTM+h/cQSvYaOjEJ4VEiFT9AF6jwXwqMDT7+IGYAt/IoAFxecaNsbv7RdTjL+VCBtM2YaaWFMZtn9RyUeK9RBpVL1eS62m7MAZ+3l4YF5FO/yw4W0ZR8WrteSJkFekxi95ZtAmpv+QU8wxHJ5SIFYr3B5Fe5ZFqQ2mHpejnVjQcA0PvZDgp6rG0Gqbk/gt523fFRNK1eFzpqv+mmvfwxGmXkNGf6MB2KBICI+FzOVYjpSQBPQejOXJ1yUyx9Ig6kHnaDeah6IxW+9/Jx02s5aqL/8ojrJql76AJt/zPNe6N59JvVoV/T6PiqyOEFY1Ua41acHJBdkc6RkFtMjjCd4qXq09CwgDMa8ckN21EycIWl1Xldsfn2mYNFtp+FQWv84tqvYY05zE777LwH4y3NflmDY1LmbfcVHa32gAAmSNs74FXNC7iESF+gQhQlUE5U36uMygG9wvcuy+6TKPEE/JiVk3mkuN+ozE1B/3EYDplY+k3KcPp+r1xo6RMd2Dj+0jmocRP0Iduy9DcNgVw9P8CR+Lr3pzb5uMZrOfh5xkr3tIYkHw/jnJLFyVniewxzKzW6PbqVSGshnNLTreh/3AGGdSkbo4UtCSthFKzkIK3lC8hoOQO8P6iPMEqngRwMLOE4ToNAa9KwJ4dOARQAMLBwlJU0biStqzbV/JbDX8VMulmUFu3w9Z45FpVpn1pDhR4Ieiy1mnGyAhjCH4fmhAyw4dmXqEh39/uT4hKXqk+yavdiisuNJTuH2ahPRgId0YVdpfHQ80pCtBNwX4UNVAGj5AU/phkxkmYKUk6Z6gsqCBTvomLVugI95dAZ2bg9QFPRW6cldEjPZDDjvOPfVL6hPGn5oc9/T+Yj8yU/mkexK9T3HGHHEsi0us4p7I+WvSsyyFUt1bmcq7w3Mbpp65RzMHZQUUcesWrX0fl4P6f37wP5933Es9wP/V+Drt+19MJQAAAABJRU5ErkJggg==",flyingHatDataUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAfCAMAAAAm2ZhkAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASlQTFRFAAAAb7sd948e5Rk3b7sdb7sdb7sd4xw55Rk35Rk3b7sdb7sdb7sdb7sdb7sdb7sdb7sdb7sdb7sdb7sdb7sd9pAe5Rk3b7sdb7sdb7sdb7sdb7sd4xw55Rk3b7sdb7sdb7sdb7sdb7sdb7sdb7sdb7sd5Rk3948e948eb7sdb7sdb7sdoasd948e5Rk3b7sdc7odb7sdb7sd5Rs3b7sdb7sd944hb7sd948eb7sd8nAlb7sdnaMf948esaYdzpwe948e7U0s8Wom65Me948eb7sd55Ueb7sd948eebkdb7sd948efrcdhrQd9H0iq6geyJ8e9o8eb7sd948eeLkd948e5h02b7sddLodb7sdb7sdb7sdb7sd83Qk5Rk35iE15Rk3948eb7sd4xrwtAAAAGN0Uk5TAP///yTbtgPdkpJtSer1oRWcBR9E/6Tv+j6sggXgsY274HJjwQreCBXLXir/15gQ/zk0/1jVBMaZl/99HSyJ9XvivujEp/9OEP/Q6+D/////93ui/9v/KWQaaC4U/5v/ld+B3uTcSQAAAapJREFUeJzdlFdzgkAUhRfdXZVFsUaRxG5sSYwtvffeTe///0dkESwjMICjPOS8MCzn3G922XsBGKcEQuIYp2IMVRpjsay2VGFXVf06SycFjVUYJqvYy6jk42t9kz/MnqG+yYsQCrAZCIeLFXba5z/3xcElP2QTSF2+Jz4o+14TUR2HxOLqvYLFA4ek9qbyXikHkF60p6Tk5NJGNqZ0yD1J1hWHrHl6ZPmm1vloqQlA2GfO6sPJ51sF4tjiW+ZSknggmGRIOo10IXPmQwyTAnEL7ofRIDFgxc0cKYzIpZUUtga5VrZyYyklWoMsbncY+xdWQqgCcubdOfF4Y3ft6mOvGIQkiU3eGK8AwK85a4vPQtq6Lnfj69Ejd2IoTOIlw2DpjVrzxtcrx3J+pcVdbqfT6RmcKiEuw+o3PS/IrnxCv7wPBdZ7AG2IrDpFsct04sWUZLQzkAaitVRMXT+N7rLwZbiYHqS/MWWOv2t8yhKMpVHkpQ8sEgJhULOGIWQccs1SyMKEIdMzFDI1YYgtO7Hnn/wvyLcdEBt20rCnGT8nDLGlGf8PZLTb9QehiSUB4CmVMAAAAABJRU5ErkJggg==",rocketDataUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABkCAMAAADjVt21AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAqZQTFRFAAAAvcPH4FZB50w8h2U3b7sdNElevcPHvcPHz42EopR/yKal4FZB4FZB4FZB4FZBu8HF4FZBNEpg4FZBPFBkN0xg50w84FZBi5ahNU1e4FZBVmd4trzB50w8usDES11v50w8h2U34FZB50w8NVFdXJo1h2U34FZB4FZB4FZBOU1i50s84FZBYJ8un6iw50w8a3qJNktfPFlX31pH4FZB4FdCaK0nXp8x50w8bbkg31dD4FdCoaqyh2U3YqMteIWSO19W50k84FZBU2V2h2U3QFRnmKKr50w84FZB50w9arIkuL/D4FZBSVxu4FZBcH+M4FZB4FZB4FdC50s8OlZY4FZB4FZB50w84FZB4FZB4FZC4FZCRllsbLgi4FdC50w831lFTV9x4FdC50w8WJk34FZB50w8sLi9QGNV4FZBnKWu50095ks850w8lJ+o4FZBc4GO4FZBOFNc50w84FZB4FZCTmBy4FdC4FdC4FZB50w9vcPH50w8h2U34FZBVJM8ypmTq7O550w8UYZB50s8ZXWD50w8q6SXR3hKwLq8w7Gyh2U350s7s7Kt50w850w831tH50w850w84FZBn6mxWWp6hJGcvcPHUYY/4FZB3WZVzZKL4FZBh2U350w8kZuls7q/50w8ZK4q50w84FZB50w84FZBPmVUTH1I50w84FZBpa20Xm9/3l1L4FZBW54z50w84FZBh2U34FhDh2U331hET4JBNE9n4FZBZKkv50w8h2U350w8h2U36k45VIw9SX5IXqM24FZBOldd4FZB50w84FZB5UY+4FZBQWdQ31hEWZU9Q1ZqYnKBiJSeaHiGrra831tH5ks7p7C34FhEP2pTS3hI4FZBUIpA4FdC50w74FZB50w850w84FZB6E0731hE4FZBfLhZVgAAAOJ0Uk5TAP///////4DA////CPz4t//v/4D///kE//+////8///aYWfv///v2Tgg/xwY//9d////DeeS///j/2ey/xD///8EJ//P//+/EDf//+z/uv+K45cK/zRQi0BI1fP//2vzGf+CA//Qz///3P8YDZP/9v9g//cj3/+jbhMIQE6Pr//P/3n/Ev+Nv//Q4jBXnNOkByZme////2D/WwHnmKDG//94/0jHu6D//9/D//8Edf9sC/dXGC7//5v/IziBqAH///8d/zAsRAGG/zT///////8WBv9B//8H/39Tn3DKDwwwOwVuE9YAAAOZSURBVHic7dj1WxRBGAfwY4Z7Me64O+lGSkFCFASkDEJAxACl7QAFu7u7W7G7u7u7u/U/ce445Pbudndm4NHn8eH70z63c59ndqd2RqGQSRe/burBA17JFZNTHHRIH/vofnVQVL019qg6avf2bXmZcV9qFEOV4s9xKS75hUiY8WdWcTiTeiDz6KLZmdEWij6fWJkCqwxCk9iYTjoRR/2WydGIMAiVMTS/y1pRBqGJ9FB+VwnHvpSWUYk/lT6F/SidlvaSjro9pfNQkkFIc4yKmTxYxtH9pHLuyzAIDaByuss6mg8UjEs3WafFYwonr4WsU0TTYqPFhpZJelI4DvIMiq8nx/0vOnY28mnU4DQ4DU49Od7aujtpL3xCIPLpUVfvujjhHlCTYlOJzdEmO+mFZheaGaRnnpyOK2Hc3gWWKJW3FgUQKEfL5bwpBsidGac0JKYDgGMlj+PdGiAgSVmTzEcAnWdzODtSIWCQsja7O4DTKA6HVOdAiYmjvAnQn8PxAbhhyiiT3AA82R3SWGECp10bgHB2h3QcS6ec3QkBiBE6uQAJ7M4EgLkCJ8YNIjneT04kDMs0YeLekw7E0V4JPuB2Pq7WCRwDjht4xkUOedNP/jCX7gB4DOVxXmYT6KOROTGGjK9ynvFFZp9UMsjbHBwUFrhpGLkKeW7D59is84HaOLra8DraI/MdjYqTR2UWt0OkhOT1E7L7e7ROyzL9mWe90HoO3Wm+YPwf6+A/dSZvpXAWv5ZjVBMbUzhNrw6UZlyqEJXjvEbaKUV0Du47TYop0NE62LeVONNbv+GmdPChe2JMyyjE4OAhIjUaV31wRO3gffOsMaHxiNHBC3pZMqf2qpmdvhUdzRnVxZq9HoODvXZdN3OiEY+DnSOEzN2RfA6OFTSan8menc3BKzJqmV+m50+MDvZdLex/vA7+Nrya+S48xmJ2nPtMMfS/KnXdHDz2K4FU7kKGw8H+fQZaHkNwONhrmcLi7ILHwf715OAGh9EZP4vCWbLdWcY5Hky1vo/4HCvhlHUPpv5O6BWR7mXdObxZpR9v1N8bDzJW+ls4uv3Bxllkqh3J8iZiWai/vdFY9sdJX4ETNSNUOM82txXLNWHBjnOGeBkddZlDJ5XZtL9N1AkyX2mGR6SPJU6Rxu+2+S3F2SBRx7a5RekReypiFXnmVdFnujhjm5JoWX7LZSuIQpGYIuEELbX6H2u5clrCsfJgJL8BpzypxEiEEjcAAAAASUVORK5CYII=",springImg=new Image,springBootsImg=(springImg.src=springDataUrl,new Image),flyingHatImg=(springBootsImg.src=springBootsDataUrl,new Image),rocketImg=(flyingHatImg.src=flyingHatDataUrl,new Image);rocketImg.src=rocketDataUrl;
function spawnBlock(){var a=15,n=Math.round(10/difficulty);return 0===Math.round(Math.random()*a)?"break":0===Math.round(Math.random()*n)?"sideways":0}
function blockSpawner(){for(o=0===lowestBlock?1:lowestBlock;o<lowestBlock+60;o++)o>=blocks.length&&(blocks.push(new block),"break"===blocks[o-1].type?blocks[o].type=0:blocks[o].type=spawnBlock(),blocks[o].powerup=0,(blocks[o].monster=0)===blocks[o].type&&(3<o&&(blocks[o].powerup=spawnPowerup()),0===blocks[o].powerup)&&(blocks[o].monster=spawnMonster()),blocks[o].x=Math.random()*(screenWidth-blocks[o].width),"break"===blocks[o].type||"break"===blocks[o-1].type?blocks[o].y=blocks[o-1].y-(Math.random()*(100+25*difficulty)+30)/2:0!==blocks[o].monster||0!==blocks[o-1].monster?blocks[o].y=blocks[o-1].y-(Math.random()*(100+25*difficulty)+50):blocks[o].y=blocks[o-1].y-(Math.random()*(100+25*difficulty)+80),250<blocks[o-1].y-blocks[o].y)&&(blocks[o].y=blocks[o-1].y-250);for(var o=0;o<lowestBlock-2;o++)blocks.shift()}
const c=document.createElement("canvas"),ctx=(c.id="game-container",c.getContext("2d")),screenWidth=window.innerWidth,screenHeight=window.innerHeight,gravity=(c.width=screenWidth,c.height=screenHeight,document.body.appendChild(c),window.addEventListener("keydown",this.keydown,!1),window.addEventListener("keyup",this.keyup,!1),.34);var keycode,holdingLeftKey=!1,holdingRightKey=!1,dead=!1,difficulty=0,lowestBlock=0,score=0,yDistanceTravelled=0;let gameoverActionDone=!1;var blocks=[],powerups=[];let pause=!0;var now,delta,fps=60,then=Date.now(),interval=1e3/fps;function showScore(){score<yDistanceTravelled&&(score=Math.round(yDistanceTravelled/100)),ctx.font="36px Arial",ctx.fillStyle="black",ctx.textAlign="left",ctx.fillText(score,15,40)}function loop(){if(requestAnimationFrame(loop),now=Date.now(),interval<(delta=now-then)){ctx.clearRect(0,0,screenWidth,screenHeight);for(var e=0;e<blocks.length;e++)0!==blocks[e]&&(blocks[e].update(),blocks[e].draw());pause||(player.update(),player.draw(),showScore(),ctx.fill(),then=now-delta%interval)}}blocks.push(new block),blocks[0].x=screenWidth/2-50,blocks[0].y=screenHeight-50,blocks[0].monster=0,blocks[0].type=0,blocks[0].powerup=0,blockSpawner(),loop();
function findPeaksAndTroughs(e,t){for(var n=(e=group(2,e)).length-2,o={peaks:[],troughs:[]},a=1;a<=n;a++){var i=e[a],r=e[a-1],d=e[a+1];d+5<i&&r+5<i?o.peaks.push(a):i<d-5&&i<r-5&&o.troughs.push(a)}return o}function group(o,e){let t=[];return t=0<o&&o<=e.length?e.reduce((e,t,n)=>(n%o==0?e.push(t):e[e.length-1]+=t,e),[]):t}window.onload=function(){const i=document.getElementById("video"),r=window.innerHeight,d=window.innerWidth;document.getElementById("main-container").style.width=d+"px",document.getElementById("main-container").style.height=r+"px";var s;let l,c=[];const m=[5,6];!async function(){document.getElementById("loader-container").style.top=r/2-100+"px",document.getElementById("loader-container").style.left=d/2-50+"px",document.getElementById("loader-container").classList.toggle("hidden"),await tf.ready();var e={modelType:poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};l=await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet,e),navigator.mediaDevices.getUserMedia({video:{facingMode:"user",frameRate:{max:12}}}).then(e=>{i.srcObject=e}),await new Promise(e=>setTimeout(e,2e3)),document.getElementById("loader-container").classList.toggle("hidden");try{window.flutter_inappwebview.callHandler("gameState","loaded")}catch(e){}}().then(()=>{!async function e(){var t=Date.now();const n=await l.estimatePoses(i);if(0<n.length&&(a=(o=m.map(e=>n[0].keypoints[e])).map(e=>e.x).reduce((e,t)=>e+t)/o.length,.5<o.map(e=>e.score).reduce((e,t)=>e+t)/o.length)&&(c.push(n),gameoverActionDone||(o=r/i.videoHeight,a=d-(a*o-i.videoWidth/2),player.x=a)),12<c.length&&pause){c.shift();var o=c.map(e=>e[0].keypoints[5]).map(e=>e.y),a=(a=findPeaksAndTroughs(o,r)).peaks.length+a.troughs.length,o=Math.max(...o)-Math.min(...o);if(1<a&&o>r/24){pause=!1,null==s&&(s=Date.now());try{window.flutter_inappwebview.callHandler("gameState","start")}catch(e){console.error(e)}}}a=Date.now()-t,o=Math.max(83-a,0);setTimeout(()=>{e()},o)}()})};