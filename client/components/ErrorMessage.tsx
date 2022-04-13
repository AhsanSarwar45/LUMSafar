import { Text } from 'native-base';

interface ErrorMessageProps {
	show: boolean;
	children: React.ReactNode;
	fontSize: number | string;
	textAlign: any;
}

const ErrorMessage = (props: ErrorMessageProps) => {
	return props.show ? (
		<Text width="full" textAlign={props.textAlign} color="red.500" fontSize={props.fontSize}>
			{props.children}
		</Text>
	) : null;
};

ErrorMessage.defaultProps = { fontSize: 'sm', textAlign: 'left' };

export default ErrorMessage;
