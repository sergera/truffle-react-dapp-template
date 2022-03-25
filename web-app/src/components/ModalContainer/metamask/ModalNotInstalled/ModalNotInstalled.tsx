import ModalOk from '../../generic/ModalOk/ModalOk';

import { ModalNotInstalledProps } from './ModalNotInstalled.types';

function ModalNotInstalled({close}:ModalNotInstalledProps) {

  return (
		<ModalOk 
			title="MetaMask Not Installed"
			content="This application only supports MetaMask, please install MetaMask"
			close={close}
		/>
  );
};

export default ModalNotInstalled;
