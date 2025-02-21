import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { notification } from "antd";
import { InputField, SelectField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";
import axios from "~/utils/axios.config";
import { useEffect, useState, useCallback, useContext } from "react";
import { LoadingContext } from "~/components/Loading/Loading";

function UpdateShip() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setGlobalLoading } = useContext(LoadingContext);
  const [shipTypes, setShipTypes] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(config.shipSchema) });

  // Lấy danh sách loại du thuyền
  const getShipTypes = useCallback(async () => {
    setGlobalLoading(true);
    const response = await axios.get("/ship-types");
    setShipTypes(response.data.ship_types || []);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  // Lấy thông tin du thuyền cần cập nhật
  const getOneShip = useCallback(async () => {
    setGlobalLoading(true);
    const response = await axios.get(`/ships/${id}`);
    reset({
      title: response.data.title,
      address: response.data.address,
      map_link: response.data.map_link,
      default_price: response.data.default_price,
      type_product: response.data.type_product?.id || null,
    });
    setGlobalLoading(false);
  }, [id, reset, setGlobalLoading]);

  useEffect(() => {
    getShipTypes();
    getOneShip();
  }, [getShipTypes, getOneShip]);

  // Xử lý cập nhật du thuyền
  const handleUpdateShipForm = async (data) => {
    try {
      const response = await axios.put(`/ships/update/${id}`, data);
      notification.success({
        message: response?.data?.message || "Cập nhật du thuyền thành công!",
      });
      navigate("/ships");
    } catch (error) {
      notification.error({
        message: error?.response?.data?.message || "Lỗi khi cập nhật du thuyền!",
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Cập nhật thông tin du thuyền</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleUpdateShipForm)}
      >
        <div className="group-input">
          <InputField
            label="Tên du thuyền"
            type="text"
            name="title"
            placeholder="Nhập tên du thuyền..."
            control={control}
            error={errors.title}
            status={errors.title && "error"}
          />
        </div>

        <div className="group-input">
          <InputField
            label="Địa chỉ"
            type="text"
            name="address"
            placeholder="Nhập địa chỉ..."
            control={control}
            error={errors.address}
            status={errors.address && "error"}
          />
        </div>

        <div className="group-input">
          <InputField
            label="Link Bản Đồ"
            type="text"
            name="map_link"
            placeholder="Nhập link Google Map..."
            control={control}
            error={errors.map_link}
            status={errors.map_link && "error"}
          />
        </div>

        <div className="group-input">
          <InputField
            label="Giá Mặc Định"
            type="number"
            name="default_price"
            placeholder="Nhập giá..."
            control={control}
            error={errors.default_price}
            status={errors.default_price && "error"}
          />
        </div>

        <div className="group-input">
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
        </div>

        <Button primary normal submit className="align-self-end">
          <div className="label md">Cập nhật</div>
        </Button>
      </form>
    </div>
  );
}

export default UpdateShip;
