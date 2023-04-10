import { IBaseProps } from '@spc/types/base-props';
import { usePlayerPlayState } from '../../hooks/playerPlayState';
import { PlayerControls } from '../player-controls/player-controls.component';
import { usePlayerDevices } from '../../hooks/playerDevices';

// <div className={classNames(styles.player, className)}>
//   <div className={styles.left} />
//   <div className={styles.center}>
//
//     <PlayerSeek
//     // position={songPosition}
//     // duration={songDuration}
//     // isPlaying={!isPaused}
//     // onSeek={seek}
//     />
//   </div>
//   <div className={styles.right}>
//     <DeviceSelector
//     // devices={devices}
//     // value={activeDeviceId}
//     // onChange={handleDeviceChange}
//     />
//   </div>
// </div>

export const Player = () => {
  const {
    isPlaying, toggle, nextTrack, previousTrack,
  } = usePlayerPlayState();

  const { activeDevice } = usePlayerDevices();

  return (
    <PlayerControls
      onPrevious={previousTrack}
      onNext={nextTrack}
      onToggle={toggle}
      isPlaying={isPlaying}
    />
  );
};
