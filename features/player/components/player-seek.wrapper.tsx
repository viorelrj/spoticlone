import { withHandlers } from 'decorators/withHandlers';
import { compose } from 'ramda';
import { PlayerSeek } from './player-seek.component';
import { OnSeekType } from './player-seek.type';

const onSeek: OnSeekType = (num) => console.log(`seeking at ${num}`);

const handlers = {
  onSeek,
};

export const PlayerSeekWrapper = compose(
  withHandlers(handlers),
)(PlayerSeek);
