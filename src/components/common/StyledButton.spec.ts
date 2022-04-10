import { mount } from "@vue/test-utils";
import StyledButton from "./StyledButton.vue";

describe("StyledButton", () => {
  it("should render styled button", () => {
    const buttonText = "Test Button";
    const wrapper = mount(StyledButton, { props: { buttonText } });

    expect(wrapper.find("button").text()).toBe(buttonText);
  });
});
