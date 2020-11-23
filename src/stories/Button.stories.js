import React from "react";
import "../build.css";

import Button from "../components/Button";

export default {
  title: "Components/Button",
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
