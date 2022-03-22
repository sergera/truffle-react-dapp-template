import openNewTab from "../../utils/browser/openNewTab";
import contacts from "../../utils/data/contacts";

const publicUrl = process.env.PUBLIC_URL;

function Footer() {

  return (
    <div className="footer">
			<div className="footer__social">
				<p className="footer__text">Get to know me:</p>
				<div className="footer__icons">
					<img
						src={`${publicUrl}/icons/github_white_150x150.png`}
						onClick={() => openNewTab(contacts.github)}
						className="footer__icon"
					/>
					<img
						src={`${publicUrl}/icons/linkedin_white_150x150.png`}
						onClick={() => openNewTab(contacts.linkedin)}
						className="footer__icon"
					/>
					<img
						src={`${publicUrl}/icons/instagram_white_150x150.png`}
						onClick={() => openNewTab(contacts.instagram)}
						className="footer__icon"
					/>
					<img
						src={`${publicUrl}/icons/twitter_white_150x150.png`}
						onClick={() => openNewTab(contacts.twitter)}
						className="footer__icon"
					/>
				</div>
			</div>
			<div className="footer__social">
				<p className="footer__text">Hire me:</p>
				<div className="footer__icons">
					<a 
						href={`mailto:${contacts.email}`} 
						target="_blank" 
						rel="noopener noreferrer"  
						className="footer__email-anchor"
					>
						<img
								src={`${publicUrl}/icons/email_white_150x150.png`}
								className="footer__icon"
						/>
					</a>
				</div>
			</div>
    </div>
  );
};

export default Footer;
