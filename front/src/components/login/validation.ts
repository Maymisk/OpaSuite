import * as yup from 'yup';

const validation = yup.object({
	email: yup
		.string()
		.email('Insira um email válido')
		.required('Insira um email.'),
	password: yup.string().required('Digite a senha.'),
});

export { validation };
