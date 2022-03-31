import { Link } from "react-router-dom";

export function Nav() {

  return (
    <div className="nav">
			<nav>
				<div className="nav__link">
					<Link 
						to="/" 
						style={{ color: 'inherit', textDecoration: 'inherit'}}
					>
						Landing
					</Link>
				</div>
			</nav>
    </div>
  );
};
