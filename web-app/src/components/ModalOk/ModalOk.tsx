import Button from '../Button/Button';

interface ModalOkProps {
	setShow?: Function;
	title?: string;
	content: string;
}

function ModalOk({setShow, title, content}:ModalOkProps) {

	const closeModal = () => {
		setShow!(false);
	}

  return (
    <div className="modal-ok">
			<p>{title}</p>
			<p>{content}</p>
			<Button name={"ok"} callback={closeModal}/>
    </div>
  );
}

export default ModalOk;
