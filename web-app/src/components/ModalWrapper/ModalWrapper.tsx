interface ModalWrapperProps {
	showModal: boolean;
	children: JSX.Element;
}

function ModalWrapper({children, showModal}:ModalWrapperProps) {

  return (
    <div 
			className="modal-wrapper"
			style={{display: showModal ? 'block' : 'none' }}
		>
			{children}
    </div>
  );
}

export default ModalWrapper;
