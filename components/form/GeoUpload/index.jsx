import { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

const GeoInput = ({ onChange, value, handleClose, ...rest }) => {
	const ref = useRef(null);
	const [selectedFile, setSelectedFile] = useState(value);

	const handleChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			if (!file.content) {
				const reader = new FileReader();
				reader.onload = () => {
					file.content = reader.result;
					setSelectedFile(file);

					if (onChange) {
						onChange(file);
					}
				};
				reader.readAsText(file);
			} else {
				setSelectedFile(file);

				if (onChange) {
					onChange(file);
				}
			}
		} else {
			setSelectedFile(null);

			if (onChange) {
				onChange(null);
			}
		}

		// Reset value to trigger onChange for the same file
		event.target.value = null;
	};

	const handleBlob = () => {
		ref.current.click();
	};
	const getFileName = () => {
		if (selectedFile) {
			return selectedFile.name;
		}
		return '';
	};

	const onClose = () => {
		setSelectedFile(null);
	};

	return (
		<>
			<Form.Control
				{...rest}
				onChange={handleChange}
				ref={ref}
				type='file'
				hidden
				accept='.geojson'
			/>
			<div
				className='form-control flex items-center p-0 border rounded-md relative'
				style={{ height: '50px' }}>
				<div
					onClick={handleBlob}
					className='bg-gray-200 h-full px-4 flex items-center cursor-pointer whitespace-nowrap text-sm'>
					Pilih File
				</div>
				<div
					title={getFileName()}
					className='text-xs text-truncate h-full flex items-center px-2 bg-white whitespace-nowrap overflow-hidden line-clamp-1'>
					{getFileName()}
				</div>

				{selectedFile != null ? (
					<span
						onClick={() => {
							onClose();
							handleClose && handleClose();
						}}
						className='text-center bg-gray-200 bg-red-200-hover flex justify-center items-center cursor-pointer absolute -top-2 -right-2'
						style={{
							borderRadius: '50%',
							height: '20px',
							width: '20px',
						}}>
						<X />
					</span>
				) : null}
			</div>
		</>
	);
};

export default GeoInput;
