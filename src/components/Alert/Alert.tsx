/**
 * Component to display alert messages
 */
import { FC } from 'react';
import './Alert.scss';

interface IProps {
  /** Content to display in alert */
  text: string;
}

const Alert: FC<IProps> = ({ text }) => <div className="alert">{text}</div>;

export default Alert;
