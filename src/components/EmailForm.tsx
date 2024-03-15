import SampleEmail from "../emails/SampleEmail";




export const EmailForm = () => {

	const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { name, email } = Object.fromEntries(formData);

		
		try{
			const res = await fetch("/api/sendEmail.json", {
				method: "POST",
				headers: {
					"Content-Type" : "application/json"
				},
				body: JSON.stringify({
					from: 'Acme <onboarding@resend.dev>',
					to: email,
					subject: `Sample${name}`,
					html: "<p>Hi</p>",
					text: 'Hi',
				}),
			});
			const data = await res.json();
			console.log(data)
		}catch(e){
			console.error(e)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" required name="name" placeholder="name" />
				<input type="email" required name="email" placeholder="email" />
				<input type="submit" value="Send Email" />
			</form>
		</div>
	);
};

export default EmailForm;