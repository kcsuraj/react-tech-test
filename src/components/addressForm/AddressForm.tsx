import { FC, FormEvent, useReducer, ChangeEvent } from 'react';

import InputField from '../inputField/InputField';
import Select from '../select/Select';
import states from './states.json';
import { IOption } from '../select/Select';

const initialFormValues = {
  postcode: '',
  suburb: '',
  state: ''
};

type FormValues = typeof initialFormValues;

const AddressForm: FC = () => {
  const [formValues, setFormValues] = useReducer(
    (currentValues: FormValues, newValues: FormValues) => ({
      ...currentValues,
      ...newValues
    }),
    initialFormValues
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ [name]: value } as FormValues);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <InputField
        type="text"
        name="postcode"
        value={formValues.postcode}
        label="Postal code"
        placeholder="Enter postcode"
        onChange={handleInputChange}
      />
      <InputField
        type="text"
        name="suburb"
        value={formValues.suburb}
        label="Suburb"
        placeholder="Enter Suburb"
        onChange={handleInputChange}
      />

      <Select
        name="state"
        label="State"
        value={formValues.state}
        options={states as IOption[]}
        onChange={handleInputChange}
      />
      <button type="submit">Validate</button>
    </form>
  );
};

export default AddressForm;
