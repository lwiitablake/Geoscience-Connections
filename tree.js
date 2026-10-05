'use strict';
(() => {
 const $=id=>document.getElementById(id),d=window.GEOSCIENCE_DATA;if(!d)return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const safe=s=>{try{const u=new URL(s);return u.protocol==='https:'?u.href:'#';}catch{return '#';}};
 const families=[...new Set(d.connections.map(c=>c.family))],nodes=[],edges=[];
 const add=(id,label,type,x,y,record)=>{const n={id,label,type,x,y,record,w:type==='root'?520:type==='family'?420:260,h:type==='root'?160:type==='family'?140:110};nodes.push(n);return n;};
 add('root','Geosciences','root',0,0);
 const palette=['#216b76','#486fa6','#7361a0','#397753','#9a5e36','#9b5073'];
 const radius=Math.max(1250, families.length*110);
 for(const [i,f] of families.entries()){
  const cs=d.connections.filter(c=>c.family===f),a=i/families.length*Math.PI*2-Math.PI/2;
  const r=radius+(i%3)*150,fx=Math.cos(a)*r,fy=Math.sin(a)*r,fid='family-'+i,color=palette[i%palette.length];
  const family=add(fid,f,'family',fx,fy,f);family.color=color;edges.push(['root',fid,'']);
  cs.forEach((c,j)=>{const theta=j*2.3999632297+a,reach=350+Math.sqrt(j)*190;const n=add('tree-'+c.id,c.id+' · '+c.major,'connection',fx+Math.cos(theta)*reach,fy+Math.sin(theta)*reach,c);n.color=color;edges.push([fid,n.id,c.evidence==='Illustrative application'?'illustrative':'']);});
 }
 d.references.forEach((r,i)=>{const citing=nodes.filter(n=>n.type==='connection'&&n.record.references.includes(r.id));let x=citing.reduce((s,n)=>s+n.x,0)/Math.max(1,citing.length),y=citing.reduce((s,n)=>s+n.y,0)/Math.max(1,citing.length);const a=Math.atan2(y,x)+.23;const reach=Math.max(700,Math.hypot(x,y))+350+(i%3)*120;add('resource-'+r.id,r.id+' · '+r.type,'resource',Math.cos(a)*reach,Math.sin(a)*reach,r);});
 for(const c of d.connections)for(const r of c.references)edges.push(['tree-'+c.id,'resource-'+r,'citation-edge']);
 // Deterministic collision relaxation; center and family anchors remain stable.
 for(let pass=0;pass<160;pass++)for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
  const a=nodes[i],b=nodes[j],dx=b.x-a.x,dy=b.y-a.y,ox=(a.w+b.w)/2+45-Math.abs(dx),oy=(a.h+b.h)/2+45-Math.abs(dy);if(ox<=0||oy<=0)continue;
  const af=a.type==='root'||a.type==='family',bf=b.type==='root'||b.type==='family';if(af&&bf)continue;
  const amount=(ox<oy?ox:oy)+1,sign=(ox<oy?dx:dy)>=0?1:-1,key=ox<oy?'x':'y';
  if(!af)a[key]-=sign*amount*(bf?1:.5);if(!bf)b[key]+=sign*amount*(af?1:.5);
 }
 // Final packing pass guarantees clear rectangular hit areas.
 const placed=nodes.filter(n=>n.type==='root'||n.type==='family');
 for(const n of nodes.filter(n=>n.type!=='root'&&n.type!=='family')){
  let hit;while((hit=placed.find(p=>Math.abs(n.x-p.x)<(n.w+p.w)/2+28&&Math.abs(n.y-p.y)<(n.h+p.h)/2+28)))n.y=hit.y+(n.h+hit.h)/2+30;
  placed.push(n);
 }
 const byId=new Map(nodes.map(n=>[n.id,n]));
 const pad=160,bounds={left:Math.min(...nodes.map(n=>n.x-n.w/2))-pad,right:Math.max(...nodes.map(n=>n.x+n.w/2))+pad,top:Math.min(...nodes.map(n=>n.y-n.h/2))-pad,bottom:Math.max(...nodes.map(n=>n.y+n.h/2))+pad};
 const svg=$('web'),vp=$('viewport');let cx=0,cy=0,scale=1,selected='root';
 function size(){return {w:vp.clientWidth,h:vp.clientHeight};}
 function minScale(){const {w,h}=size();return Math.min(w/(bounds.right-bounds.left),h/(bounds.bottom-bounds.top))*.96;}
 function draw(){const {w,h}=size(),hw=w/scale/2,hh=h/scale/2;cx=hw*2>=bounds.right-bounds.left?(bounds.left+bounds.right)/2:Math.max(bounds.left+hw,Math.min(bounds.right-hw,cx));cy=hh*2>=bounds.bottom-bounds.top?(bounds.top+bounds.bottom)/2:Math.max(bounds.top+hh,Math.min(bounds.bottom-hh,cy));svg.setAttribute('viewBox',`${cx-hw} ${cy-hh} ${hw*2} ${hh*2}`);$('web-status').textContent=`${d.connections.length} connections · ${d.references.length} shared resources · Zoom ${Math.round(scale*100)}%` ;}
 function fit(){scale=minScale();cx=(bounds.left+bounds.right)/2;cy=(bounds.top+bounds.bottom)/2;draw();}
 function zoom(f){scale=Math.max(minScale(),Math.min(2.5,scale*f));draw();}
 function lines(label,max){const out=[''];for(const word of label.split(' ')){if((out[out.length-1]+' '+word).length>max)out.push(word);else out[out.length-1]+=(out[out.length-1]?' ':'')+word;}return out;}
 $('edges').innerHTML=edges.map(([a,b,k])=>{const n=byId.get(a),m=byId.get(b);return `<path class="edge ${k}" style="--family-color:${m.color||n.color||'#216b76'}" data-from="${a}" data-to="${b}" d="M ${n.x} ${n.y} Q ${(n.x+m.x)/2-(m.y-n.y)*.08} ${(n.y+m.y)/2+(m.x-n.x)*.08} ${m.x} ${m.y}"/>`;}).join('');
 $('nodes').innerHTML=nodes.map(n=>{const words=lines(n.label,n.type==='family'?23:22);return `<g class="node ${n.type}" style="--family-color:${n.color||'#216b76'}" id="${n.id}" transform="translate(${n.x} ${n.y})" role="button" tabindex="0" aria-label="${esc(n.label)}"><title>${esc(n.label)}</title><rect x="${-n.w/2}" y="${-n.h/2}" width="${n.w}" height="${n.h}" rx="22"/><text>${words.map((s,i)=>`<tspan x="0" y="${(i-(words.length-1)/2)*24+7}">${esc(s)}</tspan>`).join('')}</text></g>`;}).join('');
 $('web-target').innerHTML=nodes.map(n=>`<option value="${n.id}">${esc(n.label)}</option>`).join('');
 function link(id,label){return `<a href="#${id}">${esc(label)}</a>`;}
 function select(id,focus=false){const n=byId.get(id);if(!n)return;selected=id;cx=n.x;cy=n.y;scale=n.type==='root'?minScale():n.type==='family'?.28:.8;draw();$('web-target').value=id;
  const neighbors=new Set([id,...edges.filter(e=>e[0]===id||e[1]===id).flatMap(e=>e.slice(0,2))]);
  document.querySelectorAll('.node').forEach(e=>{e.classList.toggle('selected',e.id===id);e.classList.toggle('neighbor',e.id!==id&&neighbors.has(e.id));});
  document.querySelectorAll('.edge').forEach(e=>{const hit=e.dataset.from===id||e.dataset.to===id;e.classList.toggle('highlight',hit);e.classList.toggle('muted',!hit);});
  const c=n.record;let body='';
  if(n.type==='connection')body=`<p>${esc(c.evidence)}</p><h2>${esc(c.major)}</h2><p>${esc(c.discipline)}</p><h3>Task</h3><p>${esc(c.task)}</p><h3>${esc(c.anchor)}</h3><p>${esc(c.connection)}</p><p>Pathway: ${esc(c.pathway)}</p><h3>Cited resources</h3>${c.references.map(r=>link('resource-'+r,r)).join(' · ')}<p><a href="map.html?connection=${c.id}#map-${c.id}">Read detailed map and annotations</a></p>`;
  else if(n.type==='resource')body=`<h2>${esc(c.id)}</h2><p>${esc(c.citation)}</p><h3>What it contributes</h3><p>${esc(c.annotation)}</p><h3>Scope and limitations</h3><p>${esc(c.limitations)}</p><p>${esc(c.access)}</p><a href="${esc(safe(c.url))}" target="_blank" rel="noopener noreferrer">Read source (opens in a new tab)</a><h3>Connected disciplines</h3>${d.connections.filter(x=>x.references.includes(c.id)).map(x=>link('tree-'+x.id,x.id+' · '+x.major)).join('<br>')}`;
  else if(n.type==='family')body=`<h2>${esc(c)}</h2>${d.connections.filter(x=>x.family===c).map(x=>link('tree-'+x.id,x.id+' · '+x.major)).join('<br>')}`;
  else body='<h2>Geosciences</h2><p>All field families radiate from this center. Select a family to explore its disciplines and tasks.</p>'+families.map((f,i)=>link('family-'+i,f)).join('<br>');
  $('node-detail').innerHTML=body+`<p>${link(id,'Link to this spot')}</p>`;if(focus)$('node-detail').focus({preventScroll:true});
 }
 function go(id){if(location.hash==='#'+id)select(id,true);else location.hash=id;}
 window.addEventListener('hashchange',()=>select(location.hash.slice(1),true));
 $('web-controls').addEventListener('submit',e=>{e.preventDefault();go($('web-target').value);});
 $('zoom-in').onclick=()=>zoom(1.5);$('zoom-out').onclick=()=>zoom(1/1.5);$('fit').onclick=()=>{document.querySelectorAll('.edge').forEach(e=>e.classList.remove('muted','highlight'));document.querySelectorAll('.node').forEach(e=>e.classList.remove('selected','neighbor'));fit();};$('center').onclick=()=>go('root');
 vp.addEventListener('focusin',e=>{const n=byId.get(e.target.id);if(n){cx=n.x;cy=n.y;scale=n.type==='root'?.25:.8;draw();}});
 let drag=null,suppress=false;
 vp.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,cx,cy,moved:false,id:e.pointerId};vp.setPointerCapture(e.pointerId);});
 vp.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>5)drag.moved=true;cx=drag.cx-dx/scale;cy=drag.cy-dy/scale;draw();});
 vp.addEventListener('pointerup',e=>{if(!drag)return;suppress=drag.moved;drag=null;vp.releasePointerCapture(e.pointerId);if(!suppress){const hit=document.elementFromPoint(e.clientX,e.clientY)?.closest('.node');if(hit)go(hit.id);}});
 vp.addEventListener('pointercancel',()=>{drag=null;});
 vp.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.12:1/1.12);},{passive:false});
 vp.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)&&e.target.closest('.node')){e.preventDefault();go(e.target.closest('.node').id);return;}const moves={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(moves[e.key]){e.preventDefault();cx+=moves[e.key][0]*120/scale;cy+=moves[e.key][1]*120/scale;draw();}else if(e.key==='+'||e.key==='='){e.preventDefault();zoom(1.5);}else if(e.key==='-'){e.preventDefault();zoom(1/1.5);}});
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a&&byId.has(a.hash.slice(1))&&a.hash===location.hash){e.preventDefault();select(a.hash.slice(1),true);}});
 new ResizeObserver(()=>{scale=Math.max(scale,minScale());draw();}).observe(vp);
 fit();if(byId.has(location.hash.slice(1)))select(location.hash.slice(1));
})();
