import Button from '../../../Button/Button';

import { ModalSelectProps } from './types';

function ModalSelect({close, title, content, list}:ModalSelectProps) {

	const closeModal = () => {
		close();
	};

	const selectItem = (callback: Function) => {
		callback();
		close();
	};

  return (
    <div className="modal modal-select" onBlur={closeModal}>
			<p>{title}</p>
			<p>{content}</p>
			{list.map((item) => {
				return (<Button name={item.name} callback={() => selectItem(item.callback)} key={item.name} />)
			})}
    </div>
  );
};

export default ModalSelect;
