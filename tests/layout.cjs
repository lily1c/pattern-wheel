const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8'),{runScripts:"dangerously",pretendToBeVisual:true});
const {window}=dom;const D=window.document;const err=[];
window.addEventListener("error",e=>err.push(e.message));
const click=el=>el.dispatchEvent(new window.MouseEvent("click",{bubbles:true}));
const ok=(c,m)=>{console.log((c?"PASS  ":"FAIL  ")+m);if(!c)process.exitCode=1;};
setTimeout(()=>{
  // layout structure
  ok(D.querySelector(".stage"),"stage grid exists");
  ok(D.querySelector(".col-wheel svg#wheel"),"wheel is in left column");
  ok(D.querySelector(".col-wheel .nav"),"nav moved into left column");
  ok(D.getElementById("panel").classList.contains("col-info"),"panel is the right column");
  ok(D.querySelector(".col-info .duo"),"cost+tells paired in a duo row");

  // css presence
  const css=D.querySelector("style").textContent;
  ok(css.includes("grid-template-columns:392px"),"desktop two-col rule present");
  ok(css.includes("position:sticky"),"wheel is sticky on desktop");

  // bank merged
  click(D.getElementById("fabPrac"));
  const menu=D.getElementById("pracBody").innerHTML;
  const m=menu.match(/from (\d+) labelled problems/);
  ok(m && +m[1]>300, `pool merged: ${m?m[1]:"?"} problems`);

  // run 12 questions across the merged pool, verify all render
  let bad=0, codeSpans=0;
  for(let round=0;round<3;round++){
    click(D.getElementById("m1"));
    for(let i=0;i<10;i++){
      const t=D.querySelector(".qtitle"), x=D.querySelector(".qtext");
      if(!t||!t.textContent.trim()||!x||x.textContent.trim().length<40) bad++;
      if(x && x.innerHTML.includes('class="ic"')) codeSpans++;
      if(x && /`/.test(x.textContent)) bad++;   // raw backticks must be gone
      const o=D.querySelectorAll("#opts .opt"); if(!o.length)break;
      click(o[0]);
      const nx=D.getElementById("nx"); if(!nx)break; click(nx);
    }
    if(D.getElementById("back")) click(D.getElementById("back"));
  }
  ok(bad===0,`30 questions rendered cleanly (${bad} defects)`);
  ok(codeSpans>0,`backticks rendered as inline code (${codeSpans} seen)`);

  console.log("\njs errors: "+(err.length?[...new Set(err)].join(" | "):"none"));
  if(err.length)process.exitCode=1;
},400);
