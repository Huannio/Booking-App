import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Checkbox, notification } from 'antd';
import axios from '~/utils/axios.config';
import Button from '~/components/Button';

function UpdateFeature() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy tất cả feature có sẵn
        const allFeatures = await axios.get('/features');
        // Lấy feature hiện tại của ship
        const shipFeatures = await axios.get(`/ships/${slug}/features`);
        
        setFeatures(allFeatures.data);
        setSelectedFeatures(shipFeatures.data.map(f => f.id));
      } catch (error) {
        notification.error({
          message: 'Lỗi khi tải dữ liệu',
          description: error.message
        });
      }
    };
    
    fetchData();
  }, [slug]);

  const handleFeatureChange = (featureId) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId) 
        : [...prev, featureId]
    );
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/ships/${slug}/features`, { 
        feature_ids: selectedFeatures 
      });
      
      notification.success({
        message: 'Cập nhật đặc trưng thành công!'
      });
      
      navigate(`/ships/update/${slug}`);
    } catch (error) {
      notification.error({
        message: 'Lỗi khi cập nhật',
        description: error.response?.data?.message || error.message
      });
    }
  };

  return (
    <div className="p-16">
      <div className="flex justify-between mb-16">
        <h2>Quản lý đặc trưng du thuyền</h2>
        <Button primary onClick={handleSubmit}>Lưu thay đổi</Button>
      </div>
      
      <div className="grid grid-cols-3 gap-16">
        {features.map(feature => (
          <div key={feature.id} className="p-16 border rounded">
            <Checkbox
              checked={selectedFeatures.includes(feature.id)}
              onChange={() => handleFeatureChange(feature.id)}
            >
              {feature.text}
            </Checkbox>
            {feature.icon && (
              <div className="mt-8">
                <img src={feature.icon} alt={feature.text} className="w-24 h-24" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdateFeature;