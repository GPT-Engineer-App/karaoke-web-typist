import { useState } from "react";
import { Box, Button, Input, VStack, Text, useColorModeValue, useInterval } from "@chakra-ui/react";
import { FaPlay, FaStop } from "react-icons/fa";

const Index = () => {
  const [text, setText] = useState("");
  const [duration, setDuration] = useState(5);
  const [play, setPlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [timer, setTimer] = useState(null);

  const handleTextChange = (event) => setText(event.target.value);
  const handleDurationChange = (event) => setDuration(Number(event.target.value));

  const startKaraoke = () => {
    if (play) return;
    setPlay(true);
    setCurrentIndex(0);
    setDisplayedText("");

    const interval = setInterval(
      () => {
        if (currentIndex < text.length) {
          const nextChar = text[currentIndex];
          const isSpecial = nextChar === ">" || nextChar === "<";
          const nextIndex = isSpecial ? currentIndex + 2 : currentIndex + 1;
          setDisplayedText((prev) => prev + text.slice(currentIndex, nextIndex));
          setCurrentIndex(nextIndex);
          const intervalDuration = isSpecial ? (duration * 1000) / (text.length * 1.5) : (duration * 1000) / text.length;
          clearInterval(interval);
          const newInterval = setInterval(() => {}, intervalDuration);
          setTimer(newInterval);
        } else {
          clearInterval(interval);
          setPlay(false);
        }
      },
      (duration * 1000) / text.length,
    );

    setTimer(interval);
  };

  const stopKaraoke = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setPlay(false);
    setCurrentIndex(0);
    setDisplayedText("");
  };

  const textColor = useColorModeValue("blue.500", "blue.200");

  return (
    <VStack spacing={4} p={5}>
      <Input placeholder="Enter text for karaoke..." value={text} onChange={handleTextChange} />
      <Input placeholder="Duration in seconds..." type="number" value={duration} onChange={handleDurationChange} />
      <Button leftIcon={play ? <FaStop /> : <FaPlay />} colorScheme="blue" onClick={play ? stopKaraoke : startKaraoke}>
        {play ? "Stop" : "Start"}
      </Button>
      <Box p={5} bg="gray.100" w="full" textAlign="center">
        <Text fontSize="2xl" color={textColor}>
          {displayedText.split("").map((char, index) => {
            const isSpecial = char === ">" || char === "<";
            return (
              <span key={index} style={{ color: isSpecial ? "red" : textColor }}>
                {char}
              </span>
            );
          })}
        </Text>
      </Box>
    </VStack>
  );
};

export default Index;
