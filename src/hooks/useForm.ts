import { useState, useCallback, type ChangeEvent } from 'react';

interface UseFormReturn<T extends Record<string, string>> {
  values: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  setValues: (values: T) => void;
}

export function useForm<T extends Record<string, string>>(initialValues: T): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return { values, handleChange, reset, setValues };
}
