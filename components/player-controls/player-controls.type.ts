export interface IPlayerControlsProps {
  isPlaying: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
}
