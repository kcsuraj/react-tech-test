import { FC, FormEvent, useReducer, ChangeEvent, useState } from 'react';

import InputField from '../inputField/InputField';
import Select from '../select/Select';
import states from './states.json';
import { IOption } from '../select/Select';
import { getLocalities } from '../../services/api';

const initialFormValues = {
  postcode: '',
  suburb: '',
  state: ''
};

type FormValues = typeof initialFormValues;

type Locality = Record<string, any>;

const AddressForm: FC = () => {
  const [formValues, setFormValues] = useReducer(
    (currentValues: FormValues, newValues: FormValues) => ({
      ...currentValues,
      ...newValues
    }),
    initialFormValues
  );
  const [validationMessage, setValidationMessage] = useState('');

  const validatePostCode = (locality: Locality) =>
    parseInt(formValues.postcode) === locality.postcode;

  const validateSuburb = (locality: Locality) =>
    formValues.suburb.toLowerCase() === locality.location.toLowerCase();

  const getValidationMessage = (
    isPostCodeValid: boolean,
    isSuburbValid: boolean
  ) => {
    return !isPostCodeValid
      ? `The postcode ${formValues.postcode} does not match the suburb Broadway.`
      : !isSuburbValid
      ? `The suburb ${formValues.suburb} does not exist in the state ${formValues.state}.`
      : 'The postcode, suburb and state entered are valid.';
  };

  const handleAddressValidation = async () => {
    try {
      const { data } = await getLocalities(formValues.suburb, formValues.state);
      const locality = data?.localities?.locality;
      let isPostCodeValid = false;
      let isSuburbValid = false;

      if (locality) {
        locality.some((locality: Locality) => {
          isPostCodeValid = validatePostCode(locality);
          isSuburbValid = validateSuburb(locality);
          return isPostCodeValid && isSuburbValid;
        });

        setValidationMessage(
          getValidationMessage(isPostCodeValid, isSuburbValid)
        );
      } else {
        setValidationMessage('The address is not valid.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ [name]: value } as FormValues);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddressValidation();
  };

  return (
    <div>
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

      <div>{validationMessage}</div>
    </div>
  );
};

export default AddressForm;
