import re

import os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def read(p): return open(os.path.join(ROOT, p), encoding='utf-8').read().strip()

pdata = read('src/patterns.js')
tpl   = read('src/templates.js')
qbank = read('src/questions-seed.js')
bank  = read('src/questions-dataset.js')
dic   = read('src/dictionary.js')

HEAD = r'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#F2F0E9">
<title>Pattern Wheel — 10 LeetCode patterns</title>
<meta name="description" content="Ten algorithmic patterns, the keywords that give them away, and why the tempting alternative fails.">
<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
:root{
  --paper:#F2F0E9; --ink:#1A1A1A; --rose:#C4577F;
  --mute:#6E6A63; --line:#D9D5CB; --card:#FFF;
  --mono:'Courier New',ui-monospace,monospace;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;
}
html,body{margin:0;padding:0}
body{background:var(--paper);color:var(--ink);font-family:var(--sans);
  -webkit-font-smoothing:antialiased;overflow-x:hidden}
.wrap{max-width:560px;margin:0 auto;padding:22px 18px 96px}
.stage{display:block}
.col-wheel{}
.col-info{}

.eyebrow{font-family:var(--mono);font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:var(--mute)}
.mast{margin-bottom:4px}
.logo{width:252px;height:auto;display:block}
.sub{margin:14px 0 0;font-size:14.5px;line-height:1.6;color:var(--mute);max-width:52ch}

.wheelbox{display:flex;justify-content:center;margin:22px 0 4px;touch-action:manipulation}
svg#wheel{width:100%;max-width:400px;height:auto;display:block}
.wedge{cursor:pointer;transition:opacity .2s}
.wlab{pointer-events:none;font-size:10px;font-weight:600;font-family:var(--sans)}
.hint{text-align:center;font-size:12.5px;color:var(--mute);margin:2px 0 18px;font-family:var(--mono)}

.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin-bottom:12px}
.hero{background:var(--card);border:1px solid var(--line);border-left:3px solid var(--rose);
  border-radius:4px 14px 14px 4px;padding:16px 18px;margin-bottom:12px}
.hero .heron{font-family:var(--mono);font-size:10.5px;letter-spacing:2px;text-transform:uppercase;
  color:var(--rose);margin-bottom:7px}
.hero h2{margin:0 0 7px;font-size:24px;letter-spacing:-.5px;font-weight:700;line-height:1.12;color:var(--ink)}
.hero p{margin:0;font-size:14.5px;line-height:1.6;color:var(--mute)}
.kws{display:flex;flex-wrap:wrap;gap:6px;margin-top:13px}
.kw{font-family:var(--mono);font-size:11.5px;padding:5px 10px;border-radius:6px;line-height:1;
  background:var(--paper);border:1px solid var(--line);color:var(--mute)}
.sec{font-family:var(--mono);font-size:10.5px;letter-spacing:1.6px;text-transform:uppercase;color:var(--mute);margin:0 0 10px}
.cx{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.cxb{background:var(--paper);border-radius:10px;padding:10px 12px}
.cxb .l{font-family:var(--mono);font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:var(--mute)}
.cxb .v{font-family:var(--mono);font-size:17px;font-weight:700;margin-top:3px;color:var(--ink)}
.note{font-size:13px;line-height:1.5;color:var(--mute);margin:8px 0 0}
.trap{border-top:1px solid var(--line);padding:12px 0 0;margin-top:12px}
.trap:first-of-type{border-top:0;padding-top:0;margin-top:0}
.trap .n{font-size:14.5px;font-weight:600;display:flex;gap:8px;align-items:flex-start;line-height:1.35}
.trap .x{color:var(--rose);flex-shrink:0;font-weight:700}
.trap .w{font-size:13.5px;line-height:1.55;color:var(--mute);margin:5px 0 0 20px}
ul.tell{margin:0;padding:0 0 0 18px}
ul.tell li{font-size:13.5px;line-height:1.6;color:var(--mute);margin-bottom:6px}
ul.tell li b{color:var(--ink);font-weight:600}
.probs{display:flex;flex-wrap:wrap;gap:6px}
.prob{font-size:12.5px;padding:5px 10px;border-radius:6px;background:var(--paper);color:var(--mute);border:1px solid var(--line)}
.nav{display:flex;gap:8px;margin:14px 0 6px}
.nav button{flex:1;padding:11px 0;font-size:13px;font-weight:600;border-radius:10px;
  border:1px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer;font-family:var(--sans)}
.nav button:active{transform:scale(.98)}

.fabs{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));
  display:flex;flex-direction:column;gap:9px;z-index:40;align-items:flex-end}
.fab{border:0;border-radius:26px;padding:13px 19px;font-size:14px;font-weight:600;
  font-family:var(--sans);cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.18)}
.fab:active{transform:scale(.97)}
.fab.code{background:var(--ink);color:var(--paper)}
.fab.plain{background:var(--card);color:var(--ink);border:1px solid var(--line)}

.scrim{position:fixed;inset:0;background:rgba(26,26,26,.45);opacity:0;pointer-events:none;
  transition:opacity .28s;z-index:50}
.scrim.on{opacity:1;pointer-events:auto}
.sheet{position:fixed;left:0;right:0;bottom:0;z-index:60;background:var(--paper);
  border-radius:18px 18px 0 0;transform:translateY(100%);
  transition:transform .3s cubic-bezier(.32,.72,0,1);max-height:90vh;
  display:flex;flex-direction:column;box-shadow:0 -6px 28px rgba(0,0,0,.18)}
.sheet.on{transform:translateY(0)}
.grab{width:38px;height:4px;background:var(--line);border-radius:2px;margin:9px auto 4px;flex-shrink:0}
.shead{padding:4px 16px 11px;border-bottom:1px solid var(--line);flex-shrink:0;
  display:flex;justify-content:space-between;align-items:flex-end;gap:12px}
.shead h3{margin:3px 0 0;font-size:19px;font-weight:700;letter-spacing:-.3px}
.close{background:none;border:0;font-size:22px;color:var(--mute);cursor:pointer;padding:0 2px;line-height:1}
.tabs{display:flex;gap:6px;overflow-x:auto;padding:10px 16px;border-bottom:1px solid var(--line);
  flex-shrink:0;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{white-space:nowrap;font-size:12.5px;padding:7px 13px;border-radius:20px;border:1px solid var(--line);
  background:transparent;color:var(--mute);cursor:pointer;font-family:var(--sans)}
.tab.on{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.sbody{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:14px 16px calc(28px + env(safe-area-inset-bottom))}
pre{margin:0 0 14px;background:var(--ink);color:#E8E4DA;border-radius:12px;padding:14px;
  overflow-x:auto;font-family:var(--mono);font-size:12.5px;line-height:1.62}
pre .c{color:#8C8880}
pre .k{color:#E39CB6}
pre .s{color:#C9C4B8}
.codeh{font-size:14.5px;font-weight:600;margin:0 0 6px}
.codes{font-size:13px;color:var(--mute);margin:0 0 9px;line-height:1.5}
table.cx2{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:16px}
table.cx2 th{text-align:left;font-family:var(--mono);font-size:10.5px;letter-spacing:1px;
  text-transform:uppercase;color:var(--mute);padding:0 8px 7px 0;font-weight:400}
table.cx2 td{padding:7px 8px 7px 0;border-top:1px solid var(--line);vertical-align:top}
table.cx2 td.m{font-family:var(--mono);font-size:12.5px;white-space:nowrap}

.dsearch{padding:11px 16px 12px;border-bottom:1px solid var(--line);flex-shrink:0}
#dq{width:100%;padding:11px 13px;font-size:15px;font-family:var(--sans);border-radius:10px;
  border:1px solid var(--line);background:var(--card);color:var(--ink);outline:none}
#dq:focus{border-color:var(--rose);box-shadow:0 0 0 3px #FBEEF3}
.dcats{display:flex;gap:6px;margin-top:10px;overflow-x:auto;scrollbar-width:none}
.dcats::-webkit-scrollbar{display:none}
.dcat{white-space:nowrap;font-size:12px;padding:6px 12px;border-radius:20px;cursor:pointer;
  border:1px solid var(--line);background:transparent;color:var(--mute);font-family:var(--sans)}
.dcat.on{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.dentry{padding:14px 0;border-bottom:1px solid var(--line)}
.dentry:last-child{border-bottom:0}
.dterm{font-size:16px;font-weight:700;margin:0 0 3px;letter-spacing:-.2px}
.dcatlab{font-family:var(--mono);font-size:10px;letter-spacing:1.4px;text-transform:uppercase;
  color:var(--rose);margin-bottom:6px}
.ddef{font-size:14.5px;line-height:1.62;color:var(--mute);margin:0}
.dhit{background:#FBEEF3;color:var(--ink);border-radius:3px;padding:0 2px}
.dnone{font-size:14px;color:var(--mute);padding:22px 0;text-align:center;line-height:1.6}
.pick{display:grid;gap:11px;margin-bottom:6px}
.pickb{text-align:left;background:var(--card);border:1px solid var(--line);border-radius:14px;
  padding:16px;cursor:pointer;font-family:var(--sans)}
.pickb:active{transform:scale(.99)}
.pickb .ph{font-size:16.5px;font-weight:700;margin-bottom:4px}
.pickb .pd{font-size:13.5px;color:var(--mute);line-height:1.5}
.qmeta{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:12px}
.qcount{font-family:var(--mono);font-size:12px;color:var(--mute);letter-spacing:1px}
.timer{font-family:var(--mono);font-size:19px;font-weight:700;min-width:44px;text-align:right}
.tbar{height:4px;background:var(--line);border-radius:2px;overflow:hidden;margin-bottom:14px}
.tfill{height:100%;background:var(--rose);width:100%;border-radius:2px}
.qtitle{font-size:19px;font-weight:700;letter-spacing:-.3px;margin:0 0 3px;line-height:1.25}
.qtag{font-family:var(--mono);font-size:11px;color:var(--mute);letter-spacing:1px;margin-bottom:9px}
.qtext{font-size:14.5px;line-height:1.62;color:var(--mute);margin:0 0 16px}
.ic{font-family:var(--mono);font-size:13px;background:var(--paper);border:1px solid var(--line);
  border-radius:4px;padding:1px 5px;color:var(--ink)}
.opts{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.opt{padding:12px 10px;font-size:13.5px;font-weight:600;border-radius:11px;border:1px solid var(--line);
  background:var(--card);color:var(--ink);cursor:pointer;font-family:var(--sans);line-height:1.25}
.opt:active{transform:scale(.98)}
.opt.right{background:#EDF2E4;border-color:#8FAE63;color:#3D5A18}
.opt.wrong{background:#FBEEF3;border-color:var(--rose);color:var(--rose)}
.opt.dim{opacity:.42}
.fb{border-radius:12px;padding:14px;margin-top:14px;font-size:14px;line-height:1.6}
.fb.ok{background:#EDF2E4;color:#3D5A18}
.fb.no{background:#FBEEF3;color:var(--rose)}
.fb b{display:block;margin-bottom:5px;font-size:15px}
.nextb{width:100%;margin-top:12px;padding:14px 0;font-size:15px;font-weight:700;border-radius:12px;
  border:0;background:var(--ink);color:var(--paper);cursor:pointer;font-family:var(--sans)}
.score{text-align:center;padding:14px 0 4px}
.score .big{font-size:52px;font-weight:800;letter-spacing:-2px;line-height:1}
.score .lbl{font-family:var(--mono);font-size:12px;color:var(--mute);letter-spacing:1.5px;margin-top:5px}
.brk{margin-top:18px}
.brkrow{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:13.5px}
.brkbar{flex:1;height:7px;background:var(--line);border-radius:4px;overflow:hidden}
.brkfill{height:100%;border-radius:4px;background:var(--rose)}
.brklab{width:96px;flex-shrink:0}
.brkn{width:38px;text-align:right;font-family:var(--mono);font-size:12px;color:var(--mute)}

footer{text-align:center;font-size:12px;color:var(--mute);margin-top:26px;line-height:1.6}
@media(min-width:620px){
  .wrap{max-width:640px;padding-top:34px}
  .logo{width:288px}
  .sheet{left:50%;transform:translate(-50%,100%);max-width:660px}
  .sheet.on{transform:translate(-50%,0)}
  .opts{grid-template-columns:repeat(2,1fr)}
}
@media(min-width:900px){
  .wrap{max-width:1180px;padding:34px 30px 44px}
  .logo{width:305px}
  .mast{margin-bottom:10px}
  .stage{display:grid;grid-template-columns:392px minmax(0,1fr);gap:34px;align-items:start}
  .col-wheel{position:sticky;top:26px}
  .wheelbox{margin:0 0 4px}
  svg#wheel{max-width:392px}
  .nav{margin:14px 0 0}
  .duo{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:start}
  .duo>.card{margin-bottom:0}
  .fabs{bottom:26px;right:26px}
  .sheet{max-width:860px}
  footer{margin-top:34px}
}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>

<div class="wrap">
  <header class="mast">
    <svg class="logo" viewBox="0 0 322 60" role="img" aria-label="Pattern Wheel">
      <circle cx="30" cy="30" r="22" fill="none" stroke="#E0DBCF" stroke-width="1.5"/>
      <path d="M30 8 A22 22 0 0 1 52 30" fill="none" stroke="#C4577F" stroke-width="3.5" stroke-linecap="round"/>
      <text x="30" y="31" text-anchor="middle" dominant-baseline="central" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="17" letter-spacing="-.9" fill="#1A1A1A">PW</text>
      <text x="68" y="25" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="18" letter-spacing="-.5" fill="#C4577F">PATTERN</text>
      <text x="68" y="46" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="18" letter-spacing="-.5" fill="#1A1A1A">WHEEL</text>
    </svg>
    <p class="sub">Ten patterns that cover most coding interviews. Pick one for the keywords that give it away, what it costs, and why the obvious alternative fails.</p>
  </header>

  <div class="stage">
    <div class="col-wheel">
      <div class="wheelbox">
        <svg id="wheel" viewBox="0 0 400 400" role="img" aria-label="Interactive wheel of ten algorithmic patterns">
          <g id="wedges"></g>
          <circle cx="200" cy="200" r="56" fill="#FFF" stroke="#D9D5CB"/>
          <text id="h1" x="200" y="192" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A"></text>
          <text id="h2" x="200" y="208" text-anchor="middle" font-size="12" font-weight="700" fill="#C4577F"></text>
          <text id="h3" x="200" y="226" text-anchor="middle" font-size="10" fill="#6E6A63" font-family="Courier New,monospace"></text>
        </svg>
      </div>
      <div class="hint" id="hint">tap a wedge</div>
      <div class="nav">
        <button id="prev">&larr; Previous</button>
        <button id="next">Next &rarr;</button>
      </div>
    </div>
    <div class="col-info" id="panel"></div>
  </div>

  <footer>Ten patterns &middot; tap Code for templates, Practice to test yourself</footer>
</div>

<div class="fabs">
  <button class="fab plain" id="fabDict">Dictionary</button>
  <button class="fab plain" id="fabPrac">Practice</button>
  <button class="fab code" id="fabCode">&lt;/&gt; Code</button>
</div>

<div class="scrim" id="scrim"></div>

<div class="sheet" id="codeSheet" role="dialog" aria-label="Code reference">
  <div class="grab"></div>
  <div class="shead">
    <div>
      <div class="eyebrow" id="codeEyebrow">Reference &middot; Python</div>
      <h3 id="codeTitle"></h3>
    </div>
    <button class="close" data-close aria-label="Close">&times;</button>
  </div>
  <div class="tabs" id="codeTabs"></div>
  <div class="sbody" id="codeBody"></div>
</div>

<div class="sheet" id="dictSheet" role="dialog" aria-label="Dictionary">
  <div class="grab"></div>
  <div class="shead">
    <div>
      <div class="eyebrow">Dictionary</div>
      <h3 id="dictCount"></h3>
    </div>
    <button class="close" data-close aria-label="Close">&times;</button>
  </div>
  <div class="dsearch">
    <input id="dq" type="search" placeholder="Search concepts, e.g. amortised, BFS, greedy" autocomplete="off" spellcheck="false">
    <div class="dcats" id="dcats"></div>
  </div>
  <div class="sbody" id="dictBody"></div>
</div>

<div class="sheet" id="pracSheet" role="dialog" aria-label="Practice">
  <div class="grab"></div>
  <div class="shead">
    <div>
      <div class="eyebrow">Practice</div>
      <h3 id="pracTitle">Choose a mode</h3>
    </div>
    <button class="close" data-close aria-label="Close">&times;</button>
  </div>
  <div class="sbody" id="pracBody"></div>
</div>

<script>
'''

TAIL = r'''
/* ---------------- wheel ---------------- */
const NS="http://www.w3.org/2000/svg";
const g=document.getElementById("wedges");
const N=P.length, cx=200, cy=200, rO=186, rI=56;
let cur=0;
const pt=(a,r)=>{const t=(a-90)*Math.PI/180;return [cx+r*Math.cos(t),cy+r*Math.sin(t)];};

P.forEach((it,i)=>{
  const a0=i*360/N,a1=(i+1)*360/N;
  const [x0,y0]=pt(a0,rO),[x1,y1]=pt(a1,rO),[x2,y2]=pt(a1,rI),[x3,y3]=pt(a0,rI);
  const p=document.createElementNS(NS,"path");
  p.setAttribute("d",`M${x0} ${y0}A${rO} ${rO} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${rI} ${rI} 0 0 0 ${x3} ${y3}Z`);
  p.setAttribute("fill","#FFFFFF");
  p.setAttribute("stroke","#D9D5CB");
  p.setAttribute("stroke-width","1");
  p.setAttribute("class","wedge");
  p.setAttribute("tabindex","0");
  p.setAttribute("role","button");
  p.setAttribute("aria-label",it.n);
  p.addEventListener("click",()=>sel(i));
  p.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();sel(i);}});
  g.appendChild(p);
  const mid=(a0+a1)/2, words=it.s.split(" ");
  words.forEach((w,j)=>{
    const [tx,ty]=pt(mid,126);
    const t=document.createElementNS(NS,"text");
    t.setAttribute("x",tx);
    t.setAttribute("y",ty+(j-(words.length-1)/2)*12);
    t.setAttribute("text-anchor","middle");
    t.setAttribute("dominant-baseline","central");
    t.setAttribute("class","wlab");
    t.dataset.w=i;
    t.setAttribute("fill","#6E6A63");
    t.textContent=w;
    g.appendChild(t);
  });
});
const wedges=[...document.querySelectorAll(".wedge")];

function sel(i){
  cur=i;
  const it=P[i];
  wedges.forEach((w,j)=>{
    const on = j===i;
    w.setAttribute("fill", on ? "#C4577F" : "#FFFFFF");
    w.setAttribute("stroke", on ? "#C4577F" : "#D9D5CB");
    w.style.opacity = 1;
  });
  document.querySelectorAll(".wlab").forEach(t=>{
    const on = +t.dataset.w === i;
    t.setAttribute("fill", on ? "#F2F0E9" : "#6E6A63");
    t.style.fontWeight = on ? 700 : 500;
  });
  document.getElementById("h1").textContent="Pattern";
  document.getElementById("h2").textContent=String(i+1).padStart(2,"0")+" / 10";
  document.getElementById("h3").textContent=it.time;
  document.getElementById("hint").textContent="swipe or tap another";
  document.getElementById("panel").innerHTML=`
   <div class="hero">
     <div class="heron">Pattern ${String(i+1).padStart(2,"0")}</div>
     <h2>${it.n}</h2>
     <p>${it.blurb}</p>
     <div class="kws">${it.kw.map(k=>`<span class="kw">${k}</span>`).join("")}</div>
   </div>
   <div class="duo">
     <div class="card">
       <p class="sec">Cost</p>
       <div class="cx">
         <div class="cxb"><div class="l">Time</div><div class="v">${it.time}</div></div>
         <div class="cxb"><div class="l">Space</div><div class="v">${it.space}</div></div>
       </div>
       <p class="note">${it.cxnote}</p>
     </div>
     <div class="card">
       <p class="sec">What gives it away</p>
       <ul class="tell">${it.tells.map(t=>`<li><b>${t[0]}</b> &mdash; ${t[1]}</li>`).join("")}</ul>
     </div>
   </div>
   <div class="card" style="margin-top:12px">
     <p class="sec">What you might reach for instead</p>
     ${it.traps.map(t=>`<div class="trap"><div class="n"><span class="x">&#10005;</span><span>${t[0]}</span></div><div class="w">${t[1]}</div></div>`).join("")}
   </div>
   <div class="card">
     <p class="sec">Practice</p>
     <div class="probs">${it.probs.map(x=>`<span class="prob">${x}</span>`).join("")}</div>
   </div>`;
  if(codeSheet.classList.contains("on")) renderCode(codeTab);
}
document.getElementById("prev").onclick=()=>sel((cur-1+N)%N);
document.getElementById("next").onclick=()=>sel((cur+1)%N);

let sx=0,sy=0;
document.addEventListener("touchstart",e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY;},{passive:true});
document.addEventListener("touchend",e=>{
  if(document.querySelector(".sheet.on"))return;
  const dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.6) sel(dx<0?(cur+1)%N:(cur-1+N)%N);
},{passive:true});

/* ---------------- sheets ---------------- */
const scrim=document.getElementById("scrim");
const codeSheet=document.getElementById("codeSheet");
const pracSheet=document.getElementById("pracSheet");

function openSheet(s){
  document.querySelectorAll(".sheet").forEach(x=>x.classList.remove("on"));
  s.classList.add("on"); scrim.classList.add("on");
  document.body.style.overflow="hidden";
}
function closeSheets(){
  document.querySelectorAll(".sheet").forEach(x=>x.classList.remove("on"));
  scrim.classList.remove("on");
  document.body.style.overflow="";
  stopTimer();
}
scrim.onclick=closeSheets;
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeSheets);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSheets();});

/* ---------------- code sheet ---------------- */
let codeTab="tpl";
const CODE_TABS=[["tpl","Templates"],["dsa","Core DSA"],["cx","Complexity"]];
const codeTabsEl=document.getElementById("codeTabs");
CODE_TABS.forEach(([id,label])=>{
  const b=document.createElement("button");
  b.className="tab"+(id===codeTab?" on":"");
  b.textContent=label; b.dataset.tab=id;
  b.onclick=()=>{
    codeTab=id;
    [...codeTabsEl.children].forEach(c=>c.classList.toggle("on",c.dataset.tab===id));
    renderCode(id);
  };
  codeTabsEl.appendChild(b);
});

function cxTable(){
  return `<p class="codeh">Pattern costs</p><table class="cx2">
  <tr><th>Pattern</th><th>Time</th><th>Space</th></tr>
  ${P.map(p=>`<tr><td>${p.n}</td><td class="m">${p.time}</td><td class="m">${p.space}</td></tr>`).join("")}
  </table>
  <p class="codeh">Reading the constraints</p>
  <p class="codes">Input size prices your solution before you write a line.</p>
  <table class="cx2">
  <tr><th>n up to</th><th>Budget</th><th>Means</th></tr>
  <tr><td class="m">&le; 12</td><td class="m">O(n!)</td><td>Permutations</td></tr>
  <tr><td class="m">&le; 20</td><td class="m">O(2&#8319;)</td><td>Subsets, bitmask</td></tr>
  <tr><td class="m">&le; 500</td><td class="m">O(n&sup3;)</td><td>Floyd&ndash;Warshall</td></tr>
  <tr><td class="m">&le; 5,000</td><td class="m">O(n&sup2;)</td><td>DP over pairs</td></tr>
  <tr><td class="m">&le; 10&#8310;</td><td class="m">O(n log n)</td><td>Sort, heap</td></tr>
  <tr><td class="m">&gt; 10&#8310;</td><td class="m">O(n) / O(log n)</td><td>Window, binary search</td></tr>
  </table>
  <p class="codeh">Structure costs</p>
  <table class="cx2">
  <tr><th>Operation</th><th>List</th><th>Dict/Set</th><th>Heap</th></tr>
  <tr><td>Access by index</td><td class="m">O(1)</td><td class="m">&mdash;</td><td class="m">&mdash;</td></tr>
  <tr><td>Search</td><td class="m">O(n)</td><td class="m">O(1)</td><td class="m">O(n)</td></tr>
  <tr><td>Insert</td><td class="m">O(n)</td><td class="m">O(1)</td><td class="m">O(log n)</td></tr>
  <tr><td>Delete</td><td class="m">O(n)</td><td class="m">O(1)</td><td class="m">O(log n)</td></tr>
  <tr><td>Min / max</td><td class="m">O(n)</td><td class="m">O(n)</td><td class="m">O(1)</td></tr>
  </table>`;
}

function renderCode(tab){
  const it=P[cur];
  const body=document.getElementById("codeBody");
  document.getElementById("codeTitle").textContent = tab==="cx" ? "Complexity reference" : it.n;
  document.getElementById("codeEyebrow").textContent =
    tab==="cx" ? "Reference · all patterns" : `Python · pattern ${String(cur+1).padStart(2,"0")} / 10`;
  body.scrollTop=0;
  if(tab==="cx"){ body.innerHTML=cxTable(); return; }
  const items = tab==="tpl" ? (TPL[it.id]||[]) : (DSA[it.id]||[]);
  if(!items.length){ body.innerHTML=`<p class="codes">Nothing here yet for ${it.n}.</p>`; return; }
  body.innerHTML=items.map(x=>
    `<p class="codeh">${x.h}</p><p class="codes">${x.s}</p><pre><code>${x.c}</code></pre>`).join("");
}
document.getElementById("fabCode").onclick=()=>{openSheet(codeSheet);renderCode(codeTab);};

/* ---------------- practice ---------------- */
const PBTN=document.getElementById("fabPrac");
const pracBody=document.getElementById("pracBody");
const pracTitle=document.getElementById("pracTitle");
const SECS=30, ROUND=10;

let quiz=null, tHandle=null, tLeft=0;

function stopTimer(){ if(tHandle){clearInterval(tHandle);tHandle=null;} }

function shuffle(a){
  const b=a.slice();
  for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}
  return b;
}

PBTN.onclick=()=>{ openSheet(pracSheet); menu(); };

function menu(){
  stopTimer();
  pracTitle.textContent="Choose a mode";
  pracBody.innerHTML=`
  <div class="pick">
    <button class="pickb" id="m1">
      <div class="ph">Name the pattern</div>
      <div class="pd">A real LeetCode problem appears. Pick which of the ten patterns it wants, before the clock runs out.</div>
    </button>
    <button class="pickb" id="m2">
      <div class="ph">Read the code</div>
      <div class="pd">A Python implementation appears with no name. Identify the pattern from the structure alone.</div>
    </button>
  </div>
  <p class="codes" style="margin-top:14px">${ROUND} questions &middot; ${SECS} seconds each &middot; auto-advance on timeout<br>
  Drawn from ${PROBS.length} labelled problems and ${CODEQ.length} code samples.</p>`;
  document.getElementById("m1").onclick=()=>start("prob");
  document.getElementById("m2").onclick=()=>start("code");
}

const seenT=new Set();
const PROBS=[...QBANK,...BANK].filter(q=>{
  const k=q.t.toLowerCase().trim();
  if(seenT.has(k))return false;
  seenT.add(k);return true;
});
function md(t){
  return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/`([^`]+)`/g,'<code class="ic">$1</code>');
}
function start(mode){
  const pool = mode==="prob" ? PROBS : CODEQ;
  quiz={mode,items:shuffle(pool).slice(0,ROUND),i:0,score:0,wrong:[],answered:false};
  question();
}

function optionsFor(q){
  const acc = q.a && q.a.length ? q.a : [q.p];
  const keep = shuffle(acc).slice(0,2);
  const others = shuffle(P.filter(p=>!keep.includes(p.id))).slice(0,4-keep.length).map(p=>p.id);
  return shuffle([...keep,...others]);
}

function question(){
  stopTimer();
  const q=quiz.items[quiz.i];
  quiz.answered=false;
  quiz.opts=optionsFor(q);
  pracTitle.textContent = quiz.mode==="prob" ? "Name the pattern" : "Read the code";

  const head=`
   <div class="qmeta">
     <span class="qcount">Q ${quiz.i+1} / ${quiz.items.length} &middot; score ${quiz.score}</span>
     <span class="timer" id="tnum">${SECS}</span>
   </div>
   <div class="tbar"><div class="tfill" id="tfill"></div></div>`;

  const stem = quiz.mode==="prob"
   ? `<p class="qtitle">${md(q.t)}</p>
      <p class="qtag">#${q.n} &middot; ${q.d}</p>
      <p class="qtext">${md(q.x)}</p>`
   : `<p class="qtitle">What pattern is this?</p>
      <p class="qtag">Python &middot; identify from structure</p>
      <pre><code>${q.code}</code></pre>`;

  const opts=`<div class="opts" id="opts">${quiz.opts.map(id=>{
    const p=P.find(x=>x.id===id);
    return `<button class="opt" data-id="${id}">${p.n}</button>`;
  }).join("")}</div><div id="fb"></div>`;

  pracBody.innerHTML=head+stem+opts;
  pracBody.scrollTop=0;
  document.querySelectorAll("#opts .opt").forEach(b=>b.onclick=()=>answer(b.dataset.id));
  runTimer();
}

function runTimer(){
  tLeft=SECS;
  const num=document.getElementById("tnum"), fill=document.getElementById("tfill");
  num.style.color="var(--ink)";
  tHandle=setInterval(()=>{
    tLeft--;
    if(!num.isConnected){stopTimer();return;}
    num.textContent=tLeft;
    fill.style.width=(tLeft/SECS*100)+"%";
    if(tLeft<=5) num.style.color="var(--rose)";
    if(tLeft<=0){ stopTimer(); answer(null); }
  },1000);
}

function answer(pickId){
  if(quiz.answered) return;
  quiz.answered=true;
  stopTimer();
  const q=quiz.items[quiz.i];
  const accepted = q.a && q.a.length ? q.a : [q.p];
  const ok = accepted.includes(pickId);
  if(ok) quiz.score++;
  else quiz.wrong.push({q,pick:pickId});

  document.querySelectorAll("#opts .opt").forEach(b=>{
    const id=b.dataset.id;
    if(accepted.includes(id)) b.classList.add("right");
    else if(id===pickId) b.classList.add("wrong");
    else b.classList.add("dim");
    b.onclick=null;
  });

  const truth=P.find(x=>x.id===q.p);
  const names=accepted.map(a=>P.find(x=>x.id===a).n);
  const multi=names.length>1;
  const answerTxt = multi
    ? `This one accepts ${names.join(" or ")}.`
    : `The answer is ${truth.n}.`;
  const head = pickId===null ? "Time" : (ok?"Correct":"Not quite");
  const lead = pickId===null ? answerTxt : (ok ? (multi?answerTxt+" ":"") : answerTxt);

  const expl = q.w || `${truth.blurb} Signals: ${truth.kw.slice(0,3).join(", ")}.`;
  document.getElementById("fb").innerHTML=
    `<div class="fb ${ok?"ok":"no"}"><b>${head}</b>${lead?lead+" ":""}${expl}</div>
     <button class="nextb" id="nx">${quiz.i+1<quiz.items.length?"Next question":"See results"}</button>`;
  document.getElementById("nx").onclick=()=>{
    quiz.i++;
    if(quiz.i<quiz.items.length) question(); else results();
  };
  const fbEl=document.getElementById("fb");
  if(fbEl.scrollIntoView) fbEl.scrollIntoView({behavior:"smooth",block:"nearest"});
}

function results(){
  stopTimer();
  const pct=Math.round(quiz.score/quiz.items.length*100);
  const byPat={};
  quiz.items.forEach(q=>{byPat[q.p]=byPat[q.p]||{n:0,ok:0};byPat[q.p].n++;});
  const missed={};
  quiz.wrong.forEach(w=>{missed[w.q.p]=(missed[w.q.p]||0)+1;});
  Object.keys(byPat).forEach(k=>{byPat[k].ok=byPat[k].n-(missed[k]||0);});

  const rows=Object.entries(byPat).sort((a,b)=>a[1].ok/a[1].n-b[1].ok/b[1].n).map(([id,v])=>{
    const p=P.find(x=>x.id===id);
    return `<div class="brkrow">
      <span class="brklab">${p.s}</span>
      <span class="brkbar"><span class="brkfill" style="width:${v.ok/v.n*100}%"></span></span>
      <span class="brkn">${v.ok}/${v.n}</span></div>`;
  }).join("");

  const verdict = pct===100 ? "Clean sweep."
    : pct>=80 ? "Strong. The gaps below are worth one more pass."
    : pct>=50 ? "Solid base. The weakest rows are where to spend your time."
    : "Early days. Read the traps on each wedge, then come back.";

  pracTitle.textContent="Results";
  pracBody.innerHTML=`
   <div class="score">
     <div class="big" style="color:${pct>=80?"#3D5A18":pct>=50?"var(--ink)":"var(--rose)"}">${pct}%</div>
     <div class="lbl">${quiz.score} of ${quiz.items.length} correct</div>
   </div>
   <p class="codes" style="text-align:center;margin:12px 0 0">${verdict}</p>
   <div class="brk">
     <p class="sec" style="margin-bottom:12px">By pattern</p>
     ${rows}
   </div>
   ${quiz.wrong.length?`<div class="brk"><p class="sec" style="margin-bottom:10px">Review</p>
     ${quiz.wrong.map(w=>{
       const t=P.find(x=>x.id===w.q.p);
       const title = quiz.mode==="prob" ? md(w.q.t) : "Code sample";
       const ex = w.q.w || `${t.blurb} Signals: ${t.kw.slice(0,3).join(", ")}.`;
       return `<div class="card" style="padding:13px"><div style="font-size:14.5px;font-weight:600;margin-bottom:3px">${title}</div>
       <div style="font-size:13px;color:var(--rose);font-weight:600;margin-bottom:5px">${t.n}</div>
       <div style="font-size:13.5px;line-height:1.55;color:var(--mute)">${ex}</div></div>`;
     }).join("")}</div>`:""}
   <button class="nextb" id="again">Run another round</button>
   <button class="nextb" id="back" style="background:transparent;color:var(--ink);border:1px solid var(--line);margin-top:9px">Back to modes</button>`;
  document.getElementById("again").onclick=()=>start(quiz.mode);
  document.getElementById("back").onclick=menu;
}

/* ---------------- dictionary ---------------- */
const CATS=[["all","All"],["concept","Concepts"],["structure","Structures"],
            ["complexity","Complexity"],["process","Interview"]];
let dcat="all";
const dcatsEl=document.getElementById("dcats");
CATS.forEach(([id,label])=>{
  const b=document.createElement("button");
  b.className="dcat"+(id===dcat?" on":"");
  b.textContent=label; b.dataset.c=id;
  b.onclick=()=>{
    dcat=id;
    [...dcatsEl.children].forEach(x=>x.classList.toggle("on",x.dataset.c===id));
    drawDict();
  };
  dcatsEl.appendChild(b);
});

function esc(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function mark(text,q){
  if(!q) return esc(text);
  const rx=new RegExp("("+q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","ig");
  return esc(text).replace(rx,'<span class="dhit">$1</span>');
}
const CATNAME={concept:"Concept",structure:"Data structure",complexity:"Complexity",process:"Interview"};

function drawDict(){
  const q=document.getElementById("dq").value.trim();
  const ql=q.toLowerCase();
  let list=DICT.filter(e=>dcat==="all"||e.c===dcat);
  if(ql){
    list=list.map(e=>{
      const t=e.t.toLowerCase(), k=e.k.toLowerCase(), d=e.d.toLowerCase();
      let score=0;
      if(t===ql)score=100;
      else if(t.startsWith(ql))score=80;
      else if(t.includes(ql))score=60;
      else if(k.includes(ql))score=40;
      else if(d.includes(ql))score=20;
      return {e,score};
    }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.e.t.localeCompare(b.e.t)).map(x=>x.e);
  }else{
    list=list.slice().sort((a,b)=>a.t.localeCompare(b.t));
  }
  document.getElementById("dictCount").textContent =
    q ? `${list.length} match${list.length===1?"":"es"}` : `${list.length} entries`;
  const body=document.getElementById("dictBody");
  if(!list.length){
    body.innerHTML=`<p class="dnone">Nothing matches &ldquo;${esc(q)}&rdquo;.<br>Try a shorter word, or switch category above.</p>`;
    return;
  }
  body.innerHTML=list.map(e=>`<div class="dentry">
    <div class="dcatlab">${CATNAME[e.c]}</div>
    <p class="dterm">${mark(e.t,q)}</p>
    <p class="ddef">${mark(e.d,q)}</p></div>`).join("");
  body.scrollTop=0;
}
document.getElementById("dq").addEventListener("input",drawDict);
document.getElementById("fabDict").onclick=()=>{
  openSheet(document.getElementById("dictSheet"));
  drawDict();
  if(window.matchMedia && window.matchMedia("(min-width:900px)").matches){
    setTimeout(()=>document.getElementById("dq").focus(),120);
  }
};

sel(0);
drawDict();
</script>
</body>
</html>
'''

# DSA section: reuse core structures per pattern from the old CODE, keyed by pattern
DSA = r'''
const DSA = {
hashmap:[
{h:"dict and set basics",s:"The operations you rely on, and what they cost.",c:`<span class="c"># all O(1) average</span>
d = {}
d[<span class="s">'k'</span>] = <span class="s">1</span>            <span class="c"># insert / update</span>
<span class="s">'k'</span> <span class="k">in</span> d                <span class="c"># membership</span>
d.get(<span class="s">'k'</span>, <span class="s">0</span>)          <span class="c"># default, no KeyError</span>
d.pop(<span class="s">'k'</span>, <span class="k">None</span>)       <span class="c"># safe delete</span>

<span class="k">from</span> collections <span class="k">import</span> defaultdict, Counter
buckets = defaultdict(<span class="k">list</span>)   <span class="c"># auto-creates []</span>
buckets[key].append(v)

freq = Counter(<span class="s">"mississippi"</span>)
freq.most_common(<span class="s">2</span>)          <span class="c"># [('i',4), ('s',4)]</span>`}],
twoptr:[
{h:"Fast / slow pointers",s:"Same family — used for cycle detection and midpoints.",c:`<span class="k">def</span> has_cycle(head):
    slow = fast = head
    <span class="k">while</span> fast <span class="k">and</span> fast.next:
        slow = slow.next
        fast = fast.next.next
        <span class="k">if</span> slow <span class="k">is</span> fast:
            <span class="k">return</span> <span class="k">True</span>
    <span class="k">return</span> <span class="k">False</span>

<span class="k">def</span> middle(head):
    slow = fast = head
    <span class="k">while</span> fast <span class="k">and</span> fast.next:
        slow, fast = slow.next, fast.next.next
    <span class="k">return</span> slow`}],
window:[
{h:"Window bookkeeping",s:"What to track as the window moves.",c:`<span class="k">from</span> collections <span class="k">import</span> defaultdict

count = defaultdict(<span class="k">int</span>)
count[c] += <span class="s">1</span>              <span class="c"># entering</span>
count[c] -= <span class="s">1</span>              <span class="c"># leaving</span>
<span class="k">if</span> count[c] == <span class="s">0</span>:
    <span class="k">del</span> count[c]           <span class="c"># keep len() honest</span>

<span class="c"># len(count) = distinct chars in window</span>
<span class="c"># this is what "at most k distinct" tests</span>`}],
stack:[
{h:"Python list as a stack",s:"append and pop() are both O(1) at the end.",c:`st = []
st.append(x)      <span class="c"># push, O(1)</span>
top = st[-<span class="s">1</span>]      <span class="c"># peek, no removal</span>
x = st.pop()      <span class="c"># pop, O(1)</span>
<span class="k">if</span> <span class="k">not</span> st: ...    <span class="c"># empty check</span>

<span class="c"># NEVER st.pop(0) - that's O(n).</span>
<span class="c"># use collections.deque for a queue.</span>`}],
traversal:[
{h:"deque — the BFS queue",s:"popleft is O(1). list.pop(0) is O(n) and will TLE.",c:`<span class="k">from</span> collections <span class="k">import</span> deque

q = deque([start])
q.append(x)        <span class="c"># enqueue, O(1)</span>
node = q.popleft() <span class="c"># dequeue, O(1)</span>

<span class="c"># BFS = popleft (FIFO)</span>
<span class="c"># DFS = pop     (LIFO)</span>
<span class="c"># that one call is the whole difference</span>`},
{h:"Grid neighbours",s:"The four-direction idiom, with bounds folded in.",c:`DIRS = ((<span class="s">1</span>,<span class="s">0</span>), (-<span class="s">1</span>,<span class="s">0</span>), (<span class="s">0</span>,<span class="s">1</span>), (<span class="s">0</span>,-<span class="s">1</span>))

<span class="k">def</span> neighbours(r, c, R, C):
    <span class="k">for</span> dr, dc <span class="k">in</span> DIRS:
        nr, nc = r + dr, c + dc
        <span class="k">if</span> <span class="s">0</span> &lt;= nr &lt; R <span class="k">and</span> <span class="s">0</span> &lt;= nc &lt; C:
            <span class="k">yield</span> nr, nc`}],
heap:[
{h:"heapq essentials",s:"Min-heap only. Negate for max.",c:`<span class="k">import</span> heapq

h = []
heapq.heappush(h, v)      <span class="c"># O(log n)</span>
smallest = heapq.heappop(h)
peek = h[<span class="s">0</span>]              <span class="c"># O(1), no removal</span>

heapq.heapify(lst)        <span class="c"># O(n), in place</span>
heapq.nlargest(k, lst)    <span class="c"># O(n log k)</span>
heapq.nsmallest(k, lst)

<span class="c"># tuples sort by first element:</span>
heapq.heappush(h, (priority, item))`}],
dp:[
{h:"Memoisation in one line",s:"The fastest way to turn exponential recursion into DP.",c:`<span class="k">from</span> functools <span class="k">import</span> cache

<span class="s">@cache</span>
<span class="k">def</span> fib(n):
    <span class="k">if</span> n &lt; <span class="s">2</span>: <span class="k">return</span> n
    <span class="k">return</span> fib(n-<span class="s">1</span>) + fib(n-<span class="s">2</span>)

<span class="c"># without @cache: O(2^n)</span>
<span class="c"># with it:        O(n)</span>
<span class="c"># args must be hashable - use tuples, not lists</span>`}],
backtrack:[
{h:"The skeleton",s:"Every backtracking solution is this shape.",c:`<span class="k">def</span> solve(inputs):
    res = []
    path = []

    <span class="k">def</span> dfs(state):
        <span class="k">if</span> is_complete(state):
            res.append(path[:])     <span class="c"># COPY</span>
            <span class="k">return</span>
        <span class="k">for</span> choice <span class="k">in</span> options(state):
            <span class="k">if</span> <span class="k">not</span> valid(choice): <span class="k">continue</span>   <span class="c"># prune</span>
            path.append(choice)               <span class="c"># choose</span>
            dfs(advance(state, choice))       <span class="c"># recurse</span>
            path.pop()                        <span class="c"># un-choose</span>

    dfs(initial)
    <span class="k">return</span> res`}],
binsearch:[
{h:"bisect — the built-in",s:"When you just need an insertion point.",c:`<span class="k">from</span> bisect <span class="k">import</span> bisect_left, bisect_right, insort

a = [<span class="s">1</span>, <span class="s">3</span>, <span class="s">3</span>, <span class="s">5</span>, <span class="s">7</span>]
bisect_left(a, <span class="s">3</span>)    <span class="c"># 1 - first index of 3</span>
bisect_right(a, <span class="s">3</span>)   <span class="c"># 3 - one past the last 3</span>
insort(a, <span class="s">4</span>)         <span class="c"># insert, keeping order</span>

<span class="c"># count of x = bisect_right - bisect_left</span>`},
{h:"Off-by-one guide",s:"Which form to use, and why the loop condition differs.",c:`<span class="c"># exact match -> lo &lt;= hi, return mid</span>
<span class="k">while</span> lo &lt;= hi:
    mid = (lo + hi) // <span class="s">2</span>
    ...

<span class="c"># boundary (first True) -> lo &lt; hi, return lo</span>
<span class="k">while</span> lo &lt; hi:
    mid = (lo + hi) // <span class="s">2</span>
    <span class="k">if</span> ok(mid): hi = mid        <span class="c"># keep mid!</span>
    <span class="k">else</span>:       lo = mid + <span class="s">1</span>

<span class="c"># hi = mid (not mid-1) or you skip the answer</span>`}],
unionfind:[
{h:"Why path compression matters",s:"Without it, find() degrades to O(n) on a chain.",c:`<span class="c"># no compression: 0 &lt;- 1 &lt;- 2 &lt;- ... &lt;- n</span>
<span class="c"># find(n) walks the whole chain, O(n)</span>

<span class="k">def</span> find(self, x):
    <span class="k">while</span> self.p[x] != x:
        self.p[x] = self.p[self.p[x]]   <span class="c"># halve the path</span>
        x = self.p[x]
    <span class="k">return</span> x

<span class="c"># with compression + union by rank:</span>
<span class="c"># amortised O(alpha(n)), effectively constant</span>`}]
};
'''

out = HEAD + pdata + "\n" + tpl + "\n" + DSA + "\n" + qbank + "\n" + bank + "\n" + dic + "\n" + TAIL
out_path = os.path.join(ROOT, 'index.html')
open(out_path, 'w', encoding='utf-8').write(out)
print(f"built {out_path} — {len(out):,} bytes")
