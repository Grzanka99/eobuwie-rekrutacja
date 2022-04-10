import { mount } from "@vue/test-utils";
import { IPickedDates } from "~/types";
import DateRange from "./DateRange.vue";
import * as Calendar from "@cgsh/calendarts";
import { DateTime } from "luxon";

const monthArray = Calendar.getMonthArray(
  Calendar.getMonth(DateTime.now().month)
);

const testFn = jest.fn();

const props: {
  picked: IPickedDates;
  modalOpen?: boolean;
  removeOne: (newValue: IPickedDates) => void;
} = {
  picked: {
    startDate: monthArray[0][1],
    endDate: monthArray[0][5],
  },
  modalOpen: false,
  removeOne: testFn,
};

describe("DateRange", () => {
  it("should render DateRange component", () => {
    const wrapper = mount(DateRange, { props });

    expect(wrapper.find(".date-range").exists()).toBe(true);
  });

  it("should render remove button in span", () => {
    const wrapper = mount(DateRange, { props });
    expect(wrapper.find("span").element.childNodes[1].nodeName).toBe("BUTTON");
  });

  it("should render 'Date from' in span", () => {
    const wrapper = mount(DateRange, {
      props: {
        ...props,
        picked: {
          startDate: null,
          endDate: null,
        },
      },
    });
    expect(wrapper.find("span").text()).toContain("Date from");
    expect(wrapper.find("span").element.childNodes[1].nodeName).not.toBe(
      "BUTTON"
    );
  });

  it("should call remove function", () => {
    const wrapper = mount(DateRange, { props });
    wrapper.find("button").trigger("click");
    expect(testFn).toHaveBeenCalled();
  });
});
