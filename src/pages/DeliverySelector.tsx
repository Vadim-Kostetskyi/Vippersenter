import { useState } from "react";

export default function DeliverySelector() {
  const [postalCode, setPostalCode] = useState("");
  const [points, setPoints] = useState<any[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);

  const fetchPoints = async () => {
    const res = await fetch(
      `http://localhost/vise-data-base/api/v1/order/postnord/getServicePoints.php?postalCode=${postalCode}`
    );
    const data = await res.json();
    setPoints(data);
    setSelectedPoint(null);
    setDeliveryPrice(null);
  };

  const handleSelect = async (pointId: string) => {
    const point = points.find((p) => p.id === pointId);
    if (!point) return;

    setSelectedPoint(point);

    try {
      const res = await fetch(
        `http://localhost/vise-data-base/api/v1/order/postnord/calculateDelivery.php?toPostalCode=${point.postalCode}`
      );
      const data = await res.json();

      if (data.error) {
        setDeliveryPrice(null);
        alert(data.error);
      } else {
        setDeliveryPrice(data.price);
      }
    } catch (err) {
      console.error(err);
      setDeliveryPrice(null);
    }
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
        <select
          onChange={(e) => handleSelect(e.target.value)}
          value={selectedPoint?.id || ""}
        >
          <option value="" disabled>
            Виберіть відділення
          </option>
          {points.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {p.address}, {p.city}
            </option>
          ))}
        </select>
      )}

      {deliveryPrice !== null && <div>Ціна доставки: {deliveryPrice} NOK</div>}
    </div>
  );
}
