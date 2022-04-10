import { mount } from "@vue/test-utils";
import StyledButton from "./StyledButton.vue";

describe("StyledButton", () => {
  it("should render styled button", () => {
    const buttonText = "Test Button";
    const wrapper = mount(StyledButton, { props: { buttonText } });

    expect(wrapper.find("button").text()).toBe(buttonText);
    expect(wrapper.find("button").classes()).toContain("styled-button");
  });

  it("should render disabled button", () => {
    const buttonText = "Test Button";
    const wrapper = mount(StyledButton, {
      props: { buttonText, disabled: true },
    });

    expect(wrapper.find("button").attributes()).toHaveProperty("disabled");
  });
});
