import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SelectPlayerDuration, selectPlayerIsPLaying, selectPlayerSeekPosition } from '../store/selectors';
import { setSeekPosition } from '../store/slice';
import { PlayerSeek } from './player-seek.component';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSeek: (num: number) => dispatch(setSeekPosition(num)),
});

const mapStateToProps = (state) => ({
  position: selectPlayerSeekPosition(state),
  isPlaying: selectPlayerIsPLaying(state),
  duration: SelectPlayerDuration(state),
});

export const PlayerSeekWrapper = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PlayerSeek);
