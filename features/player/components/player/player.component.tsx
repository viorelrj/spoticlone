import { DeviceSelector } from '@spc/componvents/device-selector/device-selector.component';
import { PlayerContext } from 'features/player/player/player.context';
import { IBaseProps } from '@spc/types/base-props';
import { SpotifyApiContext } from 'api/api.context';
import { IDevice } from 'api/api.interface';
import {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { PlayerContextProvider } from 'features/player/context/player.provider';
import { PlayerControls } from '../../../features/player/components/player-controls/player-controls.component';

import { PlayerSeek } from '../../molecules/player-seek/player-seek.component';
import styles from './player.module.scss';
import classNames from 'classnames';


export const Player = ({ className }: IBaseProps) =>(
    <PlayerContextProvider>

      <div className={classNames(styles.player, className)}>
        <div className={styles.left} />
        <div className={styles.center}>
          <PlayerControls
            // onPrevious={handlePrev}
            // onNext={handleNext}
            // onToggle={handleTogglePlay}
            // isPlaying={!isPaused}
          />
          <PlayerSeek
            // position={songPosition}
            // duration={songDuration}
            // isPlaying={!isPaused}
            // onSeek={seek}
          />
        </div>
        <div className={styles.right}>
          <DeviceSelector
            // devices={devices}
            // value={activeDeviceId}
            // onChange={handleDeviceChange}
          />
        </div>
      </div>
    </PlayerContextProvider>
  );
};
