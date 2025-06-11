
import React, { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tabs from "../components/ui/Tabs";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Alert from "../components/ui/Alert";
import Badge from "../components/ui/Badge";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("최신 데이터 기준으로 자동 업데이트 중입니다.");
  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    cost: "",
    price: "",
  });

  const [products, setProducts] = useState([
    { name: "에어팟 Pro", cost: "210000", price: "259000", status: "판매중" },
    { name: "갤럭시워치", cost: "150000", price: "189000", status: "입고대기" },
  ]);

  const handleRegister = () => {
    const newProduct = {
      ...formData,
      status: "판매대기",
    };
    setProducts([...products, newProduct]);
    setModalOpen(false);
    setFormData({ name: "", cost: "", price: "" });
    setAlertMessage(`🆕 ${newProduct.name} 상품이 등록되었습니다.`);
  };

  const filteredProducts = products.filter((p) => {
    if (activeTab === 1) return p.status === "입고대기";
    if (activeTab === 2) return p.status === "판매중";
    return true;
  });

  const columns = [
    { header: "상품명", accessor: "name" },
    { header: "매입가", accessor: "cost" },
    { header: "판매가", accessor: "price" },
    {
      header: "수익률",
      render: (row) => {
        const rate = Math.round(
          ((parseInt(row.price) - parseInt(row.cost)) / parseInt(row.cost)) * 100
        );
        return `${rate}%`;
      },
    },
    {
      header: "상태",
      render: (row) => <Badge color="primary">{row.status}</Badge>,
    },
  ];

  const tabs = [
    { label: "전체 상품", content: null },
    { label: "매입상품", content: null },
    { label: "판매상품", content: null },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 M스토어 대시보드</h1>

      <Tabs tabs={tabs} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="총 매입가" description="1,200,000원" />
        <Card title="총 판매가" description="1,540,000원" />
        <Card title="예상 수익률" description="28%" />
      </div>

      <div className="flex justify-between items-center mt-6">
        <h2 className="text-lg font-semibold">📦 실시간 상품 리스트</h2>
        <Button onClick={() => setModalOpen(true)}>+ 상품 등록</Button>
      </div>

      <Table columns={columns} data={filteredProducts} />

      <Alert type="info" message={alertMessage} />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="📥 상품 등록"
        footer={
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              취소
            </Button>
            <Button onClick={handleRegister}>등록</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="상품명"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="예: 갤럭시버즈"
          />
          <Input
            label="매입가"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            placeholder="예: 150000"
          />
          <Input
            label="판매가"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="예: 189000"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
