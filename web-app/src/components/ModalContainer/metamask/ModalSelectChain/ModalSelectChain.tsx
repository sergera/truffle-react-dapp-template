import ModalSelect from '../../generic/ModalSelect/ModalSelect';

import { getChainIdHex } from '../../../../blockchain/chains';
import { getSupportedChains } from '../../../../env';

import store from '../../../../state/store';
import { requestChainSwitch } from '../../../../state/wallet/chain/thunks';

import { ModalSelectChainProps } from './ModalSelectChain.types';

const supportedChains = getSupportedChains();
const chainsArray = supportedChains.map((chainName) => {
	return {
		name: chainName,
		callback: async () => await store.dispatch(requestChainSwitch(getChainIdHex(chainName))),
	}
});

function ModalSelectChain({close}:ModalSelectChainProps) {
  return (
		<ModalSelect 
			title="Chain Not Supported"
			content="Current connected chain is not supported, please select a supported chain below"
			close={close}
			list={chainsArray}
		/>
  );
};

export default ModalSelectChain;
