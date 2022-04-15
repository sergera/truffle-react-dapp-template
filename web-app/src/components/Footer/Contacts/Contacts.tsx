import { getPublicUrl } from "../../../env";
import { newTab } from "../../../browser/open";

import { contacts } from "./Contacts.constants";

const publicUrl = getPublicUrl();

export function Contacts() {

  return (
    <div className="contacts">
			<div className="contacts__social">
				<p className="contacts__text">Get to know me:</p>
				<div className="contacts__icons">
					<img
						src={`${publicUrl}/social/github_white_150x150.png`}
						onClick={() => newTab(contacts.github)}
						className="contacts__icon"
						alt="link to author's github"
					/>
					<img
						src={`${publicUrl}/social/linkedin_white_150x150.png`}
						onClick={() => newTab(contacts.linkedin)}
						className="contacts__icon"
						alt="link to author's linkedin"
					/>
					<img
						src={`${publicUrl}/social/instagram_white_150x150.png`}
						onClick={() => newTab(contacts.instagram)}
						className="contacts__icon"
						alt="link to author's instagram"
					/>
					<img
						src={`${publicUrl}/social/twitter_white_150x150.png`}
						onClick={() => newTab(contacts.twitter)}
						className="contacts__icon"
						alt="link to author's twitter"
					/>
				</div>
			</div>
			<div className="contacts__social">
				<p className="contacts__text">Hire me:</p>
				<div className="contacts__icons">
					<a 
						href={`mailto:${contacts.email}`} 
						target="_blank" 
						rel="noopener noreferrer"  
						className="contacts__email-anchor"
					>
						<img
								src={`${publicUrl}/social/email_white_150x150.png`}
								className="contacts__icon"
								alt="e-mail author with default e-mail application"
						/>
					</a>
				</div>
			</div>
    </div>
  );
};
