import CustomForm from "./CustomForm";
import { useState } from "react";

// Форма для офолення замовлення
const OrderForm = ({ onSuccess, price }) => {
  // Стан для типу доставки
  const [deliveryType, setDeliveryType] = useState("nova-office");

  // Стан для збереження значень полів форми
  const [formValues, setFormValues] = useState({
    Місто: "",
    "Тип доставки": "nova-office",
    Відділення: "",
    Поштомат: "",
    Оплата: "prepay",
  });

  // Обробка зміни значення поля форми
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Оновлення відповідного поля у стані форми
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Якщо змінюється тип доставки — окремо оновлюється відповідний стан
    if (name === "Тип доставки") {
      setDeliveryType(value);
    }
  };

  // Визначення відображуваного поля в залежності від типу доставки
  const visibleItem =
    deliveryType === "nova-box"
      ? {
          id: "order-box",
          type: "number",
          name: "Поштомат",
        }
      : {
          id: "order-office",
          type: "number",
          name: "Відділення",
        };

  // Варіанти оплати. Якщо обрано поштомат, післяплата не доступна
  const visiblePayments = [
    {
      name: "Передплата",
      value: "prepay",
    },
    deliveryType !== "nova-box"
      ? {
          name: "Післяплата",
          value: "postpay",
        }
      : null,
  ].filter(Boolean); // Видалення null, якщо післяплата не доступна

  // Рендер форми з передачею полів, значень та обробників
  return (
    <CustomForm
      items={[
        {
          id: "order-city",
          type: "text",
          name: "Місто",
        },
        {
          id: "order-delivery-type",
          type: "select",
          name: "Тип доставки",
          options: [
            { name: "Відділення Нової пошти", value: "nova-office" },
            { name: "Поштомат Нової пошти", value: "nova-box" },
            { name: "Відділення Укрпошти", value: "ukr-office" },
          ],
        },
        visibleItem,
        {
          id: "order-payment",
          type: "select",
          name: "Оплата",
          options: visiblePayments,
        },
      ]}
      header={`${price} грн`} // Заголовок форми — ціна
      outerValues={formValues} // Передача зовнішнього стану форми
      onChange={handleChange} // Обробка змін полів форми
      onSubmit={onSuccess} // Обробка відправлення форми
    />
  );
};

export default OrderForm;
