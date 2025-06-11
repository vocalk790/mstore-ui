import React from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
import Tabs from "../components/ui/Tabs";
import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";
import Alert from "../components/ui/Alert";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ComponentsPreview = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">🧪 Components Preview</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">Button</h2>
        <div className="space-x-2">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Input</h2>
        <Input label="이름" placeholder="홍길동" />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Card</h2>
        <Card title="테스트 카드" description="Figma 스타일 카드 설명입니다.">
          <p className="text-sm text-gray-500">내부 콘텐츠 영역</p>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Table</h2>
        <Table
          columns={[
            { header: "항목", accessor: "label" },
            { header: "값", accessor: "value" },
          ]}
          data={[
            { label: "CPU", value: "Intel i7" },
            { label: "RAM", value: "16GB" },
          ]}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Tabs</h2>
        <Tabs tabs={[{ label: "탭 A", content: "내용 A" }, { label: "탭 B", content: "내용 B" }]} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Avatar</h2>
        <div className="flex space-x-4">
          <Avatar name="홍길동" />
          <Avatar name="Jane Doe" src="https://i.pravatar.cc/150?img=32" />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Badge</h2>
        <div className="space-x-2">
          <Badge color="primary">기본</Badge>
          <Badge color="success">성공</Badge>
          <Badge color="warning">주의</Badge>
          <Badge color="error">오류</Badge>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Alert</h2>
        <Alert type="info" message="이건 정보 알림입니다." />
        <Alert type="success" message="처리 완료!" />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Loading Spinner</h2>
        <LoadingSpinner center />
      </section>
    </div>
  );
};

export default ComponentsPreview;
