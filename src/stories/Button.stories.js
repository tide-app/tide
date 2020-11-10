import React from "react";
import "../tailwind.css";

import Button from "../components/Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <Button {...args}>Hello World!</Button>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};
