import { Box, Image } from '@chakra-ui/react';
import { ITrackProps } from './track.type';
import styles from './track.module.scss';

export const Track = ({ track }: ITrackProps) => {
  const albumImage = track.album.images[1];
  const albumName = track.album.name;

  return (
    <Box className={styles.track}>
      <Image
        className={styles.media}
        borderRadius="lg"
        alt={albumName}
        src={albumImage.url}
        height={albumImage.height / 4}
        width={albumImage.width / 4}
      />
      <div className={styles.content}>
        <span className={styles.title}>{track.name}</span>
        <span className={styles.author}>{track.artists.map((item) => item.name)}</span>
      </div>
    </Box>
  );
};
