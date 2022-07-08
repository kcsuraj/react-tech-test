/**
 * Input field to let user enter and edit texts
 */
import { ChangeEvent, FC } from 'react';
import './InputField.scss';

interface IProps {
  /** Name for Select attribute */
  name: string;
  /** Type of input element */
  type: 'text' | 'number';
  /** Label content to display */
  label: string;
  placeholder: string;
  /** Callback fired when a menu item is selected */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Value selected in select */
  value: string;
  /** true if input field required */
  required: boolean;
}

const InputField: FC<IProps> = ({ required = false, ...rest }) => {
  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={rest.name}>
        {rest.label}
      </label>
      <input
        className="form-group__input"
        required={required}
        {...rest}
        id={rest.name}
      />
    </div>
  );
};

export default InputField;
