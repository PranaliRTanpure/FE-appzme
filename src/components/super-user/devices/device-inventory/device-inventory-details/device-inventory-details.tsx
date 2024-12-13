import { useParams } from "react-router-dom";

const DeviceInventoryDetails = () => {
  const { deviceId } = useParams(); // Extract 'id' from the route

  return (
    <div>
      <h1>Device Details</h1>
      <p>Device ID: {deviceId}</p>
    </div>
  );
};

export default DeviceInventoryDetails;
