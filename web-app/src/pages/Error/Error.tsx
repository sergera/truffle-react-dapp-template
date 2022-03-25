const publicUrl = process.env.PUBLIC_URL;

function Error() {
  return (
    <div className="error-page">
			<img
				src={`${publicUrl}/error/fire.png`}
				className="error-page___img"
			/>
			<div className="error-page__text">
				<h1>{"Oops"}</h1>
				<p>{"Something went terribly wrong"}</p>
			</div>
    </div>
  );
};

export default Error;
