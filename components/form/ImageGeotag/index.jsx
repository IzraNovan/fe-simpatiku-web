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
import ModalLocation from './ModalLocation';
import { useMemo, useState } from 'react';
import * as exifreader from 'exifreader';
// import { DMS2Decimal } from 'dms-to-decimal';
import { has } from 'lodash/object';
import { request, requestVanilla } from '@utils/request';
import { convertDMSToDD } from '@utils/helper';
import { toast } from 'react-hot-toast';
import { useStateContext } from '@context/StateContext';
import { useSearchParams } from 'next/navigation';

function isFile(item) {
	return item instanceof File;
}

function getPointInitialValue(value) {
	if (
		Array.isArray(value) &&
		value[0] != null &&
		value[0].point != null &&
		value[0].point.lng != null &&
		value[0].point.lat != null
	) {
		return value[0].point;
	} else {
		return null;
	}
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

function ImageGeotag({
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
	helperText = 'Pastikan file memiliki atribut geolocation!',
	...rest
}) {
	const { setFileLoad } = useStateContext() ?? {};
	const query = useSearchParams();
	const repairID = query.get('repair') ?? '';

	const inputErrors = customError || errors?.[name];
	const $this = useMemo(() => {
		const xthis = {
			value: null,
			name,
			onUpdateFiles:
				(getValue, onChange, $ythis) => async (files) => {
					if (!repairID) setFileLoad(true);

					const filteredFiles = files?.map((elem) => {
						if (isFile(elem.file)) return elem?.file;
						return elem.source;
					});

					if (filteredFiles?.length > 0) {
						const data = await exifreader.load(filteredFiles[0]);
						var lat,
							lng,
							point = {};
						if (
							has(data, 'GPSLatitude') &&
							has(data, 'GPSLatitudeRef') &&
							has(data, 'GPSLongitude') &&
							has(data, 'GPSLongitudeRef')
						) {
							lat = convertDMSToDD(
								data?.GPSLatitude.value[0][0] /
									data?.GPSLatitude.value[0][1],
								data?.GPSLatitude.value[1][0] /
									data?.GPSLatitude.value[1][1],
								data?.GPSLatitude.value[2][0] /
									data?.GPSLatitude.value[2][1],
								data?.GPSLatitudeRef.value[0]
							);
							lng = convertDMSToDD(
								data?.GPSLongitude.value[0][0] /
									data?.GPSLongitude.value[0][1],
								data?.GPSLongitude.value[1][0] /
									data?.GPSLongitude.value[1][1],
								data?.GPSLongitude.value[2][0] /
									data?.GPSLongitude.value[2][1],
								data?.GPSLongitudeRef.value[0]
							);

							point = {
								lng,
								lat,
							};
						}

						const pointIsNull =
							point.lng == null || point.lat == null;
						const newVal = filteredFiles.map((item, index) => {
							const value = $ythis.value?.[index];
							// console.log("geoimage, onchange map, ", item, item.file_id, value);

							if (
								(item instanceof File &&
									item.hasId != null &&
									value != null) ||
								(typeof item == 'string' && value?.image?.id != null)
							) {
								return { ...value };
							}
							// const file = new FileInternal(item);
							const file = item;
							if (typeof item == 'object') {
								item.hasId = true;
							}
							// console.log("geoimage, onChange update, item, ", file);
							return {
								image: { file: null, id: null },
								file: file,
								point: pointIsNull ? null : point,
							};
						});
						// console.log("newVal, ", newVal);
						onChange(newVal);
						$ythis.value = newVal;
					} else {
						onChange([]);
						$ythis.value = [];
						setFileLoad(false);
					}
				},
		};
		return xthis;
	}, []);

	const [showLocation, setShowLocation] = useState(false);

	function onCloseLocation() {
		setShowLocation(false);
	}

	function onSubmitLocation(getValue, onChange) {
		return (pointMarker) => {
			const value = getValue();
			onChange([{ ...value[0], point: pointMarker }]);
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
					const $ythis = useMemo(
						() => ({
							value: null,
						}),
						[]
					);
					$ythis.value = value;
					return (
						<>
							{value != null ? (
								<div className='flex justify-end'>
									<button
										className='float-right mb-4 px-3 btn-submit rounded-2 rounded-md'
										type='button'
										onClick={() => {
											setShowLocation(true);
										}}>
										Lihat Lokasi
									</button>
								</div>
							) : null}

							<ModalLocation
								show={showLocation}
								disabled
								handleClose={onCloseLocation}
								handleSubmit={onSubmitLocation(() => value, onChange)}
								initialMarker={getPointInitialValue(value)}
							/>

							<FilePond
								{...rest}
								id={id}
								files={
									!Array.isArray(value)
										? []
										: value.map((item) => {
												return {
													source: item.file,
													...(item.image == null
														? {}
														: {
																options: {
																	type: 'local',
																},
														  }),
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
										const controller = new AbortController();
										function restFlow() {
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
														progress(
															ev.progress,
															ev.loaded,
															ev.total
														);
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
														progress(
															ev.progress,
															ev.loaded,
															ev.total
														);
													},
													// signal: controller.signal,
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
														const xvalue = $ythis.value?.[0];
														// console.log("geoimage, result, ", resp?.data);
														load({
															source: resp.data.file,
														});
														const updateValue = {
															...(xvalue ?? {}),
															image: { ...resp.data },
														};
														// console.log("geoimage, updateValue process", updateValue);
														onChange([updateValue]);
														$ythis.value = [updateValue];
													},
													(err) => {
														error(err);
														// console.log("geoimage, error, upload filepond", err);
													}
												)
												.finally(() => setFileLoad(false));
										}

										const value = $ythis.value;
										const point = getPointInitialValue(value);
										if (
											point != null &&
											point.lng != null &&
											point.lat != null
										) {
											requestVanilla({
												url: '/siap/peta/intersect-check/',
												method: 'POST',
												data: {
													geometry: {
														type: 'point',
														coordinates: [point.lng, point.lat],
													},
												},
												timeout: 60 * 1000,
												responseType: 'json',
												signal: controller.signal,
											}).then(
												(resp) => {
													// const resp = ;
													if (
														resp.data.msg ==
														'Data tidak bersinggungan dengan peta lain.'
													) {
														toast.success(
															`${label}: Gambar dan Geotagging dapat digunakan`
														);
														restFlow();
													} else {
														error();
														toast.errror(
															`Lokasi anda bersinggungan dengan area ${resp?.errors?.join(
																', '
															)}`
														);
													}
												},
												(err) => {
													error();
													onChange(null);
													if (
														err.response != null &&
														err.response.status == 400
													) {
														const resp = err.response.data;

														if (
															Array.isArray(resp?.errors) &&
															resp?.errors[0] != null
														) {
															// console.log("geolocation, msg, ", resp.data);
															toast.error(
																`${label}: mengalami error pengecekan; ${resp?.errors?.join(
																	', '
																)}`
															);
															return;
														}
													}
													// console.log(err);
													toast.error(
														`${label}: Terjadi Kesalahan dalam pengecekan`
													);
												}
											);
										} else {
											error();
											onChange(null);
											toast.error(
												`${label}: Gambar yang diinputkan tidak memiliki metadata Geotagging, silahkan ambil kembali gambar dengan menghidupkan Geotagging.`
											);
										}

										return {
											abort: () => {
												abort();
												controller.abort();
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
										if (source instanceof File) {
											load(source);
											return;
										}

										const controller = new AbortController();
										// console.log("request source geotag, ",source);
										fetch(source, {
											method: 'GET',
											timeout: 60 * 1000,
											// responseType: 'blob',
											// onUploadProgress: (ev) => {
											// 	// console.log("onUploadProgress", ev);
											// 	progress(ev.progress, ev.loaded, ev.total);
											// },
											signal: controller.signal,
										})
											.then(
												async (resp) => {
													const fileResp = await resp.blob();
													const file = new File(
														[fileResp],
														url?.split('/').pop(),
														// "filename",
														{ type: fileResp.type }
													);
													load(file);
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
								onupdatefiles={$this.onUpdateFiles(
									() => value,
									onChange,
									$ythis
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
											{helperText
												? helperText
												: 'Pastikan file memiliki atribut geolocation!'}
										</p>
									</div>
								)}
							/>
						</>
					);
				}}
			/>
			{inputErrors && (
				<p className={`text-error/50 ${!inputErrors && 'hidden'}`}>
					{inputErrors?.message || errorMessage}
				</p>
			)}
		</div>
	);
}

export default ImageGeotag;
