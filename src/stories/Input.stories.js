import React from "react";
import "../build.css";

import Input from "../components/Input.tsx";

export default {
  title: "Components/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: "Hello!",
};
