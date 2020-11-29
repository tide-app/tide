import React from "react";
import "../build.css";

import ModalPrompt from "../components/ModalPrompt";

export default {
  title: "Components/ModalPrompt",
  component: ModalPrompt,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => (
  <ModalPrompt {...args} isOpen={true}>
    hahahah
  </ModalPrompt>
);

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: "ModalPrompt",
  title: "Example Title Text",
};
