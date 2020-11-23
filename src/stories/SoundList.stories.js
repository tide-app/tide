import React from "react";
import "../build.css";

import SoundList from "../src/SoundList.js";

export default {
  title: "Example/SoundList",
  component: SoundList,
};

const Template = (args) => <SoundList {...args}>Hello World!</SoundList>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "SoundList",
};
