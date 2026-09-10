/**
 * =====================================================================
 * TESTIMONIALS — central data source.
 * Rendered on the home page and the Attorneys page.
 * `photo` is optional — omit it to render an initial-based avatar.
 * =====================================================================
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  position: string;
  rating: 1 | 2 | 3 | 4 | 5;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "The team provided exceptional legal guidance throughout the entire process. Their professionalism and attention to detail gave us complete confidence.",
    name: "Kwame Mensah",
    position: "Chief Executive, Mensah Holdings",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "They handled our acquisition with remarkable composure. Every deadline was met, every risk anticipated. We would not use another firm.",
    name: "Ama Boateng",
    position: "Director, Coastal Foods Ltd.",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Professional, responsive and genuinely caring. They guided our family through a difficult dispute with dignity and skill.",
    name: "Yaw Owusu",
    position: "Private Client",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Clear advice, fair fees and straight answers. They explained our options honestly and the outcome was far better than we expected.",
    name: "Efua Asante",
    position: "Managing Partner, Asante Retail Group",
    rating: 4,
  },
  {
    id: "5",
    quote:
      "From our first consultation it was obvious we were in safe hands. The attention to detail across every document was outstanding.",
    name: "David Quansah",
    position: "Founder, DQ Technologies",
    rating: 5,
  },
  {
    id: "6",
    quote:
      "An exceptional investment in our business. Their commercial and legal judgment together are difficult to find in one firm.",
    name: "Sarah Mensah",
    position: "Finance Director, Meridian Capital",
    rating: 5,
  },
];