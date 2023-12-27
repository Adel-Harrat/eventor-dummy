const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Programming for everyone",
    description:
      "Forget preconceived notions about tech being exclusive! This isn't another tech talk reserved for the chosen few. Join us live where we'll shatter that barrier and prove: everyone can be a coder! No matter your background, skills, or experience, this event has everything you need to ignite your coding journey. Buckle up as we unveil...",
    location: "Somestreet 25, 12345 san somewhere",
    date: "2023-05-12",
    image: "images/coding-event.jpg",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Mastering the Art of Photography",
    description:
      "Calling all photography enthusiasts! Unleash your inner artist and capture breathtaking shots in this immersive workshop. Dive into the world of composition, lighting, and editing, mastering the techniques that transform ordinary snaps into extraordinary works of art. This hands-on event equips you with the skills and confidence to tell your stories through stunning visuals, leaving you forever changed by the power of photography. Don't miss this chance to level up your lens skills and embark on a creative journey you'll never forget!",
    location: "Central Library, 101 Main St",
    date: "2023-11-21",
    image: "images/photography-workshop.jpg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Exploring the Culinary World: French Cuisine",
    description:
      "Calling all gourmands and Francophiles! Immerse yourself in a delectable evening celebrating the artistry of French cuisine. Under the expert guidance of our culinary maestros, you'll embark on a hands-on journey, mastering beloved classics and unearthing the secrets that elevate simple ingredients to sublime heights. More than just a cooking class, this is an invitation to savor the rich tapestry of French culinary tradition, where every step is an act of creation and every bite a revelation. So, raise a glass (of wine, naturally!), and join us for an unforgettable soirée of laughter, learning, and, of course, exquisite French fare. You won't just leave with new skills and culinary knowledge; you'll leave with a newfound appreciation for the art of living à la française. Bon appétit!",
    location: "Le Petit Bistro, 55 Rue de Paris",
    date: "2022-12-09",
    image: "images/french-cuisine-event.jpg",
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id === id);
}
