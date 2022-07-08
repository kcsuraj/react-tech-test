/**
 * Select box to allow user to select an option from list of options
 */
import { ChangeEvent, FC } from 'react';

interface IProps {
  /** List of options in Select */
  options: Record<string, string>;
  /** Name for Select attribute */
  name: string;
  /** Label content to display */
  label: string;
  /** Value selected in select */
  value: string;
  /** Callback fired when the value is changed */
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  /** Input placeholder value */
  placeholder: string;
}

const Select: FC<IProps> = (props) => {
  const { options, label, ...rest } = props;

  return (
    <div>
      <label>{label}</label>

      <select {...rest}>
        <option value="">Select a state</option>
        {Object.keys(options).map((option) => {
          return (
            <option key={option} value={option}>
              {options[option]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
