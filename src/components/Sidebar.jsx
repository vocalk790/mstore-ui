import React from 'react';

const Sidebar = () => {
  return (
    <aside style={{ width: '200px', background: '#f4f4f4', padding: '10px' }}>
      <ul>
        <li>대시보드</li>
        <li>상품목록</li>
        <li>수익분석</li>
        <li>드롭쉬핑</li>
        <li>자동매입</li>
        <li>설정</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
