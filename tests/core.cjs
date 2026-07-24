const {JSDOM}=require('jsdom');
const fs=require('fs');

const dom=new JSDOM(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8'),{runScripts:"dangerously",pretendToBeVisual:true});
const {window}=dom;
const D=window.document;
const err=[];
window.addEventListener("error",e=>err.push(e.message));

function click(el){ el.dispatchEvent(new window.MouseEvent("click",{bubbles:true})); }
function ok(c,m){ console.log((c?"PASS  ":"FAIL  ")+m); if(!c)process.exitCode=1; }

setTimeout(()=>{
  // ---- wheel ----
  const wedges=D.querySelectorAll(".wedge");
  ok(wedges.length===10,`wheel renders 10 wedges (got ${wedges.length})`);
  ok(D.querySelectorAll(".wlab").length>=10,"wedge labels present");
  ok(D.getElementById("panel").innerHTML.includes("Hash map"),"panel defaults to pattern 01");

  click(wedges[6]);
  const panel=D.getElementById("panel").innerHTML;
  ok(panel.includes("Dynamic programming"),"clicking wedge 7 loads DP");
  ok(panel.includes("greedy takes 4+1+1"),"DP trap text present");
  ok(D.getElementById("h2").textContent==="07 / 10","hub shows 07 / 10");

  // nav
  click(D.getElementById("next"));
  ok(D.getElementById("h2").textContent==="08 / 10","next advances");
  click(D.getElementById("prev"));
  ok(D.getElementById("h2").textContent==="07 / 10","prev goes back");

  // ---- code sheet is pattern-aware ----
  click(D.getElementById("fabCode"));
  ok(D.getElementById("codeSheet").classList.contains("on"),"code sheet opens");
  ok(D.getElementById("codeTitle").textContent==="Dynamic programming","code title matches current pattern");
  let cb=D.getElementById("codeBody").innerHTML;
  ok(cb.includes("coin_change"),"DP template shown");
  ok(!cb.includes("daily_temperatures"),"stack template NOT shown for DP");

  // switch pattern while sheet open
  click(wedges[3]);
  cb=D.getElementById("codeBody").innerHTML;
  ok(D.getElementById("codeTitle").textContent==="Stack","code sheet follows wedge change");
  ok(cb.includes("daily_temperatures"),"stack template now shown");
  ok(!cb.includes("coin_change"),"DP template gone");

  // tabs
  const tabs=[...D.querySelectorAll("#codeTabs .tab")];
  ok(tabs.length===3,"three code tabs");
  click(tabs[1]);
  ok(D.getElementById("codeBody").innerHTML.includes("Python list as a stack"),"Core DSA tab is pattern-specific");
  click(tabs[2]);
  ok(D.getElementById("codeBody").innerHTML.includes("Reading the constraints"),"Complexity tab renders");

  // every pattern has templates + dsa
  click(tabs[0]);
  let missing=[];
  for(let i=0;i<10;i++){
    click(wedges[i]);
    if(!D.getElementById("codeBody").innerHTML.includes("<pre>")) missing.push(i);
  }
  ok(missing.length===0,`all 10 patterns have templates (missing: ${missing})`);
  click(tabs[1]);
  missing=[];
  for(let i=0;i<10;i++){
    click(wedges[i]);
    if(!D.getElementById("codeBody").innerHTML.includes("<pre>")) missing.push(i);
  }
  ok(missing.length===0,`all 10 patterns have Core DSA (missing: ${missing})`);

  // ---- practice ----
  click(D.getElementById("fabPrac"));
  ok(D.getElementById("pracSheet").classList.contains("on"),"practice sheet opens");
  ok(!D.getElementById("codeSheet").classList.contains("on"),"code sheet closed when practice opens");
  ok(D.getElementById("m1")&&D.getElementById("m2"),"two practice modes offered");

  // mode 1
  click(D.getElementById("m1"));
  let opts=D.querySelectorAll("#opts .opt");
  ok(opts.length===4,`4 answer options (got ${opts.length})`);
  ok(D.getElementById("tnum").textContent==="30","timer starts at 30");
  ok(D.getElementById("pracBody").innerHTML.includes("qtitle"),"problem title shown");
  ok(D.getElementById("pracBody").innerHTML.includes("qtext"),"full description shown");

  // answer wrong deliberately, check feedback
  const correctFirst=[...opts].map(o=>o.dataset.id);
  click(opts[0]);
  let fb=D.getElementById("fb").innerHTML;
  ok(fb.includes("class=\"fb"),"feedback panel appears");
  ok(D.querySelectorAll("#opts .right").length>=1,"correct option highlighted");
  ok(D.getElementById("nx")!==null,"next button appears");

  // second click should be ignored
  const before=D.getElementById("fb").innerHTML;
  click(opts[1]);
  ok(D.getElementById("fb").innerHTML===before,"double-answer ignored");

  // walk the full round
  let guard=0;
  while(D.getElementById("nx")&&guard<40){
    click(D.getElementById("nx"));
    guard++;
    const o=D.querySelectorAll("#opts .opt");
    if(o.length) click(o[0]);
  }
  ok(D.getElementById("pracBody").innerHTML.includes("By pattern"),"results screen reached");
  ok(D.getElementById("again")&&D.getElementById("back"),"results has replay + back");
  ok(/\d+%/.test(D.querySelector(".score .big").textContent),"score percentage rendered");

  // back to menu, mode 2
  click(D.getElementById("back"));
  ok(D.getElementById("m2")!==null,"back returns to menu");
  click(D.getElementById("m2"));
  ok(D.getElementById("pracBody").innerHTML.includes("<pre>"),"code mode shows a code block");
  ok(D.querySelectorAll("#opts .opt").length===4,"code mode has 4 options");

  // close
  click(D.querySelector("#pracSheet [data-close]"));
  ok(!D.getElementById("pracSheet").classList.contains("on"),"sheet closes");

  console.log("\njs errors: "+(err.length?err.join(" | "):"none"));
  if(err.length) process.exitCode=1;
},400);
