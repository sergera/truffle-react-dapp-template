import { ConnectedConnectMetamask as ConnectMetamask } from "./ConnectMetamask";

import { getPublicUrl } from "../../env";

const publicUrl = getPublicUrl();

export function Header() {

  return (
    <div className="header">
			<img 						
					src={`${publicUrl}/logo/logo_white.png`}
					className="header__logo"
					alt="logo"
			/>
			<p className="header__title">by Sergio Joselli</p>
			<ConnectMetamask />
    </div>
  );
};
