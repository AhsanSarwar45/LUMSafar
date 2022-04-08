import { Text } from 'native-base';

interface ErrorMessageProps {
	show: boolean;
	children: React.ReactNode;
	fontSize?: any;
}

const ErrorMessage = (props: ErrorMessageProps) => {
	return props.show ? (
		<Text width="full" color="red.500" fontSize={props.fontSize}>
			{props.children}
		</Text>
	) : null;
};

ErrorMessage.defaultProps = { fontSize: 'sm' };

export default ErrorMessage;
