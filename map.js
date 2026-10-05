'use strict';
(() => {
  const data=window.GEOSCIENCE_DATA, $=id=>document.getElementById(id);
  if(!data){$('map-count').textContent='The collection could not load. Keep data.js beside map.html.';return;}
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const url=value=>{try{const u=new URL(value);return u.protocol==='https:'?u.href:'#';}catch{return '#';}};
  const refs=new Map(data.references.map(r=>[r.id,r]));
  const families=[...new Set(data.connections.map(c=>c.family))];
  families.forEach(f=>{const o=document.createElement('option');o.value=f;o.textContent=f;$('map-family').append(o);});
  $('family-map').innerHTML=families.map(f=>`<a href="map.html?family=${encodeURIComponent(f)}#map-list">${esc(f)}<span>${data.connections.filter(c=>c.family===f).length} connections</span></a>`).join('');
  const params=new URLSearchParams(location.search);
  if(families.includes(params.get('family')))$('map-family').value=params.get('family');
  let selected=params.get('connection');
  let shown=[];
  function mermaid(records){
    const label=s=>String(s).replace(/&/g,'#38;').replace(/"/g,'#quot;').replace(/[<>]/g,c=>c==='<'?'#60;':'#62;').replace(/[\r\n]+/g,' ');
    const lines=['flowchart LR','  accTitle: Geoscience connections','  accDescr: Contextual links between fields, tasks, and Earth science. Dashed connections are illustrative applications, not documented examples.'];
    for(const c of records){
      const n=c.id, edge=c.evidence==='Documented connection'?'-->':'-.->';
      lines.push(`  ${n}F["${label(c.family+' / '+c.major+' / '+c.discipline)}"]`, `  ${n}T["${label(c.id+': '+c.task)}"]`, `  ${n}E["${label(c.anchor)}"]`, `  ${n}C["${label(c.evidence+' — '+c.connection+' — Pathway: '+c.pathway)}"]`, `  ${n}F -->|task in this field| ${n}T`, `  ${n}T ${edge} ${n}E`, `  ${n}E -->|relationship details| ${n}C`);
      for(const id of c.references){const r=refs.get(id);if(r){lines.push(`  ${id}["${label(id+': '+r.citation)}"]`,`  ${n}C -.->|cited context; read annotation| ${id}`);}}
    }
    for(const id of new Set(records.flatMap(c=>c.references))){const r=refs.get(id);if(r)lines.push(`  click ${id} href "${label(url(r.url))}" "Read source ${id}" _blank`);}
    return lines.join('\n');
  }
  function source(id,c){const r=refs.get(id);if(!r)return `<p>Source ${esc(id)} is missing.</p>`;return `<details class="map-source" id="${esc(c.id)}-${esc(id)}"><summary>${esc(id)} · ${esc(r.citation)}</summary><p><a href="tree.html#resource-${esc(id)}">Find ${esc(id)} in the full tree</a></p><p><strong>Source type:</strong> ${esc(r.type)}</p><p><strong>What it contributes:</strong> ${esc(r.annotation)}</p><p><strong>Limitations:</strong> ${esc(r.limitations)}</p><p><strong>Access and review:</strong> ${esc(r.access)}</p><p><a href="${esc(url(r.url))}" target="_blank" rel="noopener noreferrer">Read source ${esc(id)} (opens in a new tab)</a></p></details>`;}
  function render(){
    const words=norm($('map-search').value).trim().split(/\s+/).filter(Boolean);
    shown=data.connections.filter(c=>(!selected||c.id===selected)&&(!$('map-family').value||c.family===$('map-family').value)&&(!$('map-evidence').value||c.evidence===$('map-evidence').value)&&words.every(w=>norm(Object.values(c).flat().join(' ')).includes(w)));
    $('map-count').textContent=`${shown.length} of ${data.connections.length} connections mapped${selected?' · single-connection view; choose Show all to explore the collection':''}`;
    $('map-list').innerHTML=shown.length?shown.map(c=>`<article class="map-card ${c.evidence==='Illustrative application'?'illustrative':''}" id="map-${esc(c.id)}"><p class="eyebrow">${esc(c.family)} · ${esc(c.id)}</p><h2>${esc(c.major)}: ${esc(c.discipline)}</h2><span class="evidence ${c.evidence==='Illustrative application'?'proposed':''}">${esc(c.evidence)}</span><ol class="flow" aria-label="Field to task to Earth science"><li><span class="flow-label">Field and discipline</span><strong>${esc(c.major)}</strong><p>${esc(c.discipline)}</p></li><li><span class="flow-label">Concrete task</span><strong>${esc(c.task)}</strong></li><li><span class="flow-label">Earth-science connection</span><strong>${esc(c.anchor)}</strong></li></ol><div class="map-relationship"><p>${esc(c.connection)}</p><p><strong>Pathway:</strong> ${esc(c.pathway)}</p></div><h3>Follow the evidence</h3><p>Open a source to read its contribution and limitations. A source may support the underlying concept without documenting the exact task.</p>${c.references.map(id=>source(id,c)).join('')}<p><a href="tree.html#tree-${esc(c.id)}">Find ${esc(c.id)} in the full tree</a></p><a class="map-permalink" href="map.html?connection=${encodeURIComponent(c.id)}#map-${esc(c.id)}">Link to this connection map</a></article>`).join(''):'<p>No connections match. Choose Show all or broaden your search.</p>';
    $('mermaid-source').value=mermaid(shown);
  }
  $('map-filters').addEventListener('submit',e=>e.preventDefault());
  $('map-search').addEventListener('input',()=>{selected=null;render();});
  ['map-family','map-evidence'].forEach(id=>$(id).addEventListener('change',()=>{selected=null;render();}));
  $('map-reset').addEventListener('click',()=>{selected=null;$('map-filters').reset();render();});
  $('download-mermaid').addEventListener('click',()=>{const u=URL.createObjectURL(new Blob([$('mermaid-source').value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='geoscience-connections.mmd';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);});
  render();
  if(location.hash){const target=document.getElementById(location.hash.slice(1));if(target)target.scrollIntoView();}
})();
