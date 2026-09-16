const { chromium } = require('C:/Users/kupie/Desktop/atelierolet/node_modules/@playwright/test');
const { default: AxeBuilder } = require('C:/Users/kupie/Desktop/atelierolet/node_modules/@axe-core/playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext({viewport:{width:1440,height:1000}}); const p=await context.newPage();
await p.goto('http://127.0.0.1:4173');
await p.locator('.brand-logo').first().evaluate(i=>i.decode());
await p.screenshot({path:'artifacts/desktop-top.png'});
for(const [width,height,name] of [[1440,1100,'desktop'],[390,844,'mobile']]){
await p.setViewportSize({width,height});
await p.locator('.gallery-photo:visible img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading="eager";return i.decode()})));
await p.evaluate(()=>window.scrollTo({top:document.querySelector('#realizacje').offsetTop-24,behavior:'instant'}));
await p.screenshot({path:`artifacts/${name}-gallery.png`});
}
let audit=await new AxeBuilder({page:p}).include('#realizacje').include('.site-header').analyze();
assert.deepEqual(audit.violations.map(v=>v.id),[]);
await p.locator('.gallery-open').first().click();
audit=await new AxeBuilder({page:p}).include('.gallery-dialog').analyze();
assert.deepEqual(audit.violations.map(v=>v.id),[]);
await p.locator('.gallery-close').click();
const nojs=await browser.newPage({javaScriptEnabled:false});
await nojs.goto('http://127.0.0.1:4173');
assert.equal(await nojs.locator('.gallery-photo:visible').count(),22);
const logo=await browser.newPage({viewport:{width:1040,height:400},deviceScaleFactor:2});
await logo.goto('http://127.0.0.1:4173/images/brand/atelier-rolet.svg');
await logo.screenshot({path:'images/brand/atelier-rolet.png',omitBackground:true});
await browser.close();
console.log('PASS: axe header/gallery/modal, no-JS 22 photo links, desktop/mobile visual checks; transparent PNG exported.');
})();


