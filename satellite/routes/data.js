const express = require("express");
const router = express.Router();

let speed = 1;
let radio = '';
l1 = 68;
l = 0;
counter = 0;
let height = 15;
let temp = 1000;
let isWorked = 1;
let inDarkZone = false;
let inMetiorits = false;

function reboot() {
    speed = 1;
    height = 10;
    temp = 1000;
    isWorked = 1;
    counter = 0;
    let inDarkZone = false;
    let inMetiorits = false;
    console.log("SUCESS REBOOT");
}

loop();
function loop() {

    ZonesLogic();
    checkInAnyZone();
    checkTemp();
    chechHeight();
    generateRandomString();

    setTimeout(() => {
        loop()
    }, 100);
}

function ZonesLogic(){
    if (isWorked) {
        temp = 1500 + parseInt(Math.pow((-1), parseInt(Math.random() * 100)) * 100 * Math.random());
        if (inDarkZone) {
            temp -= 500;
        }

        if (inMetiorits) {
            if (Math.random() * 100 < 15) {
                isWorked = 0;
            }
        }
    }
}

function generateRandomString() {

    let chance = parseInt(Math.random() * 100);

    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    switch(chance) {
        case 1: 
            radio = "GrEEtiNgs"
            break;
        case 2:  
            radio = "frOm"
            break;
        
        case 3:  
            radio = "spACe"
            break;

        case 4:  
          radio = "BMsTu"
            break;
      
        case 5:  
            radio = "bRaNC"
            break;
        default:
            for (let i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            radio = result;
      }
  };

function checkTemp(){

    if (temp < 2000 && temp > -50) {
        isWorked = 1;
        console.log(temp, " ", l, " ", inMetiorits, " ", isWorked, " ", counter, " ", radio);
    } else {
        isWorked = 0;
    }
};

function chechHeight(){
    if (height < 10) {
        isWorked = 0;
    }
    if (height > 20) {
        isWorked = 0;
    }
};

function checkInAnyZone(){
    if(!isWorked) {
        speed = 1;
    }

    l += speed /6;



    if (50 < l && 80 > l) {
        inDarkZone = true;
    }
    else {
        inDarkZone = false;
    }

    if ((80 < l && 100 > l) && height > 15) {
        inMetiorits = true;
    }
    else {
        inMetiorits = false;
    }

    if (l > 110) {
        l = 0;
        counter++;
    }
};

router.get("/", (req, res) => {
    res.json({
        "speed": speed,
        "height": height,
        "temperature": temp,
        "connect":parseInt(isWorked),
        "radio": radio.toString,
        "counter": parseFloat(counter)
    });
});

router.put("/changeData",  async (req, res) => {
    const data =  await req.body;
    if("reboot" in data){
        reboot();
    }
    if("speed" in data) {
        speed = data.speed;
    }
    if("height" in data) {
        height = data.height;
    }
});

module.exports = router;