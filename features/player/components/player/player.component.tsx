import classNames from 'classnames';
import styles from './player.module.scss';
import { usePlayerPlayState } from '../../hooks/playerPlayState';
import { PlayerControls } from '../player-controls/player-controls.component';
import { usePlayerDevices } from '../../hooks/playerDevices';
import { DeviceSelector } from '../device-selector/device-selector.component';
import { PlayerSeek } from '../player-seek/player-seek.component';

export const Player = () => {
  const {
    isPlaying,
    toggle,
    nextTrack,
    previousTrack,
    playhead,
    duration,
  } = usePlayerPlayState();

  const {
    activeDevice,
    allDevices,
    setDevice,
  } = usePlayerDevices();

  return (
    <div className={classNames(styles.player)}>
      <div className={styles.left} />
      <div className={styles.center}>
        <PlayerControls
          onPrevious={previousTrack}
          onNext={nextTrack}
          onToggle={toggle}
          isPlaying={isPlaying}
        />
        <PlayerSeek position={playhead} isPlaying={isPlaying} duration={duration} />
      </div>
      <div className={styles.right}>
        <DeviceSelector
          devices={allDevices}
          value={activeDevice}
          onChange={setDevice}
        />
      </div>
    </div>
  );
};
