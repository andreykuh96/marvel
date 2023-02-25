import error from './error.gif';

const ErrorMessage = () => {
	return (
		<img style={{width: '200px', height: '200px', objectFit: 'contain', display: 'block', margin: '0 auto'}} src={error} alt="error" />
	);
};

export default ErrorMessage;