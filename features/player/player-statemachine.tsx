// state
// playhead, length
// device, playState

// actions
// setActiveDevice
// setPlayState
// setSongPosition
// setSong

// export const Player = ({ className }: IBaseProps) => {
//   const player = useContext(PlayerContext);
//   const api = useContext(SpotifyApiContext);

//   const [devices, setDevices] = useState<IDevice[]>([]);
//   const [thisDeviceId, setThisDeviceId] = useState('');
//   const [activeDeviceId, setActiveDeviceId] = useState<string|undefined>(undefined);
//   const [isPaused, setIsPaused] = useState(true);
//   const [songPosition, setSongPosition] = useState(0);
//   const [songDuration, setSongDuration] = useState(0);

//   useEffect(() => {
//     function handlePlayerStateChanged(state) {
//       if (!state) return;
//       setIsPaused(state.paused);
//       setSongPosition(state.position);
//       setSongDuration(state.duration);
//     }

//     player?.addListener('player_state_changed', handlePlayerStateChanged);

//     return () => {
//       player?.removeListener('player_state_changed', handlePlayerStateChanged);
//     };
//   });

//   useEffect(() => {
//     const selectedDevice = devices.find((it) => it.is_active);
//     setActiveDeviceId(selectedDevice ? selectedDevice.id : thisDeviceId);
//   }, [devices, thisDeviceId]);

//   useEffect(() => {
//     if (!activeDeviceId) return;

//     api?.transferPlayback(activeDeviceId, !isPaused);
//   }, [activeDeviceId, isPaused, api]);

//   useEffect(() => {
//     const handlePlayerReady = (device) => {
//       api?.getAvailableDevices?.()
//         .then((res) => {
//           if (!res.data) return [];
//           return res.data.devices;
//         }).then((d) => setDevices(d));
//       setThisDeviceId(device.device_id);
//     };
//     player?.addListener('ready', handlePlayerReady);
//     return () => player?.removeListener('ready', handlePlayerReady);
//   }, [player, api]);

//   const handleTogglePlay = useCallback(() => player?.togglePlay(), [player]);
//   const handleNext = useCallback(() => player?.nextTrack(), [player]);
//   const handlePrev = useCallback(() => player?.previousTrack(), [player]);
//   const handleDeviceChange = useCallback(
//     (device: string) => setActiveDeviceId(device),
//     [setActiveDeviceId],
//   );

//   const seek = useCallback((position: number) => player?.seek(position), [player]);

//   const classNames = useMemo(() => [styles.player, className].join(' '), [className, styles]);
