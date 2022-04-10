import { Day } from "@cgsh/calendarts/build/main/types";
import { mount } from "@vue/test-utils";
import { IPickedDates } from "~/types";
import DayButton from "./DayButton.vue";
import * as Calendar from "@cgsh/calendarts";
import { DateTime } from "luxon";

const monthArray = Calendar.getMonthArray(
  Calendar.getMonth(DateTime.now().month)
);

const testFn = jest.fn();
const props: {
  day: Day;
  reservedDates: IPickedDates[];
  picked: IPickedDates;
  onPick: (day: Day) => void;
} = {
  day: monthArray[1][1],
  reservedDates: [
    {
      startDate: monthArray[2][6],
      endDate: monthArray[3][2],
    },
  ],
  picked: {
    startDate: monthArray[0][6],
    endDate: monthArray[1][2],
  },
  onPick: testFn,
};

describe("DayButton", () => {
  it("should render day button", () => {
    const wrapper = mount(DayButton, { props });
    expect(wrapper.find(".day-button").exists()).toBe(true);
  });

  it("should be virtual day button", () => {
    const localMonthArray = Calendar.getMonthArray(Calendar.getMonth(3, 2022));
    const wrapper = mount(DayButton, {
      props: {
        ...props,
        day: localMonthArray[0][0],
      },
    });

    expect(wrapper.find(".day-button").classes()).toContain("virtual");
  });

  it("should be already reserved", () => {
    const wrapper = mount(DayButton, {
      props: {
        ...props,
        day: props.reservedDates[0].startDate,
      },
    });

    expect(wrapper.find(".day-button").classes()).toContain("reserved");
  });
});
