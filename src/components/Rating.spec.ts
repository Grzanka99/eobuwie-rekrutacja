import { mount } from "@vue/test-utils";
import Rating from "./Rating.vue";

const props = {
  stars: 3.5,
  votes: 10,
};

describe("Rating", () => {
  it("should render rating component", () => {
    const wrapper = mount(Rating, { props });
    expect(wrapper.find(".rating").exists()).toBe(true);
  });

  it("should render proper amount of votes", () => {
    const wrapper = mount(Rating, { props });
    expect(wrapper.find(".votes").text()).toBe(props.votes.toString());
  });
});
