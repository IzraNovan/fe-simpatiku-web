import { renderToString } from 'react-dom/server';
import { Controller } from 'react-hook-form';
import { FilePond, registerPlugin } from 'react-filepond';
import Image from 'next/image';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginPdfPreview from 'filepond-plugin-pdf-preview';
import upload from '@public/assets/icon/upload.png';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateSize,
	FilePondPluginFileValidateType,
	FilePondPluginPdfPreview
);

function FileUpload({
	id,
	label,
	maxSize = '5MB',
	name,
	control,
	errors,
	customError,
	required,
	errorMessage,
	helperText = 'Format .PDF, .JPG, .JPEG, .PNG (Max. 5MB)',
	...rest
}) {
	const inputErrors = customError || errors?.[name];

	return (
		<div className='flex-column gap-2 w-full mt-4'>
			<label className='font-semibold text-fade-black' htmlFor={id}>
				{label}
			</label>

			<Controller
				name={name}
				control={control}
				rules={{ required }}
				render={({ field: { value, onChange } }) => (
					<FilePond
						{...rest}
						id={id}
						files={value}
						onupdatefiles={(image) => {
							onChange(image.map((img) => img.file));
						}}
						className='file-uploader'
						allowMultiple={false}
						checkValidity={true}
						maxFileSize={maxSize}
						labelIdle={renderToString(
							<div className='flex-column gap-2 w-full h-[292px] bg-white rounded-lg filepond--label-action'>
								<div className='flex gap-2 justify-center items-center'>
									<Image
										src={upload}
										width={16}
										height={16}
										alt='upload'
									/>
									<p className='font-semibold text-dark-blue'>
										Upload File
									</p>
								</div>
								<p className='text-slate-500 font-light max-sm:text-center max-sm:text-base filepond--label-description'>
									{helperText}
								</p>
							</div>
						)}
					/>
				)}
			/>
			{inputErrors && (
				<p
					className={`text-error/50 text-sm ${
						!inputErrors && 'hidden'
					}`}>
					{inputErrors?.message || errorMessage}
				</p>
			)}
		</div>
	);
}

export default FileUpload;
