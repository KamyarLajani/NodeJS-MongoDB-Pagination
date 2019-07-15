const express = require("express");
const route = express();

const puppeteer = require('puppeteer');


(async ()=> {
    var sllaw;
    const browser = await puppeteer.launch({headless: true});
    let page  = await browser.newPage();
    await page.goto('https://instagram.com/accounts/login');
    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');
    await page.waitForSelector('button[type="submit"]')
    await page.click('input[name="username"]');
    await page.type('input[name="username"]','router.js');
    await page.click('input[name="password"]');
    await page.type('input[name="password"]','bestprogrammer123');
    await page.click('button[type="submit"]');
    await page.waitFor(7000);

    // one hour
    let hour = setInterval(perHour, 3600000);
    let hashtags = ["javascript", "html", "coding"];
   
    let hashtagIndex = 0;
    async function perHour(){
        if(hashtagIndex >= hashtags.length) {
            hashtagIndex = 0;
        }
       
        await page.goto(`https://www.instagram.com/explore/tags/${hashtags[hashtagIndex]}/`);
        await page.evaluate(()=>{
            let func = setInterval(loops, 15000);
            let i=0, likes=0;
                function loops() {
                    // stop the loop
                    if(likes <= 25){
                        
                        document.querySelectorAll('div[class="KL4Bh"]')[i+9].click();
                        setTimeout(() => {
                            
                                
                                let like = document.querySelector('button[class="dCJp8 afkep _0mzm-"] span');  
                        
                                if(like.getAttribute("aria-label") == "Like") {
                                    document.querySelector('button[class="dCJp8 afkep _0mzm-"]').click();
                                    
                                    setTimeout(() => {
                                        document.querySelector('button[class="ckWGn"]').click();
                                    }, 5000);
                                    likes++;
                                }
                                else {
                                    document.querySelector('button[class="ckWGn"]').click();
                                    
                                }
                                i++;
                            
                        }, 5000);
                    }
               
                    else {
                        clearInterval(func);
                        
                    }
                      
                    
                }
                loops();
            
        });

        hashtagIndex++;
    }
    perHour();
            
})();


module.exports = route;
