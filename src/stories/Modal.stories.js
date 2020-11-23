import React from "react";
import "../build.css";

import Modal from "react-modal";

export default {
  title: "Example/Modal",
  component: "react-modal",
};

const Template = (args) => <Modal {...args}>Hello World!</Modal>;

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: "Modal",
};
