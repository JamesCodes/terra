import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { CareerTestimonialCard } from "./career-testimonial-card"


export default declareComponent(CareerTestimonialCard, {
  name: "Career Testimonial Card",
  description: "A testimonial card featuring a department badge, quote, and attribution",
  group: "Cards",
  props: {
    department: props.Text({
      name: "Department",
      defaultValue: "Marketing",
      tooltip: "The department label shown in the badge",
    }),
    testimonial: props.Text({
      name: "Testimonial",
      defaultValue:
        "I joined Terra because the team came out of the gates executing like winners: clear focus, fast learning, and real momentum. We're building a product customers are actively pulling for, and we're doing it in partnership with industry leaders. It's the perfect set of ingredients for success.",
      tooltip: "The testimonial quote text",
    }),
    name: props.Text({
      name: "Name",
      defaultValue: "Alex Yakubov",
      tooltip: "The name of the person giving the testimonial",
    }),
    position: props.Text({
      name: "Position",
      defaultValue: "VP of Marketing",
      tooltip: "The job title or position of the person",
    }),
  },
})
