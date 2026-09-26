import fs from 'node:fs/promises';
const root='/home/monk/Projects/insanDegreecollege/frontend';
const tabs=await fetch('http://127.0.0.1:9222/json').then(r=>r.json());
const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
let seq=0;const pending=new Map();
ws.onmessage=e=>{const r=JSON.parse(e.data);if(r.id){const p=pending.get(r.id);pending.delete(r.id);r.error?p.reject(r.error):p.resolve(r.result)}};
function send(method,params={}){return new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))})}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Page.bringToFront');await send('Emulation.setFocusEmulationEnabled',{enabled:true});
const exceptions=[];ws.addEventListener('message',e=>{const r=JSON.parse(e.data);if(r.method==='Runtime.exceptionThrown')exceptions.push(r.params.exceptionDetails.text)});
await fs.mkdir(root+'/.impeccable/review',{recursive:true});
await send('Page.navigate',{url:'http://127.0.0.1:8080/'});await sleep(500);
await evaluate(`localStorage.removeItem('insan-theme')`);
const layout=[];
for(const theme of ['light','dark']){
 for(const width of [320,390,768,1024,1440,1920]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});
  await send('Page.navigate',{url:'http://127.0.0.1:8080/'});await sleep(450);
  await evaluate(`Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))`);
  await evaluate(`document.querySelector('iframe').loading='eager'`);
  const data=await evaluate(`(()=>({theme:document.documentElement.dataset.theme,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,headerHeight:document.querySelector('header').getBoundingClientRect().height,logos:[...document.querySelectorAll('.header-inner img')].map(i=>i.getBoundingClientRect().width),brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),badAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>a.hash&&!document.getElementById(a.hash.slice(1))).map(a=>a.hash),posterRatio:document.querySelector('.philosophy-poster img').getBoundingClientRect().width/document.querySelector('.philosophy-poster img').getBoundingClientRect().height,hasOldSentence:document.body.innerText.includes('Practical experience, shared celebrations'),formLabelCount:document.querySelectorAll('label[for]').length,reducedMotionPause:document.querySelector('#notice-pause').textContent,height:document.documentElement.scrollHeight,h1:document.querySelectorAll('h1').length,structuredData:JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@type']}))()`);
  if([390,1440].includes(width)||(theme==='light'&&[320,768].includes(width))){
   await sleep(1200);
   const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:data.height,scale:1}});
   await fs.writeFile(root+`/.impeccable/review/${theme}-${width}.png`,Buffer.from(shot.data,'base64'));
  }
  if(width<1024){await evaluate(`document.querySelector('.mobile-menu summary').focus()`);await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});data.keyboardMenu=await evaluate(`document.querySelector('.mobile-menu').open`);data.menuOverflow=await evaluate(`document.documentElement.scrollWidth>innerWidth`);}
  layout.push(data);
 }
}
await send('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:'http://127.0.0.1:8080/'});await sleep(500);
const interaction={};
interaction.systemDark=await evaluate(`document.documentElement.dataset.theme==='dark'`);
await evaluate(`document.querySelector('#theme-toggle').click()`);
interaction.switchLight=await evaluate(`document.documentElement.dataset.theme==='light'&&document.querySelector('#theme-toggle').getAttribute('aria-pressed')==='false'`);
await send('Page.reload');await sleep(500);
interaction.themePersists=await evaluate(`document.documentElement.dataset.theme==='light'`);
await evaluate(`document.querySelector('#notice-next').click()`);await sleep(100);
interaction.nextNotice=await evaluate(`document.querySelector('#notice-position').textContent==='2 / 2'`);
await evaluate(`document.querySelector('#notice-prev').click()`);await sleep(100);
interaction.previousNotice=await evaluate(`document.querySelector('#notice-position').textContent==='1 / 2'`);
interaction.invalidEmptyForm=await evaluate(`!document.querySelector('form').checkValidity()`);
await evaluate(`document.querySelector('#enquiry-email').value='wrong';document.querySelector('#enquiry-name').value='Student';document.querySelector('#enquiry-message').value='A question'`);
interaction.invalidEmail=await evaluate(`!document.querySelector('form').checkValidity()`);
await evaluate(`document.querySelector('#enquiry-email').value='student@example.com';document.querySelector('#enquiry-message').value='   ';document.querySelector('form').requestSubmit()`);
interaction.whitespaceRejected=await evaluate(`!document.querySelector('#enquiry-message').checkValidity()&&document.querySelector('#enquiry-result').hidden`);
await evaluate(`(()=>{const m=document.querySelector('#enquiry-message');m.value='<img src=x onerror=alert(1)> & fee question?';m.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('#enquiry-name').value='Asha & Ali';document.querySelector('form').requestSubmit()})()`);
interaction.safeDraft=await evaluate(`(()=>({visible:!document.querySelector('#enquiry-result').hidden,noInjectedImage:!document.querySelector('#enquiry-preview img'),literalText:document.querySelector('#enquiry-preview').textContent.includes('<img src=x onerror=alert(1)>'),recipient:document.querySelector('#enquiry-email-link').href.startsWith('mailto:contact@insandegreecollege.co.in?subject='),encoded:document.querySelector('#enquiry-email-link').href.includes('%3Cimg'),focus:document.activeElement.id==='enquiry-result'}))()`);
await evaluate(`document.querySelector('#enquiry-name').dispatchEvent(new Event('input',{bubbles:true}))`);
interaction.staleDraftCleared=await evaluate(`document.querySelector('#enquiry-result').hidden`);
await evaluate(`window.__blocked=false;document.addEventListener('securitypolicyviolation',e=>{if(e.violatedDirective==='script-src-elem')window.__blocked=true});const s=document.createElement('script');s.textContent='window.__unsafeExecuted=true';document.head.append(s)`);await sleep(100);
interaction.cspBlocksInline=await evaluate(`window.__blocked&&!window.__unsafeExecuted`);
interaction.pdfLinks=await evaluate(`Promise.all([...document.querySelectorAll('.notice-slide a')].map(a=>fetch(a.href).then(r=>({url:a.getAttribute('href'),status:r.status,type:r.headers.get('content-type')})).catch(()=>({blocked:true}))))`);
// Fetch is correctly disallowed by connect-src; verify PDF navigation endpoints from the test process instead.
const pdfResponses=await Promise.all(['notice.pdf','notice1.pdf'].map(async p=>{const r=await fetch('http://127.0.0.1:8080/'+p);return {path:p,status:r.status,type:r.headers.get('content-type')};}));
const map=await send('Page.getFrameTree');
interaction.mapFrame=(map.frameTree.childFrames||[]).map(f=>f.frame.url);
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'},{name:'prefers-color-scheme',value:'light'}]});
await send('Page.reload');await sleep(600);
await evaluate(`document.querySelector('#theme-toggle').focus()`);
const before=await evaluate(`document.querySelector('#notice-position').textContent`);await sleep(8300);
interaction.autoMoves=await evaluate(`document.querySelector('#notice-position').textContent!==${JSON.stringify(before)}`);
await evaluate(`document.querySelector('#notice-pause').click()`);
const paused=await evaluate(`document.querySelector('#notice-position').textContent`);await sleep(8300);
interaction.pauseStops=await evaluate(`document.querySelector('#notice-position').textContent===${JSON.stringify(paused)}&&document.querySelector('#notice-pause').getAttribute('aria-pressed')==='true'`);
await send('Emulation.setScriptExecutionDisabled',{value:true});await send('Page.reload');await sleep(500);
interaction.noJS=await evaluate(`({formAction:document.querySelector('form').getAttribute('action'),noticeLinks:document.querySelectorAll('.notice-slide a').length,themeHidden:document.querySelector('#theme-toggle').hidden})`);
await send('Emulation.setScriptExecutionDisabled',{value:false});
const report={layout,interaction,pdfResponses,exceptions};await fs.writeFile(root+'/.impeccable/review/audit-checks.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));ws.close();
