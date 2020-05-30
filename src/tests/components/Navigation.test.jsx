import React from "react";
import ReactShallowRenderer from "react-test-renderer/shallow";
import Navigation from "components/Navigation/Navigation";

test("should render header correctly", () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Navigation />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
