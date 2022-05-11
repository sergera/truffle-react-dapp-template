import { Link } from "react-router-dom";

export function Nav() {

  return (
		<nav className="nav">
			<div className="nav__link">
				<Link 
					to="/" 
					style={{ padding: '0.5rem', color: 'inherit', textDecoration: 'inherit' }}
				>
					Landing
				</Link>
			</div>
			<div className="nav__link">
				<Link 
					to="/components" 
					style={{ padding: '0.5rem', color: 'inherit', textDecoration: 'inherit' }}
				>
					Components
				</Link>
			</div>
			<div className="nav__link">
				<Link 
					to="/notes" 
					style={{ padding: '0.5rem', color: 'inherit', textDecoration: 'inherit' }}
				>
					Notes
				</Link>
			</div>
		</nav>
  );
};
