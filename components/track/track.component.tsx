import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { ITrackProps } from './track.type';

export function Track({ track }: ITrackProps) {
  const albumImage = track.album.images[2];
  const albumName = track.album.name;

  return (
    <Box>
      <Image
        alt={albumName}
        src={albumImage.url}
        height={albumImage.height}
        width={albumImage.width}
      />
      <span>{track.name}</span>
      <span>{track.artists.map((item) => item.name)}</span>
    </Box>
  );
}
