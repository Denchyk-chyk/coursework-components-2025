import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Styles.css";
import FormField from "./FormField";

const AuthorizationForm = ({ header, alternative, items, onSubmit, validate, onChange, outerValues }) => {
    const isControlled = outerValues !== undefined;

    const [innerValues, setInnerValues] = useState(() =>
        Object.fromEntries(items.map(item => [item.name, '']))
    );

    const values = isControlled ? outerValues : innerValues;

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (!isControlled) {
            setInnerValues(prev => ({ ...prev, [name]: value }));
        }

        if (onChange) {
            onChange(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        items.forEach(item => {
            const val = String(values[item.name] ?? '');

            if (!val.trim()) {
                newErrors[item.name] = 'Це поле є обов\'язковим';
            }
        });

        if (validate) {
            const extraErrors = await validate(values);
            Object.assign(newErrors, extraErrors);
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0 && onSubmit) {
            onSubmit(values);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Form className="authorization-form thin-section" onSubmit={handleSubmit}>
                {header && <h1>{header}</h1>}
                <div className="bg-white p-3 shadow rounded">
                    {items.map(item => (
                        <FormField
                            key={item.name}
                            {...item}
                            value={values[item.name]}
                            onChange={handleChange}
                            isInvalid={!!errors[item.name]}
                            errorText={errors[item.name]}
                        />
                    ))}
                    {alternative && <p className="text-center text-muted">{alternative}</p>}
                    <Button variant="light" type="submit">Підтвердити</Button>
                </div>
            </Form>
        </div>
    );
};

export default AuthorizationForm;
