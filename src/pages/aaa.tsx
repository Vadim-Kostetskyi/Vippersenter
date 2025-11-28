import { useState } from "react";

type Office = {
  id: string;
  name: string;
  street: string;
  postalCode: string;
  city: string;
};

export default function DeliveryCalculator() {
  const [postalCode, setPostalCode] = useState("");
  const [offices, setOffices] = useState<Office[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  console.log(offices);
  

  const fetchOffices = async () => {
    try {
      const res = await fetch(
        `http://localhost/vise-data-base/api/v1/order/posten/post-offices.php?postalCode=${postalCode}`
      );
      const data = await res.json();
      console.log(data);
      
      setOffices(data.offices ?? []); // якщо offices немає — ставимо пустий масив
    } catch (e) {
      console.error(e);
      setOffices([]);
    }
  };

  return (
    <div>
      <input
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Введіть поштовий індекс"
      />
      <button onClick={fetchOffices}>Показати відділення</button>

      {offices.length > 0 ? (
        <ul>
          {offices.map((office) => (
            <li key={office.id}>
              <button onClick={() => setSelectedOffice(office)}>
                {office.name} - {office.street} {office.city}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Відділення не знайдено</p>
      )}

      {selectedOffice && (
        <div>
          Вибране відділення: {selectedOffice.name} - {selectedOffice.street}{" "}
          {selectedOffice.city}
        </div>
      )}
    </div>
  );
}
