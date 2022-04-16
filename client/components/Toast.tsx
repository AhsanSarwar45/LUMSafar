import { Box, useTheme, useToast } from 'native-base';
import React from 'react';

export const ShowToast = (toast: any, label: string, type: 'success' | 'failure') => {
	toast.show({
		render: () => {
			return (
				<Box
					_text={{ color: 'white' }}
					bg={type === 'success' ? 'emerald.500' : 'red.500'}
					px="3"
					py="2"
					rounded={'2xl'}
					mb={10}
				>
					{label}
				</Box>
			);
		}
	});
};
