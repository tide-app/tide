import React from "react";
import "../build.css";

import Description from "../components/Description";

export default {
  title: "Components/Description",
  component: Description,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <Description {...args}>Hello World!</Description>;

export const Basic = Template.bind({});
Basic.args = {
  content: {
    __html: "This sound is that of a wolf howling",
  },
  primary: true,
  label: "Description",
};

export const HtmlExample = Template.bind({});
HtmlExample.args = {
  content: {
    __html: "The world is <strong>round</strong>.",
  },
  primary: true,
  label: "Description",
};
