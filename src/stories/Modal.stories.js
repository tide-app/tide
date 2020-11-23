import React from "react";
import "../build.css";

import Modal from "react-modal";

export default {
  title: "Components/Modal",
  component: Modal,
};

const Template = (args) => <Modal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: "Modal",
};
