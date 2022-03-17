import Button from '../../../UI/Button/Button';

interface ModalOkProps {
	close: Function,
	content: String,
	title?: string,
};

function ModalOk({close, title, content}:ModalOkProps) {

	const closeModal = () => {
		close();
	};

  return (
    <div className="modal modal-ok" onBlur={closeModal}>
			<p>{title}</p>
			<p>{content}</p>
			<Button name={"ok"} callback={closeModal}/>
    </div>
  );
};

export default ModalOk;
