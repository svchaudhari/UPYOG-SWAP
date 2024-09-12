import { Stairs } from ".";

export default {
  title: "Components/Stairs",
  component: Stairs,
  argTypes: {
    weight: {
      options: ["duotone", "regular", "thin", "bold", "fill", "light"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    weight: "duotone",
  },
};
