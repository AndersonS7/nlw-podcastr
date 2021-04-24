import { type } from 'node:os';
import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffiling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toogleShuffle: () => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
};

type PlayerConterxProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerConterxProvider({ children }: PlayerConterxProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setisLooping] = useState(false);
    const [isShuffiling, setisShuffiling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setcurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setcurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setisLooping(!isLooping);
    }

    function toogleShuffle() {
        setisShuffiling(!isShuffiling);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    function clearPlayerState() {
        setEpisodeList([]);
        setcurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffiling || (currentEpisodeIndex + 1) < episodeList.length;

    function playNext() {
        if (isShuffiling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

            setcurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext) {
            setcurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setcurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                playList,
                isPlaying,
                isLooping,
                isShuffiling,
                togglePlay,
                setPlayingState,
                playNext,
                playPrevious,
                hasNext,
                hasPrevious,
                toggleLoop,
                toogleShuffle,
                clearPlayerState,
            }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}