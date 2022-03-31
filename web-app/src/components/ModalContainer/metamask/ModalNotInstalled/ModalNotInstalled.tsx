import { ModalOk } from '../../generic/ModalOk';

import { ModalNotInstalledProps } from './ModalNotInstalled.types';

export function ModalNotInstalled({close}:ModalNotInstalledProps) {

  return (
		<ModalOk 
			title="MetaMask Not Installed"
			content="This application only supports MetaMask, please install MetaMask"
			close={close}
		/>
  );
};
