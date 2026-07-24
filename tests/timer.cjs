const {JSDOM}=require('jsdom');
const fs=require('fs');
const path=require('path');

const dom=new JSDOM(fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8'),
  {runScripts:"dangerously",pretendToBeVisual:true});
const {window}=dom;
const D=window.document;
const err=[];
window.addEventListener("error",e=>err.push(e.message));
const click=el=>el.dispatchEvent(new window.MouseEvent("click",{bubbles:true}));
const ok=(c,m)=>{console.log((c?"PASS  ":"FAIL  ")+m); if(!c)process.exitCode=1;};

const realSetInterval = window.setInterval;
const realClearInterval = window.clearInterval;
const ticks = [];
window.setInterval = (fn) => {
  const id = realSetInterval(() => {}, 1e9);
  ticks.push({id, fn});
  return id;
};
window.clearInterval = (id) => {
  const i = ticks.findIndex(t => t.id === id);
  if (i >= 0) ticks.splice(i, 1);
  return realClearInterval(id);
};
const advance = n => { for(let i=0;i<n;i++) ticks.slice().forEach(t => t.fn()); };

setTimeout(()=>{
  click(D.getElementById("fabPrac"));
  click(D.getElementById("m1"));

  ok(D.getElementById("tnum").textContent==="30","timer starts at 30");
  ok(ticks.length===1,"one interval registered");

  advance(5);
  ok(D.getElementById("tnum").textContent==="25","counts down (25 after 5 ticks)");

  advance(20);
  ok(D.getElementById("tnum").textContent==="5","reaches 5");

  advance(5);
  const fb=D.getElementById("fb");
  ok(fb && fb.innerHTML.includes("Time"),"timeout auto-answers with 'Time'");
  ok(D.querySelectorAll("#opts .right").length>=1,"correct answer revealed on timeout");
  ok(D.getElementById("nx")!==null,"next button appears after timeout");
  ok(ticks.length===0,"interval cleared on timeout");

  const frozen=D.getElementById("tnum").textContent;
  advance(3);
  ok(D.getElementById("tnum").textContent===frozen,"timer does not keep running");

  click(D.getElementById("nx"));
  ok(D.getElementById("tnum").textContent==="30","next question resets to 30");
  ok(ticks.length===1,"exactly one interval after restart (no leak)");

  click(D.querySelector("#pracSheet [data-close]"));
  ok(ticks.length===0,"interval cleared when sheet closes");
  ok(!D.getElementById("pracSheet").classList.contains("on"),"sheet closed mid-quiz");

  console.log("\njs errors: "+(err.length?[...new Set(err)].join(" | "):"none"));
  if(err.length) process.exitCode=1;
},400);
