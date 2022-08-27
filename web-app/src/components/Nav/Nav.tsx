import { Link, useLocation } from "react-router-dom";

import { ROUTER_PATHS } from "../../constants";

export function Nav() {
	const location = useLocation();

	const routeActive = (path: string) => {
		if(location.pathname === path) {
			return true;
		}
		return false;
	}

  return (
		<nav className="nav">
			<div className="nav__link">
				<Link 
					to={ROUTER_PATHS.landing}
					style={{
						padding: '0.5rem',
						color: 'inherit',
						textDecoration: routeActive(ROUTER_PATHS.landing) ? 'underline' : 'inherit',
					}}
				>
					Landing
				</Link>
			</div>
			<div className="nav__link">
				<Link 
					to={ROUTER_PATHS.components}
					style={{
						padding: '0.5rem',
						color: 'inherit',
						textDecoration: routeActive(ROUTER_PATHS.components) ? 'underline' : 'inherit',
					}}
				>
					Components
				</Link>
			</div>
			<div className="nav__link">
				<Link 
					to={ROUTER_PATHS.notes}
					style={{
						padding: '0.5rem',
						color: 'inherit',
						textDecoration: routeActive(ROUTER_PATHS.notes) ? 'underline' : 'inherit',
					}}
				>
					Notes
				</Link>
			</div>
		</nav>
  );
};
