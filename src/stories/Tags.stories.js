import React from "react";
import "../build.css";

import Tags from "../components/Tags";

export default {
  title: "Components/Tags",
  component: Tags,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <Tags {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Tags",
  tags: ["forest", "ambience"],
};
