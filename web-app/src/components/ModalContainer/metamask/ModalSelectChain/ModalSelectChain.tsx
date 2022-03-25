import ModalSelect from '../../generic/ModalSelect/ModalSelect';

import store from '../../../../state/store';
import { getSupportedChainsArray, getChainIdHex } from '../../../../utils/provider/chains';
import { requestChainSwitch } from '../../../../state/wallet/chain/thunks';

interface ModalSelectChainProps {
	close: Function;
};

const supportedChains = getSupportedChainsArray();
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
