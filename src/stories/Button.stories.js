import React from "react";
import "../build.css";
import Button from "../components/Button";
import PlayButton from "../components/PlayButton";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args}>Hello World!</Button>;
const PlayButtonTemplate = (args) => <PlayButton {...args}>Play</PlayButton>;

export const Primary = Template.bind({});

export const PlayButtonExample = PlayButtonTemplate.bind({});
PlayButtonExample.args = {
  isPlaying: true,
};
