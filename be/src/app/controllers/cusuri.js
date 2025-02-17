import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";

export default function YachtManagement() {
  const [yachts, setYachts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (name.trim() === "" || price.trim() === "") return;
    
    const newYacht = { name, price };
    if (editingIndex !== null) {
      const updatedYachts = [...yachts];
      updatedYachts[editingIndex] = newYacht;
      setYachts(updatedYachts);
      setEditingIndex(null);
    } else {
      setYachts([...yachts, newYacht]);
    }
    setName("");
    setPrice("");
  };

  const handleEdit = (index) => {
    setName(yachts[index].name);
    setPrice(yachts[index].price);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setYachts(yachts.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Card>
        <CardContent className="p-4 space-y-4">
          <Input placeholder="Tên du thuyền" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Giá du thuyền" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Button onClick={handleAddOrUpdate}>{editingIndex !== null ? "Cập nhật" : "Thêm du thuyền"}</Button>
        </CardContent>
      </Card>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {yachts.map((yacht, index) => (
            <tr key={index}>
              <td>{yacht.name}</td>
              <td>{yacht.price}</td>
              <td>
                <Button variant="outline" onClick={() => handleEdit(index)}>Sửa</Button>
                <Button variant="destructive" onClick={() => handleDelete(index)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
