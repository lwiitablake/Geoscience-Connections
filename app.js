'use strict';
(() => {
  const data = window.GEOSCIENCE_DATA;
  const $ = id => document.getElementById(id);
  if (!data) { $('result-count').textContent = 'The data could not be loaded. Keep data.js beside index.html and reload.'; return; }
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = url => {try {const u = new URL(url);return ['https:','http:'].includes(u.protocol) ? u.href : '#';} catch {return '#';}};
  const normalize = value => String(value).toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  let shown = [...data.connections];
  let activeReference = '';
  let referenceOrigin = null;
  let bibliographyVisible = true;
  const index = new Map(data.connections.map(c => [c.id, normalize(Object.values(c).flat().join(' '))]));
  $('dataset-count').textContent = `${data.connections.length} connections`;
  $('source-count').textContent = `${data.references.length} annotated references`;
  ['family','pathway','evidence'].forEach(key => {
    [...new Set(data.connections.map(c=>c[key]))].sort().forEach(value=>{
      const option = document.createElement('option');option.value=value;option.textContent=value;$(key).append(option);
    });
  });
  $('guide-content').innerHTML = '<dl>'+data.guide.map(g=>`<div class="guide-entry"><dt>${escape(g.topic)}</dt><dd>${escape(g.explanation)}</dd></div>`).join('')+'</dl>';
  function renderReferences() {
    const relevant = new Set(shown.flatMap(c=>c.references));
    const words = normalize($('reference-search').value).trim().split(/\s+/).filter(Boolean);
    const refs = data.references.filter(r=>(!$('relevant-only').checked||relevant.has(r.id))&&words.every(w=>normalize(Object.values(r).join(' ')).includes(w)));
    $('bib-count').textContent = `${refs.length} of ${data.references.length} references`;
    $('references').innerHTML = refs.length ? refs.map(r=>`<article class="reference-card${r.id===activeReference?' active':''}" id="ref-${escape(r.id)}" tabindex="-1" aria-labelledby="title-${escape(r.id)}"><div class="reference-top"><span class="reference-id">${escape(r.id)}</span><span class="source-type">${escape(r.type)}</span></div><h3 class="citation" id="title-${escape(r.id)}">${escape(r.citation)}</h3><a class="source-link" href="${escape(safeUrl(r.url))}" target="_blank" rel="noopener noreferrer">Read source ${escape(r.id)} <span class="sr-only">(opens in a new tab)</span></a><h4>What it contributes</h4><p>${escape(r.annotation)}</p><h4>Scope and limitations</h4><p>${escape(r.limitations)}</p><h4>Access and review</h4><p class="access">${escape(r.access)}</p>${r.id===activeReference?'<button type="button" class="secondary return-connection">Return to connection</button>':''}</article>`).join('') : '<p class="bib-empty">No references match. Clear the reference search or turn off “Only sources for visible connections.”</p>';
  }
  function renderConnections() {
    const words=normalize($('search').value).trim().split(/\s+/).filter(Boolean);
    shown=data.connections.filter(c=>['family','pathway','evidence'].every(k=>!$(k).value||c[k]===$(k).value)&&words.every(w=>index.get(c.id).includes(w)));
    if($('sort').value==='major')shown.sort((a,b)=>a.major.localeCompare(b.major)||a.id.localeCompare(b.id));
    $('result-count').textContent=`${shown.length} of ${data.connections.length} connections · ${new Set(shown.map(c=>c.family)).size} field families`;
    $('connections-body').innerHTML=shown.map(c=>`<tr role="row"><td role="cell"><span class="mobile-label" aria-hidden="true">Major &amp; discipline</span><p class="major">${escape(c.major)}</p><p class="discipline">${escape(c.discipline)}</p><p class="row-meta">${escape(c.family)} · ${escape(c.id)}</p></td><td role="cell"><span class="mobile-label" aria-hidden="true">Task &amp; Earth science</span><p class="task">${escape(c.task)}</p><p class="anchor">${escape(c.anchor)}</p></td><td role="cell"><span class="mobile-label" aria-hidden="true">The connection</span><p>${escape(c.connection)}</p><p class="pathway">${escape(c.pathway)}</p></td><td role="cell"><span class="mobile-label" aria-hidden="true">Evidence &amp; references</span><span class="evidence${c.evidence==='Illustrative application'?' proposed':''}">${escape(c.evidence)}</span><p><a class="map-link" href="map.html?connection=${encodeURIComponent(c.id)}#map-${escape(c.id)}" aria-label="Map connection ${escape(c.id)} for ${escape(c.major)}">View connection map</a></p><div class="reference-buttons">${c.references.map(id=>`<button type="button" class="ref-button" data-ref="${escape(id)}" aria-controls="bibliography" aria-label="View reference ${escape(id)} for ${escape(c.major)}">${escape(id)}</button>`).join('')}</div></td></tr>`).join('');
    $('empty').hidden=shown.length>0;
    $('table-scroll').scrollTop=0;
    renderReferences();
  }
  function setBibliography(visible) {
    bibliographyVisible=visible;
    $('bibliography').hidden=!visible;
    $('workspace').classList.toggle('bib-hidden',!visible);
    $('toggle-bib').setAttribute('aria-expanded',String(visible));
    $('toggle-bib').textContent=visible?'Hide bibliography':'Show bibliography';
  }
  function reset(){ $('filters').reset();$('sort').value='original';renderConnections(); }
  $('filters').addEventListener('submit',e=>e.preventDefault());
  $('search').addEventListener('input',renderConnections);
  ['family','pathway','evidence','sort'].forEach(id=>$(id).addEventListener('change',renderConnections));
  ['reset','empty-reset'].forEach(id=>$(id).addEventListener('click',reset));
  $('jump-bib').addEventListener('click',e=>{e.preventDefault();setBibliography(true);$('bibliography-title').focus();});
  $('toggle-bib').addEventListener('click',()=>setBibliography(!bibliographyVisible));
  $('reference-search').addEventListener('input',renderReferences);
  $('relevant-only').addEventListener('change',renderReferences);
  $('connections-body').addEventListener('click',e=>{
    const button=e.target.closest('button[data-ref]');if(!button)return;
    referenceOrigin=button;
    activeReference=button.dataset.ref;
    $('reference-search').value='';
    setBibliography(true);renderReferences();
    const target=$(`ref-${activeReference}`);
    if(target){
      target.focus({preventScroll:true});
      const panel=$('references');
      panel.scrollTop+=target.getBoundingClientRect().top-panel.getBoundingClientRect().top;
      if(matchMedia('(max-width: 800px)').matches)$('bibliography').scrollIntoView({block:'nearest'});
    }
  });
  $('references').addEventListener('click',e=>{
    if(e.target.closest('.return-connection')){
      const origin=referenceOrigin?.isConnected?referenceOrigin:$('search');
      origin.focus();origin.scrollIntoView({block:'nearest'});
    }
  });
  document.querySelector('a[href="#about"]').addEventListener('click',()=>{$('about').open=true;});
  renderConnections();
})();

