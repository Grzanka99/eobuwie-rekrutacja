import { mount } from "@vue/test-utils";
import CalendarModal from "./Calendar.vue";

const props = {
  isOpen: true,
  reservedDates: [],
  toggleModal: jest.fn(),
  picked: {
    startDate: null,
    endDate: null,
  },
};

describe("CalendarModal", () => {
  it("should render CalendarModal", () => {
    const wrapper = mount(CalendarModal, { props });
    expect(wrapper.find(".calendar").exists()).toBe(true);
  });

  it("should not render CalendarModal", () => {
    const wrapper = mount(CalendarModal, {
      props: {
        ...props,
        isOpen: false,
      },
    });

    expect(wrapper.find(".calendar").exists()).toBe(false);
  });

  it("should render as expected", () => {
    const wrapper = mount(CalendarModal, { props });
    expect(wrapper.element).toMatchSnapshot();
  });
});
