import { mount } from "@vue/test-utils";
import { IPickedDates } from "~/types";
import DatePicker from "./DatePicker.vue";
import * as Calendar from "@cgsh/calendarts";
import { DateTime } from "luxon";

const monthArray = Calendar.getMonthArray(
  Calendar.getMonth(DateTime.now().month)
);

const props: {
  basePrice: number;
  stars: number;
  votes: number;
  reservedDates: IPickedDates[];
} = {
  reservedDates: [
    {
      startDate: monthArray[0][1],
      endDate: monthArray[0][5],
    },
  ],
  stars: 3.5,
  votes: 10,
  basePrice: 28,
};

describe("DatePicker", () => {
  it("should render DatePicker component", () => {
    const wrapper = mount(DatePicker, { props });
    expect(wrapper.find(".date-picker").exists()).toBe(true);
    expect(wrapper.find(".modal").exists()).toBe(false);
  });

  it("should render proper price", () => {
    const wrapper = mount(DatePicker, { props });
    expect(wrapper.find(".date-picker__info__price").text()).toBe("28 zł");
  });
});
