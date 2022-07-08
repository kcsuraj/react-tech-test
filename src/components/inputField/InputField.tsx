/**
 * Input field to let user enter and edit texts
 */
import { ChangeEvent, FC } from 'react';

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
    <div>
      <label htmlFor={rest.name}>{rest.label}</label>
      <input required={required} {...rest} />
    </div>
  );
};

export default InputField;
