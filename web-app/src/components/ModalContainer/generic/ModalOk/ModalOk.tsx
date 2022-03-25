import Button from '../../../UI/Button/Button';

interface ModalOkProps {
	close: Function;
	content: String;
	title?: string;
};

function ModalOk({close, title, content}:ModalOkProps) {

	const closeModal = () => {
		close();
	};

  return (
    <div className="modal modal-ok" onBlur={closeModal}>
			<div className="modal-ok__content">
				<h1 className="modal-ok__text">{title}</h1>
				<p className="modal-ok__text">{content}</p>
			</div>
			<Button styleClass="btn-foreground-outline" name={"ok"} callback={closeModal}/>
    </div>
  );
};

export default ModalOk;
