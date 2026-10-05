'use strict';
(() => {
  const $=id=>document.getElementById(id), data=window.GEOSCIENCE_DATA;
  if(!data){$('tree-status').textContent='The data could not load. Keep data.js beside tree.html.';return;}
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safe=s=>{try{const u=new URL(s);return u.protocol==='https:'?u.href:'#';}catch{return '#';}};
  const families=[...new Set(data.connections.map(c=>c.family))];
  const familyId=f=>'family-'+families.indexOf(f);
  const refs=new Map(data.references.map(r=>[r.id,r]));
  $('tree-total').textContent=`${data.connections.length} connections · ${families.length} field families · ${data.references.length} resources`;
  $('family-jumps').innerHTML=families.map(f=>`<a href="#${familyId(f)}">${esc(f)}</a>`).join('');
  $('tree-target').innerHTML='<optgroup label="Connections">'+data.connections.map(c=>`<option value="tree-${esc(c.id)}">${esc(c.id)} · ${esc(c.major)} · ${esc(c.task)}</option>`).join('')+'</optgroup><optgroup label="Resources">'+data.references.map(r=>`<option value="resource-${esc(r.id)}">${esc(r.id)} · ${esc(r.citation)}</option>`).join('')+'</optgroup>';
  $('tree-families').innerHTML=families.map(f=>`<li><details class="family-branch" id="${familyId(f)}" open><summary>${esc(f)} · ${data.connections.filter(c=>c.family===f).length} connections</summary><ul class="twigs">${data.connections.filter(c=>c.family===f).map(c=>`<li><article class="branch-card" id="tree-${esc(c.id)}" tabindex="-1"><p>${esc(c.id)} · ${esc(c.evidence)}</p><h3>${esc(c.major)} · ${esc(c.discipline)}</h3><div class="branch-route"><div class="branch-node"><small>CONCRETE TASK</small>${esc(c.task)}</div><span class="branch-arrow" aria-hidden="true">→</span><div class="branch-node ${c.evidence==='Illustrative application'?'illustrative':''}"><small>GEOSCIENCE TOPICS</small><strong>${esc(c.anchor)}</strong><p>${esc(c.connection)}</p><p>Pathway: ${esc(c.pathway)}</p></div><span class="branch-arrow" aria-hidden="true">→</span><div class="branch-node"><small>CITED RESOURCES</small><ul>${c.references.map(id=>`<li><a href="#resource-${esc(id)}">${esc(id)} · ${esc(refs.get(id)?.type||'Source')}</a></li>`).join('')}</ul><p>Read the annotation for scope and limitations.</p></div></div><p><a href="map.html?connection=${encodeURIComponent(c.id)}#map-${esc(c.id)}">Detailed map for ${esc(c.id)}</a> · <a href="#tree-${esc(c.id)}">Link to this branch</a></p></article></li>`).join('')}</ul></details></li>`).join('');
  $('tree-resources').innerHTML=data.references.map(r=>`<details class="tree-resource" id="resource-${esc(r.id)}"><summary>${esc(r.id)} · ${esc(r.citation)}</summary><p><strong>Source type:</strong> ${esc(r.type)}</p><p><strong>What it contributes:</strong> ${esc(r.annotation)}</p><p><strong>Scope and limitations:</strong> ${esc(r.limitations)}</p><p><strong>Access and review:</strong> ${esc(r.access)}</p><p><a href="${esc(safe(r.url))}" target="_blank" rel="noopener noreferrer">Read source ${esc(r.id)} (opens in a new tab)</a></p><h3>Branches citing ${esc(r.id)}</h3><div class="branch-links">${data.connections.filter(c=>c.references.includes(r.id)).map(c=>`<a href="#tree-${esc(c.id)}">${esc(c.id)} · ${esc(c.major)}: ${esc(c.task)}</a>`).join('')}</div><p><a href="#resource-${esc(r.id)}">Link to this resource in the tree</a></p></details>`).join('');
  function reveal(){
    const target=$(location.hash.slice(1));if(!target)return;
    for(let parent=target;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')parent.open=true;
    const focus=target.tagName==='DETAILS'?target.querySelector('summary'):target;
    focus.focus({preventScroll:true});target.scrollIntoView({block:'start'});
  }
  window.addEventListener('hashchange',reveal);
  window.addEventListener('load',reveal,{once:true});
  document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a&&a.getAttribute('href')===location.hash){e.preventDefault();reveal();}});
  $('tree-jump').addEventListener('submit',e=>{e.preventDefault();const hash='#'+$('tree-target').value;if(location.hash===hash)reveal();else location.hash=hash;});
  function status(){const count=document.querySelectorAll('.family-branch[open]').length;$('tree-status').textContent=`${count} of ${families.length} field families expanded. All ${data.connections.length} connections are available; use a family heading or jump link to explore.`;}
  document.querySelectorAll('.family-branch').forEach(d=>d.addEventListener('toggle',status));
  function expand(open){document.querySelectorAll('.family-branch').forEach(d=>d.open=open);status();}
  $('expand-tree').addEventListener('click',()=>expand(true));$('collapse-tree').addEventListener('click',()=>expand(false));
  $('tree-status').textContent='All connections are shown. Collapse families for an overview, or jump directly to any connection or resource.';
  reveal();
})();
