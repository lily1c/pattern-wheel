const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8'),{runScripts:"dangerously",pretendToBeVisual:true});
const {window}=dom;const D=window.document;const err=[];
window.addEventListener("error",e=>err.push(e.message));
const click=el=>el.dispatchEvent(new window.MouseEvent("click",{bubbles:true}));
const ok=(c,m)=>{console.log((c?"PASS  ":"FAIL  ")+m);if(!c)process.exitCode=1;};
const type=(el,v)=>{el.value=v;el.dispatchEvent(new window.Event("input",{bubbles:true}));};

setTimeout(()=>{
  // ---- pool size ----
  click(D.getElementById("fabPrac"));
  const m=D.getElementById("pracBody").innerHTML.match(/from (\d+) labelled problems/);
  ok(m && +m[1]>700, `pool is ${m?m[1]:"?"} problems`);
  click(D.querySelector("#pracSheet [data-close]"));

  // ---- dictionary ----
  ok(D.getElementById("fabDict"),"dictionary button exists");
  click(D.getElementById("fabDict"));
  ok(D.getElementById("dictSheet").classList.contains("on"),"dictionary opens");
  const n=D.getElementById("dictCount").textContent;
  ok(/\d+ entries/.test(n),`shows count: ${n}`);
  ok(D.querySelectorAll(".dentry").length>40,"entries rendered");

  const first=D.querySelector(".dterm").textContent;
  ok(first.charAt(0).toUpperCase()<=D.querySelectorAll(".dterm")[5].textContent.charAt(0).toUpperCase(),"alphabetical by default");

  // search: exact term
  type(D.getElementById("dq"),"amortised");
  let terms=[...D.querySelectorAll(".dterm")].map(x=>x.textContent);
  ok(terms.length>0 && terms[0].includes("Amortised"),`exact match ranks first: ${terms[0]}`);
  ok(D.querySelector(".dhit"),"search term is highlighted");

  // search: synonym via keywords field
  type(D.getElementById("dq"),"tortoise");
  terms=[...D.querySelectorAll(".dterm")].map(x=>x.textContent);
  ok(terms.some(t=>t.includes("Fast and slow")),"keyword synonym search works");

  // search: body text
  type(D.getElementById("dq"),"Rotting Oranges");
  terms=[...D.querySelectorAll(".dterm")].map(x=>x.textContent);
  ok(terms.some(t=>t.includes("Multi-source")),"definition-body search works");

  // no match
  type(D.getElementById("dq"),"zzzznotathing");
  ok(D.querySelector(".dnone"),"empty state shown");

  // category filter
  type(D.getElementById("dq"),"");
  const cats=[...D.querySelectorAll(".dcat")];
  ok(cats.length===5,"five category chips");
  click(cats[3]); // complexity
  const labs=[...D.querySelectorAll(".dcatlab")].map(x=>x.textContent);
  ok(labs.length>0 && labs.every(l=>l==="Complexity"),`category filter works (${labs.length} shown)`);
  click(cats[0]);
  ok(D.querySelectorAll(".dentry").length>40,"back to all");

  // sheets are mutually exclusive
  click(D.getElementById("fabCode"));
  ok(!D.getElementById("dictSheet").classList.contains("on"),"dict closes when code opens");
  ok(D.getElementById("codeSheet").classList.contains("on"),"code opens");

  // ---- multi-answer ----
  let multiSeen=0, multiOk=0;
  for(let r=0;r<12;r++){
    click(D.getElementById("fabPrac"));
    click(D.getElementById("m1"));
    for(let i=0;i<10;i++){
      const opts=[...D.querySelectorAll("#opts .opt")];
      if(!opts.length)break;
      click(opts[0]);
      const rights=D.querySelectorAll("#opts .right").length;
      if(rights>1){multiSeen++; if(D.getElementById("fb").innerHTML.includes("accepts"))multiOk++;}
      const nx=D.getElementById("nx"); if(!nx)break; click(nx);
    }
    if(D.getElementById("back"))click(D.getElementById("back"));
  }
  ok(multiSeen>0,`multi-answer questions appeared (${multiSeen})`);
  ok(multiSeen===multiOk,`all multi-answer show "accepts" wording (${multiOk}/${multiSeen})`);

  console.log("\njs errors: "+(err.length?[...new Set(err)].join(" | "):"none"));
  if(err.length)process.exitCode=1;
},500);
