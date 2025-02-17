// src/services/ShipService.js
import axios from 'axios';

const apiUrl = '/api/ship';

const getAllShips = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.ships;
  } catch (error) {
    throw new Error('Không thể lấy thông tin du thuyền.');
  }
};

const getShipById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data.ship;
  } catch (error) {
    throw new Error(`Không thể tìm thấy du thuyền với id ${id}`);
  }
};

const createShip = async (shipData) => {
  try {
    const response = await axios.post(`${apiUrl}/create`, shipData);
    return response.data.ship;
  } catch (error) {
    throw new Error('Không thể tạo mới du thuyền.');
  }
};

const updateShip = async (id, shipData) => {
  try {
    const response = await axios.put(`${apiUrl}/update/${id}`, shipData);
    return response.data.ship;
  } catch (error) {
    throw new Error('Không thể cập nhật du thuyền.');
  }
};

const deleteShip = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/delete/${id}`);
    return response.data.ship;
  } catch (error) {
    throw new Error('Không thể xóa du thuyền.');
  }
};

export default {
  getAllShips,
  getShipById,
  createShip,
  updateShip,
  deleteShip,
};
