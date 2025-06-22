import AuthorizationForm from "./AuthorizationForm";
import { useState } from "react";

const OrderForm = ({ onSuccess, price }) => {
  const [deliveryType, setDeliveryType] = useState("nova-office");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "Тип доставки") {
      setDeliveryType(value);
    }
  };

  const [formValues, setFormValues] = useState({
    Місто: "",
    "Тип доставки": "nova-office",
    Відділення: "",
    Поштомат: "",
    Оплата: "prepay",
  });

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
  ].filter(Boolean);

  return (
    <AuthorizationForm
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
      header={`${price} грн`}
      outerValues={formValues}
      onChange={handleChange}
      onSubmit={onSuccess}
    />
  );
};

export default OrderForm;
