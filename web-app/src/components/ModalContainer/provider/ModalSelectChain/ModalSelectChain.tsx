import { 
	Button 
} from '../../../UI/Button';

import { 
	getChainIdHex 
} from '../../../../blockchain/chains';
import { 
	getSupportedChains 
} from '../../../../env';

import { 
	store 
} from '../../../../state';
import { 
	switchChain 
} from '../../../../state/blockchain/wallet/chain';

import { 
	ModalSelectChainProps 
} from './ModalSelectChain.types';

const supportedChains = getSupportedChains();
const chainsArray = supportedChains.map((chainName) => {
	return {
		name: chainName,
		callback: async () => await store.dispatch(
			switchChain(getChainIdHex(chainName))
		),
	}
});

export function ModalSelectChain({
	close
}:ModalSelectChainProps) {

	const title = "Chain Not Supported";
	const content = "Current connected chain is not supported, please connect to a supported chain";

	const selectItem = (callback: Function) => {
		callback();
		close();
	};

  return (
    <div className="modal">
			<h1 className="modal-select-chain__text">{title}</h1>
			<p className="modal-select-chain__text">{content}</p>
			<div className="modal-select-chain__options">
				{chainsArray.map((chainItem) => {
					return (
						<div className="modal-select-chain__item"> 
							<Button 
								styleClass="btn-foreground-outline" 
								name={chainItem.name} 
								callback={() => selectItem(chainItem.callback)} 
								key={chainItem.name} 
							/>				
						</div>
					);
				})}
			</div>
    </div>
  );
};
