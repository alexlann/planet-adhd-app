import { useCallback, useEffect, useState, useRef } from "react";

const useForm = (initialSchema: any, initialData: any) => {
    const [isTouched, setIsTouched] = useState(false);
    const [values, setValues] = useState({ ...initialData });
    const [errors, setErrors] = useState({});
    // we don't listen to schema changes
    const schemaRef = useRef(initialSchema);

    const handleChange = (value: string | number, name: string) => {
        setValues((values: object) => ({
            ...values,
            [name]: value
        }))
    }

    const validate = useCallback(async (values: any, onSuccess: any) => {
        try {
            const isValid = await schemaRef.current.validate(values, {
                abortEarly: false,
            });

            if (isValid) {
                // clear errors
                setErrors({});
                // call onSuccess callback if exists
                if (onSuccess) {
                    onSuccess();
                }
            }
        } catch (errors: any) {
            setErrors(errors);
        }
    }, []);

    // wrapper method for handling submit
    // this way, we don't have to pass a success callback in useForm constructor
    const handleSubmit = (callback: any) => async (e: any) => {
        setIsTouched(true);
        await validate(values, () => {
            callback(values);
        });
    };

    useEffect(() => {
        if (isTouched) {
            validate(values, () => {});
        }
    }, [validate, isTouched, values]);

    return {
        isTouched,
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;
