import { useParams } from "react-router-dom";

const DeviceInventoryDetails = () => {
  const { id } = useParams(); // Extract 'id' from the route

  return (
    <div>
      <h1>Device Details</h1>
      <p>Device ID: {id}</p>
    </div>
  );
};

export default DeviceInventoryDetails;
