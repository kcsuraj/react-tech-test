/**
 * Select box to allow user to select an option from list of options
 */
import { ChangeEvent, FC } from 'react';

import './Select.scss';

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
  /** true if input field required */
  required: boolean;
}

const Select: FC<IProps> = (props) => {
  const { options, label, required, ...rest } = props;

  return (
    <div className='form-group'>
      <label className="form-group__label">{label}</label>

      <select className="select-box" {...rest} data-testid="select" required={required}>
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
