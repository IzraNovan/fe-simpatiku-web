'use client';
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

import { useMemo, useState } from 'react';

import { has } from 'lodash/object';
import { request } from '@utils/request';
import axios from 'axios';
import { useStateContext } from '@context/StateContext';
import { useSearchParams } from 'next/navigation';

function isFile(item) {
	return item instanceof File;
}

function getPointInitialValue(value) {
	return null;
}

registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateSize,
	FilePondPluginFileValidateType,
	FilePondPluginPdfPreview
);

function getRequestByMethod(method = 'POST') {
	const methodLower = method.toLowerCase();
	if (method == 'post') {
	} else if (method == 'get') {
	} else if (method == 'patch') {
	} else if (method == 'put') {
	}
}

function FileUpload({
	id,
	label,
	maxSize = '5MB',
	name,
	control,
	url,
	errors,
	customError,
	required,
	method = 'POST',
	errorMessage,
	helperText = 'Format .PDF, .JPG, .JPEG, .PNG (Max. 5MB)',
	...rest
}) {
	const { setFileLoad } = useStateContext() ?? {};
	const query = useSearchParams();
	const repairID = query.get('repair') ?? '';

	const inputErrors = customError || errors?.[name];
	const $xthis = useMemo(() => {
		const xthis = {
			value: null,
			name,
			onUpdateFiles:
				(getValue, onChange, $innerthis) => async (files) => {
					if (!repairID) setFileLoad(true);

					const filteredFiles = files?.map((elem) => {
						if (isFile(elem?.file)) return elem?.file;
						return elem.source;
					});

					if (filteredFiles?.length > 0) {
						// const data = await exifreader.load(filteredFiles[0]);
						// console.log("geoimage, exifreader data", data);
						var lat,
							lng,
							point = {};

						const pointIsNull =
							point.lng == null || point.lat == null;
						const newVal = filteredFiles.map((item, index) => {
							const value = $innerthis.value?.[index];

							if (
								(item instanceof File &&
									value != null &&
									(item.hasId != null || value?.data?.id != null)) ||
								(typeof item == 'string' && value?.data?.id != null)
							) {
								return { ...value };
							}

							const file = item;
							if (typeof item == 'object') {
								item.hasId = true;
							}
							// console.log("file async upload, onChange update, item, ", file);
							return {
								data: { file: null, id: null },
								file: file,
							};
						});
						// console.log("file newVal", newVal);
						onChange(newVal);
						$innerthis.value = newVal;
					} else {
						onChange([]);
						$innerthis.value = [];
						setFileLoad(false);
					}
				},
		};
		return xthis;
	}, []);
	// console.log("$xthis,", $xthis);
	const [showLocation, setShowLocation] = useState(false);

	function onCloseLocation() {
		setShowLocation(false);
	}

	function onSubmitLocation(getValue, onChange) {
		return (pointMarker) => {
			const value = getValue();
			onChange([
				{
					...value,
					point: pointMarker,
				},
			]);
			setShowLocation(false);
		};
	}

	return (
		<div className='flex-column gap-2 w-full mt-4'>
			<label className='font-semibold text-fade-black' htmlFor={id}>
				{label}
			</label>

			<Controller
				name={name}
				control={control}
				rules={{ required }}
				render={({ field: { value, onChange } }) => {
					const $innerthis = useMemo(
						() => ({
							value: value,
						}),
						[]
					);
					$innerthis.value = value;
					return (
						<>
							<FilePond
								{...rest}
								id={id}
								files={
									!Array.isArray(value)
										? []
										: value.map((item) => {
												// console.log("images on input", item);
												return {
													source: item.file,
													...(item.image != null ||
													typeof item.file == 'string'
														? {
																options: {
																	type: 'local',
																},
														  }
														: {}),
												};
										  })
								}
								server={{
									process: (
										fieldName,
										file,
										metadata,
										load,
										error,
										progress,
										abort,
										transfer,
										options
									) => {
										// console.log('console.log process, ', file, url);
										const controller = new AbortController();
										const body = new FormData();
										body.append('file', file, file.name);
										var req;
										if (typeof url == 'string') {
											req = request({
												method: method.toLowerCase(),
												url: url,
												data: body,
												responseType: 'json',
												timeout: 60 * 1000,
												onUploadProgress: (ev) => {
													progress(ev.progress, ev.loaded, ev.total);
												},
												signal: controller.signal,
											});
										} else if (typeof url == 'function') {
											req = request({
												method: method.toLowerCase(),
												url: url(),
												data: body,
												responseType: 'json',
												timeout: 60 * 1000,
												onUploadProgress: (ev) => {
													progress(ev.progress, ev.loaded, ev.total);
												},
												signal: controller.signal,
											});
										} else if (reqFunc != null) {
											req = reqFunc(
												file,
												load,
												error,
												progress,
												controller
											);
										} else {
											throw 'props url is not valid argument, use string or function, or use reqFunc props to pass request';
										}

										req
											.then(
												(resp) => {
													const value = $innerthis.value;
													const xvalue = value?.[0];
													// console.log("geoimage, result, ", resp?.data);
													load({
														source: resp.data.file,
													});
													const updateValue = {
														...(xvalue ?? {}),
														data: { ...resp.data },
													};
													// console.log("file async upload, updateValue process", updateValue, $xthis.value, xvalue);
													onChange([updateValue]);
												},
												(err) => {
													error(err);
													console.log(
														'geoimage, error, upload filepond',
														err
													);
													// onChange(null);
													// $xthis.value = null;
												}
											)
											.finally(() => setFileLoad(false));

										return {
											abort: () => {
												controller.abort();
												abort();
												onChange(null);
												$innerthis.value = null;
											},
										};
									},
									load: function (
										source,
										load,
										error,
										progress,
										abort
									) {
										// console.log("file async",source);
										if (source instanceof File) {
											load(source);
										}

										const controller = new AbortController();
										fetch(source, {
											// url: ,
											method: 'GET',
											timeout: 60 * 1000,
											// responseType: "blob",
											// onUploadProgress:
											//   (ev) => {
											//     // console.log("onUploadProgress", ev);
											//     progress(ev.progress, ev.loaded, ev.total);
											//   },
											// signal: controller.signal,
										})
											.then(
												async (resp) => {
													const fileResp = await resp.blob();
													// console.log("response",resp, fileResp);
													const file = new File(
														[fileResp],
														url?.split('/').pop(),
														{ type: fileResp.type }
													);
													load(fileResp);
												},
												(err) => {
													console.log('err', err);
													error(err);
												}
											)
											.finally(() => setFileLoad(false));

										return {
											abort: () => {
												controller.abort();
												abort();
											},
										};
									},
								}}
								// onupdatefiles={(image) => {
								//   onChange(image.map((img) => img.file));
								// }}
								onupdatefiles={$xthis.onUpdateFiles(
									() => value,
									onChange,
									$innerthis
								)}
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
						</>
					);
				}}
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
