
import SampleEmail from "../emails/SampleEmail";
import { render } from "@react-email/render";




export const EmailForm = () => {

	const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { name, email } = Object.fromEntries(formData);

		const finalHtml = render(<SampleEmail userFirstname={ name as string }/>, {
			pretty: true,
		});

		const finalText= render(<SampleEmail userFirstname={name as string} />, {
			plainText:true,
		});

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
					html: finalHtml,
					text: finalText
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