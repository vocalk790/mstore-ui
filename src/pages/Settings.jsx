import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">⚙️ 시스템 설정</h1>

      {/* 설정 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">📦 재고 관리 설정</h2>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              <li>품절 자동 감지</li>
              <li>매입단가 초과시 경고</li>
              <li>AI 추천 수량 적용</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">💵 수익률 정책</h2>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              <li>최소 수익률: 20%</li>
              <li>자동 가격 조정 사용</li>
              <li>경쟁사 가격 감시 활성화</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">🚛 배송 설정</h2>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              <li>기본 배송비: 3,000원</li>
              <li>묶음배송 허용</li>
              <li>반품 자동 처리 사용</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">🔐 계정 및 접근 제어</h2>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              <li>2단계 인증 사용</li>
              <li>관리자 전용 기능 설정</li>
              <li>로그 기록 보존 기간: 90일</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
