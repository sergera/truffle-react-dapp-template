import ConnectMetamask from "./ConnectMetamask/ConnectMetamask";

const publicUrl = process.env.PUBLIC_URL;

function Header() {

  return (
    <div className="header">
			<h1 className="header__title">dApp by Sergio Joselli</h1>
			<ConnectMetamask/>
    </div>
  );
};

export default Header;
