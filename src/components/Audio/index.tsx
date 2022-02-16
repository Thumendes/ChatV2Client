import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
import {
  IconButton,
  HStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Flex,
  Box,
} from "@chakra-ui/react";
import { FiPause, FiPlay } from "react-icons/fi";
const AudioContext = createContext({} as AudioContextType);
export const useAudio = () => useContext(AudioContext);

interface AudioContextType {
  url: string;
  audio: MutableRefObject<HTMLAudioElement>;
  toggle: () => void;
  playing: boolean;
}

interface AudioPlayerProps {
  url: string;
}

const PlayerButton = () => {
  const { toggle, playing } = useAudio();

  return (
    <IconButton
      onClick={toggle}
      aria-label=""
      icon={playing ? <FiPause /> : <FiPlay />}
    />
  );
};

const ProgressBar = () => {
  const { playing, audio } = useAudio();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!audio.current || !playing) return;

    const interval = setInterval(() => {
      const perCent =
        (audio.current.currentTime / audio.current.duration) * 100;

      setCurrentTime(audio.current.currentTime);
      setProgress(perCent);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [playing, audio]);

  function convertNumberToMin(num: number) {
    const minutes = Math.floor(num / 60);
    const seconds = Math.floor(num - minutes * 60);

    return `${minutes}:${seconds}`;
  }

  function onChangeCurrentTime(value: number) {
    const time = (value / 100) * audio.current.duration;

    audio.current.currentTime = time;
  }

  return (
    <Flex h="full" justifyContent="space-between" w="full" direction="column">
      <Slider onChange={onChangeCurrentTime} value={progress}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>

        <SliderThumb />
      </Slider>

      <Text fontSize={10}>
        {convertNumberToMin(playing ? currentTime : audio.current.duration)}
      </Text>
    </Flex>
  );
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  const audio = useRef(new Audio(url));

  async function play() {
    audio.current.play();

    setPlaying(true);
  }

  async function pause() {
    audio.current.pause();

    setPlaying(false);
  }

  async function toggle() {
    return playing ? pause() : play();
  }

  return (
    <AudioContext.Provider value={{ url, audio, toggle, playing }}>
      <HStack spacing={4} w={260}>
        <PlayerButton />
        <ProgressBar />
      </HStack>
    </AudioContext.Provider>
  );
};

export default AudioPlayer;
