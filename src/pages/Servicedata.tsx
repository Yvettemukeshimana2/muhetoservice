export interface Service {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Concierge",
    description: "Providing exceptional personal assistance services...",
    detailedDescription:
      "Our concierge service offers you personal assistance with everyday tasks and unique needs...",
    image: "/images/concierge.jpg",
  },
  {
    id: 2,
    title: "Event Catering",
    description: "Delicious and custom menus tailored for every event...",
    detailedDescription:
      "Our event catering service provides gourmet and customizable menus that match your event’s theme...",
    image: "/images/event-catering.jpg",
  },
  // Add more services with their detailed descriptions here
];
