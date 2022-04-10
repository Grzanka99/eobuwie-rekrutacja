import { mount } from "@vue/test-utils";
import MonthPicker from "./MonthPicker.vue";

const props = {
  prev: jest.fn(),
  next: jest.fn(),
  currentMonth: 3,
};

describe("MonthPicker", () => {
  it("should render MonthPicker", () => {
    const wrapper = mount(MonthPicker, { props });
    expect(wrapper.find(".switch-month").exists()).toBe(true);
  });

  it("should trigger prev function", () => {
    const wrapper = mount(MonthPicker, { props });
    wrapper.find(".prev").trigger("click");
    expect(props.prev).toHaveBeenCalled();
  });

  it("should trigger next function", () => {
    const wrapper = mount(MonthPicker, { props });
    wrapper.find(".next").trigger("click");
    expect(props.next).toHaveBeenCalled();
  });

  it("should have proper month name", () => {
    const wrapper = mount(MonthPicker, { props });
    expect(wrapper.find(".switch-month").text()).toBe("April");
  });
});
