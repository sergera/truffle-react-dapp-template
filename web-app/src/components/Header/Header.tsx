import ConnectMetamask from "./ConnectMetamask/ConnectMetamask";

const publicUrl = process.env.PUBLIC_URL;

function Header() {

  return (
    <div className="header">
			<img 						
					src={`${publicUrl}/logo/logo_white.png`}
					className="header__logo"
			/>
			<h1 className="header__title">by Sergio Joselli</h1>
			<ConnectMetamask/>
    </div>
  );
};

export default Header;
