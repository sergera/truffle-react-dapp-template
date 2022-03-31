import { ModalOk } from '../../generic/ModalOk';

import { ModalMultipleProvidersProps } from './ModalMultipleProviders.types';

export function ModalMultipleProviders({close}:ModalMultipleProvidersProps) {

  return (
		<ModalOk 
			title="Multiple Providers"
			content="Multiple providers detected, please have only MetaMask installed and try again"
			close={close}
		/>
  );
};
