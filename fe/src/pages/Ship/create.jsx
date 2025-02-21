import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "~/utils/axios.config";
import { InputField, SelectField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";
import { LoadingContext } from "~/components/Loading/Loading";

function CreateShip() {
  const navigate = useNavigate();
  const { setGlobalLoading } = useContext(LoadingContext);
  const [shipTypes, setShips] = useState([]);

  // Fetch danh sách loại du thuyền
  const getShips = useCallback(async () => {
    setGlobalLoading(true);
    try {
      const { data } = await axios.get("/ships");
      setShips(data.roles || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách du thuyền:", error);
    }
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getShips();
  }, [getShips]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.shipSchema),
  });

  // Xử lý tạo du thuyền
  const handleCreateShipForm = async (data) => {
    try {
      const response = await axios.post("/ships/create", data);
      notification.success({
        message: response?.data?.message || "Tạo du thuyền thành công!",
      });
      reset();
      navigate("/ships");
    } catch (error) {
      notification.error({
        message: error?.response?.data?.message || "Lỗi khi tạo du thuyền!",
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Tạo mới du thuyền</h6>

      <form className="flex flex-col gap-32" onSubmit={handleSubmit(handleCreateShipForm)}>
        <InputField
          label="Tên du thuyền"
          type="text"
          name="title"
          placeholder="Nhập tên du thuyền..."
          control={control}
          error={errors.title}
          status={errors.title && "error"}
        />

        <InputField
          label="Địa chỉ"
          type="text"
          name="address"
          placeholder="Nhập địa chỉ..."
          control={control}
          error={errors.address}
          status={errors.address && "error"}
        />

        <InputField
          label="Link Bản Đồ"
          type="text"
          name="map_link"
          placeholder="Nhập link Google Map..."
          control={control}
          error={errors.map_link}
          status={errors.map_link && "error"}
        />

        <InputField
          label="Giá Mặc Định"
          type="number"
          name="default_price"
          placeholder="Nhập giá..."
          control={control}
          error={errors.default_price}
          status={errors.default_price && "error"}
        />

        <SelectField
          name="type_product"
          label="Loại du thuyền"
          placeholder="Chọn loại"
          control={control}
          error={errors.type_product}
          status={errors.type_product && "error"}
          options={shipTypes.map((type) => ({
            label: type.name,
            value: type.id,
          }))}
          onChange={(value) => setValue("type_product", value)}
          loading={!shipTypes.length}
        />

        <Button primary normal submit className="align-self-end">
          <div className="label md">Tạo</div>
        </Button>
      </form>
    </div>
  );
}

export default CreateShip;
