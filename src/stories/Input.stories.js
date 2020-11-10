import React from "react";
import "../tailwind.css";

import Input from "../components/Input";

export default {
  title: "Example/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: "Hello!",
};
