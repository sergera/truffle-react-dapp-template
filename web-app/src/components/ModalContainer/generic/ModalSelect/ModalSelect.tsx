import { Button } from '../../../UI/Button';

import { ModalSelectProps } from './ModalSelect.types';

export function ModalSelect({close, title, content, list}:ModalSelectProps) {

	const closeModal = () => {
		close();
	};

	const selectItem = (callback: Function) => {
		callback();
		close();
	};

  return (
    <div className="modal modal-select" onBlur={closeModal}>
			<h1 className="modal-select__text">{title}</h1>
			<p className="modal-select__text">{content}</p>
			<div className="modal-select__options">
				{list.map((item) => {
					return (
						<div className="modal-select__item"> 
							<Button 
								styleClass="btn-foreground-outline" 
								name={item.name} 
								callback={() => selectItem(item.callback)} 
								key={item.name} 
							/>				
						</div>
					);
				})}
			</div>
    </div>
  );
};
