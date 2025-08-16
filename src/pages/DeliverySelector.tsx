import { useState } from "react";

export default function DeliverySelector() {
  const [postalCode, setPostalCode] = useState("");
  const [points, setPoints] = useState([]);
  console.log(points);
  

  const fetchPoints = async () => {
    const res = await fetch(
      `http://localhost/vise-data-base/api/v1/order/postnord/getServicePoints.php?postalCode=${postalCode}`
    );
    const data = await res.json();
    setPoints(data);
  };

  return (
    <div>
      <input
        type="text"
        value={postalCode}
        placeholder="Введіть поштовий індекс"
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <button onClick={fetchPoints}>Пошук</button>

      {points.length > 0 && (
        <select>
          {points.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {p.address}, {p.city}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
