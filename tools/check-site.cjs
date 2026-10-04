const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=require('path').resolve(__dirname,'..')+require('path').sep;
const html=fs.readFileSync(root+'index.html','utf8');
const elements=new Map();let focus='';
function el(id){if(elements.has(id))return elements.get(id);const e={id,value:'',checked:false,hidden:false,innerHTML:'',textContent:'',children:[],events:{},attributes:{},scrollTop:0,isConnected:true,open:false,
 append(v){this.children.push(v)},addEventListener(k,v){this.events[k]=v},setAttribute(k,v){this.attributes[k]=v},classList:{toggle(){}},focus(){focus=id},scrollIntoView(){},getBoundingClientRect(){return {top:0}},reset(){for(const k of ['search','family','pathway','evidence'])el(k).value=''}};elements.set(id,e);return e;}
for(const m of html.matchAll(/id="([^"]+)"/g))el(m[1]);
const ctx={window:{},document:{getElementById:el,createElement:()=>({}),querySelector:()=>el('about-link')},URL,matchMedia:()=>({matches:false})};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(root+'data.js','utf8'),ctx);const d=ctx.window.GEOSCIENCE_DATA;
assert.equal(d.connections.length,120);assert.equal(d.references.length,35);assert.equal(d.guide.length,24);
for(const key of ['connections','references'])assert.equal(new Set(d[key].map(x=>x.id)).size,d[key].length);
for(const c of d.connections)for(const r of c.references)assert(d.references.some(x=>x.id===r));
for(const r of d.references){assert.equal(new URL(r.url).protocol,'https:');for(const k of ['citation','annotation','limitations','access'])assert(r[k]);}
vm.runInContext(fs.readFileSync(root+'app.js','utf8'),ctx);
const count=()=> (el('connections-body').innerHTML.match(/<tr role=/g)||[]).length;
assert.equal(count(),120);assert.equal((el('references').innerHTML.match(/<article /g)||[]).length,35);
el('search').value='groundwater';el('search').events.input();assert(count()>0&&count()<120);
el('search').value='no-match-xyz';el('search').events.input();assert.equal(count(),0);assert(!el('empty').hidden);
el('reset').events.click();assert.equal(count(),120);
el('family').value=d.connections[0].family;el('family').events.change();assert.equal(count(),d.connections.filter(c=>c.family===el('family').value).length);
el('reset').events.click();el('sort').value='major';el('sort').events.change();assert(el('connections-body').innerHTML.includes(d.connections.slice().sort((a,b)=>a.major.localeCompare(b.major))[0].major));
el('toggle-bib').events.click();assert(el('bibliography').hidden);assert.equal(el('toggle-bib').attributes['aria-expanded'],'false');
el('reference-search').value='no-match-xyz';el('reference-search').events.input();assert(el('references').innerHTML.includes('No references match'));
const b={dataset:{ref:d.references[0].id},isConnected:true,focus(){focus='origin'},scrollIntoView(){}};
el('connections-body').events.click({target:{closest:()=>b}});assert(!el('bibliography').hidden);assert.equal(focus,'ref-'+d.references[0].id);assert.equal(el('reference-search').value,'');
el('references').events.click({target:{closest:()=>true}});assert.equal(focus,'origin');
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
console.log('PASS: data completeness, unique IDs, reference relationships, HTTPS source URLs, initial rendering, search, no-results, reset, family filter, sorting, bibliography toggle/search, citation focus and return. DOM simulation only; no browser layout or assistive-technology validation.');
