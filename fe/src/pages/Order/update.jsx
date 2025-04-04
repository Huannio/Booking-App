import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, notification } from "antd";
import { InputField, SelectField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";
import axios from "~/utils/axios.config";
import { useEffect, useState, useCallback, useContext } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import Rooms from "../Cruise/components/Rooms";

const { Option } = Select;

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setGlobalLoading } = useContext(LoadingContext);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(config.orderSchema) });

  const [order, setOrder] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [quantityRoomOrder, setQuantityRoomOrder] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [totalPriceChange, setTotalPriceChange] = useState();

  const getData = useCallback(async () => {
    setGlobalLoading(true);
    const response = await axios.get(`/orders/${id}`);
    setOrder(response.data);

    const rooms = response.data.bookingRooms.map((room) => room.room);
    setRooms(rooms);

    const quantityRoomOrder = response.data.bookingRooms.map((room) => {
      return {
        room_id: room.room.id,
        quantity: room.quantity,
      };
    });
    setQuantityRoomOrder(quantityRoomOrder);
    setTotalPriceChange(response.data.total_price);
    reset({
      customerId: response?.data?.bookingCustomers?.customer?.id,
      status: response?.data?.status,
      phone_number: response?.data?.bookingCustomers?.customer?.phone_number,
      email: response?.data?.bookingCustomers?.customer?.email,
      name: response?.data?.bookingCustomers?.customer?.name,
    });
    setGlobalLoading(false);
  }, [id, reset, setGlobalLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleUpdateForm = async (data) => {
    const response = await axios.put(`/orders/update/${id}`, {
      ...data,
      rooms: selectedRooms,
    });

    if (response.statusCode === 200) {
      notification.success({
        message: response?.message || "Cập nhật thành công!",
      });
      navigate("/orders");
    }
  };

  useEffect(() => {
    setValue("total_price", totalPriceChange);
  }, [totalPriceChange, setValue]);

  const statusOption = (
    <>
      <Option value={"Đã hủy"}>Đã hủy</Option>
      <Option value={"Đã thanh toán"}>Đã thanh toán</Option>
      <Option value={"Đã đặt phòng"}>Đã đặt phòng</Option>
      <Option value={"Hoàn thành"}>Hoàn thành</Option>
    </>
  );

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Cập nhật thông tin đơn hàng</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleUpdateForm)}
      >
        <div className="group-input">
          <div className="form-group">
            <InputField
              label="Tên khách hàng"
              type="text"
              name="name"
              placeholder="Nhập tên..."
              control={control}
              error={errors.name}
              required
              status={errors.name && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Nhập email..."
              control={control}
              error={errors.email}
              required
              status={errors.email && "error"}
              inputGroup={false}
            />
          </div>
        </div>

        <div className="group-input">
          <div className="form-group">
            <InputField
              label="Số điện thoại"
              type="number"
              name="phone_number"
              placeholder="Nhập số điện thoại..."
              control={control}
              error={errors.phone_number}
              required
              status={errors.phone_number && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <SelectField
              name="status"
              label="Chọn trạng thái đơn hàng"
              placeholder="Chọn trạng thái đơn hàng"
              control={control}
              error={errors.status}
              options={statusOption}
              onChange={(value) => setValue("status", value)}
              className="w-full"
              required
            />
          </div>
        </div>

        <div className="group-input">
          <div className="form-group">
            <input
              name="total_price"
              {...register("total_price")}
              value={totalPriceChange}
              hidden
            />
          </div>
        </div>

        <Rooms
          id="rooms"
          rooms={rooms}
          hideOrder={false}
          quantityRoomOrder={quantityRoomOrder}
          totalPriceOrder={order.total_price}
          onSelectedRoomsChange={setSelectedRooms}
          onTotalPriceChange={setTotalPriceChange}
        />

        <Button
          primary
          normal
          submit
          className="align-self-end interceptor-loading"
        >
          <div className="label md">Cập nhật</div>
        </Button>
      </form>
    </div>
  );
}

export default Update;
