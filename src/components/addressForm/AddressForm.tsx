/**
 * Implement a address form and validate if it is valid address
 */
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

  /**
   * Check validity of postcode
   *
   * @param locality Locality details
   * @returns true if postcode entered in form matches with postcode in locality
   */
  const validatePostCode = (locality: Locality) =>
    parseInt(formValues.postcode) === locality.postcode;

  /**
   * Check validity of suburb
   *
   * @param locality Locality details
   * @returns true if suburb entered in form matches with suburb in locality
   */
  const validateSuburb = (locality: Locality) =>
    formValues.suburb.toLowerCase() === locality.location.toLowerCase();

  /**
   * Validation message bases on whether postcode and suburb are valid
   *
   * @param isPostCodeValid true if postCode matches with Suburb
   * @param isSuburbValid true if suburb matches with state
   * @returns validation message to display on form submission
   */
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

  /**
   * Handle validation of form fields ie postcode, suburb and state with API
   * and display appropriate validation message
   */
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

  /**
   * Handle form input change
   *
   * @param event Input change event
   */
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ [name]: value } as FormValues);
  };

  /**
   * Handle form submission
   *
   * @param event Form event change
   */
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
