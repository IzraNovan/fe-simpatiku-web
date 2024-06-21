'use client';
import { useEffect, useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
import {
	MapContainer,
	useMap,
	useMapEvent,
	TileLayer,
	Marker,
} from 'react-leaflet';
import { URL_MAP, DEFAULT_CENTER } from 'utils/constant';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PinMarker from '../../../public/assets/img/pin-marker.png';
import { requestVanilla } from '@utils/request';
import { toast } from 'react-hot-toast';

function PointSelect({
	marker,
	onSelect,
	isLoading: isLoadingHook,
	isError: isErrorHook,
	disabled,
}) {
	const [isLoading, setIsLoading] = isLoadingHook;
	const [_isError, setIsError] = isErrorHook;
	const map = useMap();

	useEffect(() => {
		if (disabled != true) {
			map.on('dblclick', (ev) => {
				if (isLoading) {
					return;
				}
				const prevMarker = marker;
				onSelect(ev.latlng);
				const point = ev.latlng;
				setIsLoading(true);
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
				})
					.then(
						(resp) => {
							if (
								resp.data.msg ==
								'Data tidak bersinggungan dengan peta lain.'
							) {
								toast.success('Lokasi dapat digunakan');
								setIsError(false);
							} else {
								setIsError(true);
								// console.log("geolocation, msg, ", resp.data);
								toast.error(
									`Geolokasi yang anda pilih, mengalami error pengecekan: `
								);
							}
						},
						(err) => {
							setIsError(true);
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
										`Geolokasi yang anda pilih, mengalami error pengecekan: ${resp?.errors[0]}`
									);
									return;
								}
							}
							console.log(err);
							toast.error('Terjadi Kesalahan dalam pengecekan');
							// setIsError(true);
						}
					)
					.finally(() => {
						setIsLoading(false);
					});
			});
		}
	}, [map != null]);

	if (marker == null) {
		return null;
	} else {
		return (
			<Marker
				position={marker}
				icon={L.icon({
					iconUrl: PinMarker.src,
					iconRetinaUrl: PinMarker.src,
					iconSize: [26, 32],
					iconAnchor: [16, 32],
					popupAnchor: [0, -32],
				})}
			/>
		);
	}
}

function SetCenter({ center }) {
	const map = useMap();
	useEffect(() => {
		if (center != null) {
			// console.log("geoimage, center, ", center);
			map.setView(center, 9);
		}
	}, [JSON.stringify(center)]);

	return null;
}

export default function ModalLocation({
	initialMarker,
	handleClose,
	handleSubmit,
	show,
	disabled,
}) {
	// console.log("geoimage, initialMarker", initialMarker);
	const [isLoading, setIsLoading] = useState(false);
	const [marker, setMarker] = useState(initialMarker);
	const [center, setCenter] = useState(DEFAULT_CENTER);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		setMarker(initialMarker);
		if (
			show == true &&
			initialMarker != null &&
			initialMarker.lng != null &&
			initialMarker.lat != null
		) {
			setCenter([initialMarker.lat, initialMarker.lng]);
		} else {
			setCenter(DEFAULT_CENTER);
		}
	}, [show, JSON.stringify(initialMarker)]);

	// console.log("geoimage, marker center, ", initialMarker, center);
	return (
		<Modal show={show} size='xl'>
			<div style={{ width: '900px', height: '600px' }}>
				<MapContainer
					style={{
						width: '100%',
						borderRadius: '0.75rem 0.75rem 0rem 0rem',
						height: '600px',
					}}
					center={center}
					zoomControl
					zoom={9}>
					<SetCenter center={center} />
					<PointSelect
						disabled={disabled}
						isLoading={[isLoading, setIsLoading]}
						isError={[isError, setIsError]}
						onSelect={(latlng) => setMarker(latlng)}
						marker={marker}
					/>

					<TileLayer url={URL_MAP.HYBRID_GOOGLE} />
				</MapContainer>
			</div>
			<div className='p-3 bt-2 bt-gray-500 flex justify-end'>
				<button
					className='bg-red-500 text-white p-2 px-5 rounded-md btn'
					onClick={handleClose}>
					{disabled ? 'Tutup' : 'Batal'}
				</button>
				{disabled ? null : (
					<button
						disabled={isLoading || isError}
						className='bg-blue-700 p-2 px-3 rounded-md ml-2 text-white'
						onClick={() => handleSubmit(marker)}>
						Pilih Lokasi
					</button>
				)}
			</div>
		</Modal>
	);
}

function Modal({
	show,
	onHide,
	buttonClose = true,
	closeBackdrop = false,
	className,
	children,
}) {
	useEffect(() => {
		if (show) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [show]);

	if (!show) {
		return null;
	}

	const handleBackdropClick = () => {
		if (closeBackdrop) {
			onHide();
		}
	};

	const handleContentClick = (e) => {
		e.stopPropagation();
	};
	return (
		<div
			onClick={handleBackdropClick}
			className='bg-[rgba(0,0,0,0.25)] h-screen w-screen fixed inset-0 z-50 m-auto flex items-center justify-center'>
			<div
				onClick={handleContentClick}
				className={`animate - zoom - out m-auto bg-white p-2 rounded-2xl ${className}`}>
				<div className='flex justify-end'>
					{buttonClose && (
						<button
							className='hover:bg-gray-100 p-1 rounded-full cursor-pointer text-2xl'
							onClick={onHide}
						/>
					)}
				</div>
				{children}
			</div>
		</div>
	);
}

// Modal.propTypes = {
//   show: propTypes.bool.isRequired,
//   onHide: propTypes.func.isRequired,
//   buttonClose: propTypes.bool,
//   closeBackdrop: propTypes.bool,
// };

Modal.Footer = function () {};
