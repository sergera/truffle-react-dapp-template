import { Link } from "react-router-dom";

export function Landing() {

  return (
    <div className="landing">
			<div className="landing__content">
				<h1>Welcome to the Truffle-React dApp Template</h1>

				<p>With this template you can jump-start the development of your next dApp!</p>

				<h3>Features:</h3>
				<ul>
					<li>Redux store with blockchain-related state management</li>
					<li>Integration with MetaMask provider from the start</li>
					<li>Killswitch state for building blockchain-safe components</li>
					<li>Tested store and components with jest</li>
					<li>Keyboard accessiblity</li>
					<li>Modals</li>
					<li>Notifications</li>
					<li>Toasts</li>
					<li>Completely responsive interface</li>
					<li>Logging with severity levels</li>
					<li>Validation and formatting helpers</li>
					<li>Error page triggered by react boundary</li>
					<li>Not found page</li>
				</ul>

				<Link 
					to="/components" 
					className="landing__link"
				>
					Components Page:
				</Link>
				<p>A collection of the components built for this template</p>

				<Link 
					to="/notes" 
					className="landing__link"
				>
					Notes Contract Page:
				</Link>
				<p>A preview of contract interaction with using the "Notes" contract provided as an example</p>
			</div>
    </div>
  );
};
