// scripts/figma-import.js

const fs = require('fs');
const axios = require('axios');
const path = require('path');

const fileId = 'xFbKOGUCGkLNAHN4o5UDCR'; // ← Figma 파일 키
const frameId = '여기에_프레임_ID_입력'; // 예: '123:456'

const outputDir = path.join(__dirname, '../src/components');

const figmaToken = process.env.FIGMA_ACCESS_TOKEN;

if (!figmaToken) {
  console.error('❌ Figma Access Token이 설정되지 않았습니다. `.env` 또는 환경변수 확인');
  process.exit(1);
}

const getFigmaNode = async () => {
  const url = `https://api.figma.com/v1/files/${fileId}/nodes?ids=${encodeURIComponent(frameId)}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'X-Figma-Token': figmaToken,
      },
    });
    return res.data.nodes[frameId];
  } catch (err) {
    console.error('❌ Figma API 요청 실패:', err.response?.data || err.message);
    process.exit(1);
  }
};

const generateComponent = (node) => {
  const name = node.document.name.replace(/\s+/g, '');
  const content = `import React from 'react';

const ${name} = () => {
  return (
    <div>
      <h2>${name}</h2>
      {/* 여기에 Figma에서 변환된 UI가 추가될 수 있습니다 */}
    </div>
  );
};

export default ${name};
`;
  const filePath = path.join(outputDir, `${name}.jsx`);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 컴포넌트 생성됨: ${filePath}`);
};

const run = async () => {
  console.log('🚀 Figma → React 변환 시작...');
  const node = await getFigmaNode();

  if (!node || !node.document) {
    console.error('❌ 지정한 프레임 ID를 찾을 수 없습니다. Figma 프레임 ID 확인해주세요.');
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  generateComponent(node);
};

run();
