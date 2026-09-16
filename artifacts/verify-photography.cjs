const {chromium}=require('C:/Users/kupie/Desktop/atelierolet/node_modules/@playwright/test');
const {default:AxeBuilder}=require('C:/Users/kupie/Desktop/atelierolet/node_modules/@axe-core/playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext();const page=await context.newPage();const errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4173');
assert.equal(await page.locator('.product-photo img').count(),0);
assert.equal(await page.locator('.product-art').count(),0); assert.equal(await page.locator('.product-symbol').count(),13);
await page.locator('img[src]').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{throw new Error(i.src)})})));
for(const [width,height,label] of [[1440,1000,'desktop'],[390,844,'mobile']]){
 await page.setViewportSize({width,height});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 for(const [selector,name] of [['.hero','hero'],['#product-grid','products'],['.inspiration-section','inspiration']]){
 await page.locator(selector).evaluate(el=>window.scrollTo({top:el.offsetTop-24,behavior:'instant'}));
 await page.screenshot({path:`artifacts/${label}-${name}-photos.png`});
 }
}
for(const [filter,count] of [['rolety',5],['plisy',3],['moskitiery',5],['all',13]]){
 await page.locator(`[data-filter="${filter}"]`).click();
 assert.equal(await page.locator('.product-card:visible').count(),count);
}
const audit=await new AxeBuilder({page}).include('.hero').include('#oferta').include('.inspiration-section').analyze();
assert.deepEqual(audit.violations.map(v=>v.id),[]);assert.deepEqual(errors,[]);
await browser.close();console.log('PASS: all images decode, 13 photo-free products, category filters, responsive layout, axe accessibility and zero JS errors.');
})();



