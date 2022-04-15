import { getPublicUrl } from "../../env";

const publicUrl = getPublicUrl();

export function ErrorNotFound() {
  return (
    <div className="error-page-404">
			<img
				src={`${publicUrl}/error/gandalf.png`}
				className="error-page-404___img"
				alt="gandalf"
			/>
			<div className="error-page-404__text">
				<h1>{"404"}</h1>
				<p>{"Sorry, we could not find your page"}</p>
			</div>
    </div>
  );
};
