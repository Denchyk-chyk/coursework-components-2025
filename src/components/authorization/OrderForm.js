import AuthorizationForm from './AuthorizationForm';
import { useState } from 'react';

const OrderForm = () => {
    const [deliveryType, setDeliveryType] = useState('nova-office');

    const handleChange = (e) => {
        if (e.target.name === 'Тип доставки') {
            setDeliveryType(e.target.value);
        }
    };

    const visibleItem =
    deliveryType === 'nova-box' ? 
    {
        id: 'order-box',
        type: 'number',
        name: 'Поштомат',
    } : 
    {
        id: 'order-office',
        type: 'number',
        name: 'Відділення',
    };

    const visiblePayments = [
        {
            name: 'Передплата',
            value: 'prepay',
        },
        deliveryType !== 'nova-box' ? 
        {
            name: 'Післяплата',
            value: 'postpay',
        } :
        null
    ].filter(Boolean);

    return (
        <AuthorizationForm
        items={[
        {
            id: 'order-city',
            type: 'text',
            name: 'Місто',
        },
        {
            id: 'order-delivery-type',
            type: 'select',
            name: 'Тип доставки',
            options: [
                {
                    name: 'Відділення Нової пошти',
                    value: 'nova-office',
                },
                {
                    name: 'Поштомат Нової пошти',
                    value: 'nova-box',
                },
                {
                    name: 'Відділення Укрпошти',
                    value: 'ukr-office',
                },
            ],
        },
        visibleItem,
        {
            id: 'order-payment',
            type: 'select',
            name: 'Оплата',
            options: visiblePayments,
        },
        ]}
        onChange={handleChange}
        />
    );
};

export default OrderForm;
