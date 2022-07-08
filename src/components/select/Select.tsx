/**
 * Select box to allow user to select an option from list of options
 */
import { ChangeEvent, FC } from 'react';

export interface IOption {
  key: string;
  name: string;
}

interface IProps {
  options: IOption[];
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<IProps> = (props) => {
  const { options, label, ...rest } = props;

  return (
    <div>
      <label>{label}</label>

      <select {...rest}>
        <option value="">Select a state</option>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
