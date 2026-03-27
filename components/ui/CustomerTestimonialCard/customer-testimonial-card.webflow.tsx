import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { CustomerTestimonialCard } from "./customer-testimonial-card"

export default declareComponent(CustomerTestimonialCard, {
  name: "Customer Testimonial Card",
  description:
    "A testimonial card featuring a company logo, quote, and attribution",
  group: "Cards",
  props: {
    logo: props.Image({
      name: "Logo",
      tooltip: "The company logo displayed at the top of the card",
    }),
    testimonial: props.Text({
      name: "Testimonial",
      defaultValue:
        "Terra delivered critical insights that other pentesters missed, and they did it with correct business context and real-world material impact.",
      tooltip: "The testimonial quote text",
    }),
    name: props.Text({
      name: "Name",
      defaultValue: "Ben Hacmon",
      tooltip: "The name of the person giving the testimonial",
    }),
    position: props.Text({
      name: "Position",
      defaultValue: "CISO, Perion",
      tooltip: "The job title or position of the person",
    }),
  },
})
