import { ModalDisabled } from './provider/ModalDisabled';
import { ModalNotConnected } from './provider/ModalNotConnected';
import { ModalDisconnected } from './provider/ModalDisconnected';
import { ModalSelectChain } from './provider/ModalSelectChain';
import { ModalChainNotAdded } from './provider/ModalChainNotAdded';
import { ModalPleaseConnect } from './provider/ModalPleaseConnect/ModalPleaseConnect';

import { ModalComponentsMap } from './ModalContainer.types';

export const MODAL_COMPONENTS: ModalComponentsMap = {
	"DISABLED": ModalDisabled,
	"NOT_CONNECTED": ModalNotConnected,
	"DISCONNECTED": ModalDisconnected,
	"SELECT_CHAIN": ModalSelectChain,
	"CHAIN_NOT_ADDED": ModalChainNotAdded,
	"PLEASE_CONNECT": ModalPleaseConnect,
};
