const fs = require('fs');
const axios = require('axios');

const { FIGMA_TOKEN, FIGMA_FILE_KEY } = process.env;
if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
  console.error('❌ FIGMA_TOKEN 또는 FIGMA_FILE_KEY 없음');
  process.exit(1);
}

const HEADERS = { 'X-Figma-Token': FIGMA_TOKEN };
const OUT = 'design-sync';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

function toHex(c) {
  const { r, g, b } = c;
  return '#' + [r,g,b].map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('').toUpperCase();
}
function walk(n, fn){ fn(n); if(n.children) n.children.forEach(ch=>walk(ch,fn)); }

function extractNodeColors(doc){
  const map = {};
  walk(doc, n=>{
    if(n.fills && Array.isArray(n.fills)){
      const solid = n.fills.find(f=>f.type==='SOLID' && f.visible!==false);
      if(solid && solid.color){
        const key = (n.name||'node').replace(/\s+/g,'_').toLowerCase();
        if(!map[key]) map[key] = toHex(solid.color);
      }
    }
  });
  return map;
}

function extractTextStyles(styles, doc){
  const out = {};
  walk(doc, n=>{
    if(n.type==='TEXT' && n.styles?.text){
      const id = n.styles.text;
      const meta = styles[id];
      if(meta && !out[meta.name]){
        const s = n.style;
        out[meta.name] = {
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          lineHeightPx: s.lineHeightPx,
          letterSpacing: s.letterSpacing,
          paragraphSpacing: s.paragraphSpacing
        };
      }
    }
  });
  return out;
}

function extractComponents(fileJSON){
  const res = {};
  if(fileJSON.components){
    Object.values(fileJSON.components).forEach(c=>{
      res[c.name] = { key: c.key, description: c.description || '' };
    });
  }
  return res;
}

async function main(){
  console.log('⬇ 파일 다운로드 중...');
  const { data:fileJSON } = await axios.get(
    `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`,
    { headers: HEADERS }
  );
  fs.writeFileSync(`${OUT}/figma-file.json`, JSON.stringify(fileJSON,null,2));

  const doc = fileJSON.document;
  const styles = fileJSON.styles || {};

  const colors = extractNodeColors(doc);
  fs.writeFileSync(`${OUT}/node-colors.json`, JSON.stringify(colors,null,2));

  const textStyles = extractTextStyles(styles, doc);
  fs.writeFileSync(`${OUT}/text-styles.json`, JSON.stringify(textStyles,null,2));

  const components = extractComponents(fileJSON);
  fs.writeFileSync(`${OUT}/components.json`, JSON.stringify(components,null,2));

  console.log('✅ Summary:',
    '\n colors:', Object.keys(colors).length,
    '\n textStyles:', Object.keys(textStyles).length,
    '\n components:', Object.keys(components).length
  );
}

main().catch(e=>{
  if(e.response){
    console.error('API error', e.response.status, e.response.data);
  } else {
    console.error(e.message);
  }
  process.exit(1);
});
