<script>
	import { onMount } from 'svelte';
	import { emailValidator, requiredValidator } from '../common/validator';
	import { sendEmail } from '../services/email';
	let form = {};

	let STATE = {
		send: {
			isSent: false,
			success: false
		},
		validationErrors: []
	};

	onMount(() => {
		loadRecapatcha();
		if (window != undefined) {
			window.handleSubmit = handleSubmit;
		}
	});

	async function handleSubmit(token) {
		await sendEmail(form, token)
			.then((data) => {
				STATE.send.isSent = true;
				STATE.send.success = data.success;
			})
			.catch((err) => {
				STATE.send.isSent = true;
			});
	}

	const validate = (event) => {
		event.preventDefault();
		let validationResult = {
			errors: [],
			isValid: true
		};
		if (!emailValidator(form.email)) {
			validationResult.errors.push('email');
			validationResult.isValid = false;
		}

		if (!requiredValidator(form.name)) {
			validationResult.errors.push('name');
			validationResult.isValid = false;
		}
		if (!requiredValidator(form.message)) {
			validationResult.errors.push('message');
			validationResult.isValid = false;
		}

		if (validationResult.isValid) {
			STATE.validationErrors = [];
			grecaptcha.execute();
		} else {
			validationResult.errors.forEach((error) => {
				STATE.validationErrors[error] = true;
			});
		}
	};

	function loadRecapatcha() {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://www.google.com/recaptcha/api.js';
		document.getElementsByTagName('head')[0].appendChild(script);
	}
</script>

<svelte:head>
	<title>Daniel Dias | Contact</title>
</svelte:head>

<div class="contact-wrapper">
	<div class="container">
		<div class="contact-grid">
			<div class="image-wrapper">
				<h2>Contact Me</h2>
				<div class="content">
					<p>Feel free to contact me at any time!</p>
				</div>
				<img class="img-fluid" src="/images/undraw_mail_2_tqip.svg" alt="" />
			</div>
			<div class="form-wrapper">
				<form role="form" name="contactForm" class="contact-form row">
					<div class="col-md-6">
						{#if STATE.validationErrors['name']}
							<div class="help-block with-errors">Please insert your name.</div>
						{/if}
						<input type="text" id="name" placeholder="Name" bind:value={form.name} />
					</div>
					<div class="col-md-6">
						{#if STATE.validationErrors['email']}
							<div class="help-block with-errors">Please insert your email.</div>
						{/if}
						<input
							type="text"
							id="email"
							bind:value={form.email}
							aria-describedby="emailHelp"
							placeholder="Email"
						/>
					</div>
					<div class="col-12">
						<input
							type="text"
							id="subject"
							name="subject"
							bind:value={form.subject}
							placeholder="Subject"
						/>
					</div>
					<div class="col-12">
						<textarea id="message" placeholder="Message" rows="4" bind:value={form.message} />
						{#if STATE.validationErrors['message']}
							<div class="help-block with-errors">Please insert a message.</div>
						{/if}
					</div>

					{#if STATE.send.isSent}
						{#if STATE.send.success}
							<div id="sendmessage">Your message was sent successfully, Thank you!</div>
						{:else}
							<div class="with-errors">
								An error occurred while sending the email, please try again or contact me using your <a
									class="no-link"
									target="_blank"
									href="mailt&#111;&#58;&#37;64a&#110;%69%&#54;5&#108;%&#55;2&#109;di%61&#115;&#64;&#104;%6&#70;t&#37;6Da&#105;&#37;6C&#46;co&#109;"
									>email</a
								> service. Thank you!
							</div>
						{/if}
					{/if}
					<div class="col-12">
						<div
							id="recaptcha"
							class="g-recaptcha"
							data-sitekey="6Lcg-mEaAAAAAELYI_20jsxCmPIJXjSQE-DzYfmZ"
							data-callback="handleSubmit"
							data-size="invisible"
						/>
						<button id="submit" type="submit" on:click={(event) => validate(event)}>
							<div>
								<i class="icon fas fa-paper-plane" />
							</div>
							<p>Send Message</p></button
						>
					</div>
				</form>
			</div>
		</div>
		<div class="quote">
			<blockquote>
				<p class="subtitle">"The best way to predict the future is to invent it."</p>
				<cite>Alan Kay</cite>
			</blockquote>
		</div>
	</div>
</div>

<style>
	.quote {
		display: flex;
		align-items: center;
		overflow: hidden;
		margin-top: 4rem;
	}
	blockquote {
		color: #666;
		margin: 0 auto;
		font-size: 1rem;
	}

	blockquote p {
		font-style: italic;
		font-size: 1.3rem;
		margin-bottom: 0;
	}

	.img-fluid {
		max-width: 100%;
		height: 100%;
	}
	.contact-wrapper {
		display: flex;
		flex-grow: 1;
		flex-shrink: 0;
		padding: 3rem 1.5rem 1.5rem 1.5rem;
	}

	.image-wrapper {
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-ms-flex-align: center;
		-webkit-align-items: center;
		-webkit-box-align: center;
		align-items: center;
		flex-direction: column;
	}

	.contact-grid {
		display: grid;
		column-gap: 40px;
		row-gap: 10px;
	}

	@media (min-width: 600px) {
		.contact-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.image-wrapper {
			margin-bottom: 40px;
		}
	}

	@media screen and (max-width: 1024px) {
		.contact-grid {
			display: flex;
			flex-direction: column;
		}
		.contact-wrapper {
			padding-top: 1rem;
		}

		.img-fluid {
			visibility: hidden;
			display: none;
		}
	}

	.contact-grid h2 {
		line-height: 1.2;
		font-weight: 600;
		font-size: 40px;
		margin: 10px 0;
		color: var(--american-blue);
	}

	.contact-wrapper .content p {
		margin: 0;
	}
	.contact-wrapper .content {
		color: #666;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: 1.7;
		margin-bottom: 0.5em;
	}

	.contact-wrapper .form-wrapper {
		box-shadow: 0 0 20px rgb(0 0 0 / 16%);
		background-color: white;
		padding: 2.5em;
		border-radius: 15px !important;
	}

	@media (min-width: 1200px) {
		.contact-wrapper .form-wrapper {
			padding: 3.5em 2.5em;
		}
	}

	.contact-form input,
	.contact-form textarea {
		height: 50px;
		margin-bottom: 1.5rem !important;
		display: block;
		width: 100%;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		color: #495057;
		background-color: var(--light);
		border: 1px solid var(--light);
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		font-family: 'Neutra', sans-serif;
	}

	.contact-form input:focus,
	.contact-form textarea:focus {
		outline: 0;
		box-shadow: none;
		border-color: var(--orange);
	}

	.contact-form button {
		border: none;
		box-shadow: 0 0 20px rgb(0 0 0 / 16%);
		background-color: white;
		border-radius: 2px;
		display: flex;
		justify-content: flex-end;
		cursor: pointer;
		min-height: 2.75em;
		align-items: center;
		border-radius: 3px;
		padding: 0 3px 0 0;
		float: right;
		margin: 10px;
	}

	.contact-form button p {
		margin: 0 0 0 0.75em;
		font-size: 1.25em;
		padding: 10px;
		transition: all 0.2s ease-in-out;
	}

	.contact-form button:hover p {
		color: var(--magic-potion);
	}

	.contact-form button div {
		width: 3em;
		height: 3em;
		background-color: var(--magic-potion);
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border-radius: 3px;
		transition: all 0.2s ease-in-out;
	}

	.contact-form .icon {
		margin-left: 0.55em;
		width: 1.6em;
		height: 1.6em;
		color: white;
	}

	.col-12 {
		-ms-flex: 0 0 100%;
		flex: 0 0 100%;
		max-width: 100%;
	}

	@media (min-width: 768px) {
		.col-md-6 {
			-ms-flex: 0 0 50%;
			flex: 0 0 50%;
			max-width: 50%;
		}
	}

	.contact-form textarea {
		height: 150px;
	}

	div[class^='col-'] {
		position: relative;
		width: 100%;
		min-height: 1px;
		padding-right: 15px;
		padding-left: 15px;
		box-sizing: border-box;
	}

	div[class^='col-'] > input,
	div[class^='col-'] > textarea {
		box-sizing: border-box;
	}
	.with-errors {
		color: red;
	}

	:global(.grecaptcha-badge) {
		margin-bottom: 40px;
	}

	#sendmessage {
		color: green;
	}
</style>
