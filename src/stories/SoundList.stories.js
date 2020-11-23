import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../build.css";

import SoundList from "../SoundList";
import { results as tracks } from "./similar-sounds.json";

export default {
  title: "Components/SoundList",
  component: SoundList,
};

const Template = (args) => (
  <Router>
    <SoundList {...args} />
  </Router>
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "SoundList",
  tracks,
  header: "Sounds List",
  onSoundClick: () => window.scrollTo(0, 0),
};
