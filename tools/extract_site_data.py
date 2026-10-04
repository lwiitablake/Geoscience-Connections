import zipfile, xml.etree.ElementTree as ET, json
from pathlib import Path
import argparse
root=Path(__file__).resolve().parent.parent
parser=argparse.ArgumentParser(description='Extract the original workbook layout. Replaces data.js in the output directory.')
parser.add_argument('--source', type=Path, default=root/'source/Geoscience_Connections_Across_Majors.xlsx')
parser.add_argument('--output-dir', type=Path, required=True)
args=parser.parse_args()
src=args.source
out=args.output_dir
out.mkdir(parents=True, exist_ok=True)
ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
with zipfile.ZipFile(src) as z:
    strings=[]
    if 'xl/sharedStrings.xml' in z.namelist():
        strings=[''.join(x.itertext()) for x in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('s:si',ns)]
    def sheet(i,width):
        result=[]
        for row in ET.fromstring(z.read(f'xl/worksheets/sheet{i}.xml')).findall('s:sheetData/s:row',ns):
            if int(row.attrib['r'])<6: continue
            vals=['']*width
            for c in row.findall('s:c',ns):
                col=0
                for a in c.attrib['r']:
                    if not a.isalpha(): break
                    col=col*26+ord(a)-64
                if col>width:continue
                v=c.find('s:v',ns)
                if c.attrib.get('t')=='s': val=strings[int(v.text)] if v is not None else ''
                elif c.attrib.get('t')=='inlineStr':val=''.join(c.find('s:is',ns).itertext())
                else:val=v.text if v is not None else ''
                vals[col-1]=val
            if vals[0]:result.append(vals)
        return result
    fields=['id','family','major','discipline','task','anchor','connection','pathway','evidence','references']
    connections=[dict(zip(fields,r)) for r in sheet(1,10)]
    for r in connections:r['references']=r['references'].split('; ')
    refs=[dict(zip(['id','citation','url','type','annotation','limitations','access'],r)) for r in sheet(2,7)]
    guide=[dict(zip(['topic','explanation'],r)) for r in sheet(3,2)]
assert len(connections)==120 and len(refs)==35
assert all(id in {r['id'] for r in refs} for c in connections for id in c['references'])
data={'title':'Geoscience Connections','date':'2026-10-03','connections':connections,'references':refs,'guide':guide}
(out/'data.js').write_text('// Edit the records below to update the site. Keep reference IDs unique.\nwindow.GEOSCIENCE_DATA = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n')
print(f'Extracted {len(connections)} connections, {len(refs)} references, and {len(guide)} guide entries from supplied workbook.')
