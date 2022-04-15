import { getPublicUrl } from "../../env";

const publicUrl = getPublicUrl();

export function Error() {
  return (
    <div className="error-page">
			<img
				src={`${publicUrl}/error/fire.png`}
				className="error-page___img"
				alt="fire"
			/>
			<div className="error-page__text">
				<h1>{"Oops"}</h1>
				<p>{"Something went terribly wrong"}</p>
			</div>
    </div>
  );
};
