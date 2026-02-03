import PeopleReviewCards from "../Component/PeopleReviewCards";
import Img from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";

export default function TestimonialSection() {
  const PeopleReviewData = [
    {
      name: "Lorem, ipsum.",
      title: "Lorem ipsum dolor sit amet consectetur",
      img: Img,
      text: "Lorem ipsum dolor sit amet consectetur. Eget sed aliquam orci viverra ut egestas. Orci proin elit est leo mollis at cras. Vulputate faucibus augue diam sit.",
    },
    {
      name: "Lorem, ipsum.",
      title: "Lorem ipsum dolor sit amet consectetur",
      img: Img,
      text: "Lorem ipsum dolor sit amet consectetur. Eget sed aliquam orci viverra ut egestas. Orci proin elit est leo mollis at cras. Vulputate faucibus augue diam sit.",
    },
    {
      name: "Lorem, ipsum.",
      title: "Lorem ipsum dolor sit amet consectetur",
      img: Img,
      text: "Lorem ipsum dolor sit amet consectetur. Eget sed aliquam orci viverra ut egestas. Orci proin elit est leo mollis at cras. Vulputate faucibus augue diam sit.",
    },
  ];

  return (
    <div className="w-full h-auto bg-gray-50 flex flex-col items-center gap-10 mb-10" >
      <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
        Whats People says About Us
      </p>

      {/* Wrapper */}
      <div className="w-full md:w-[80%] max-w-8xl">
        
        {/* MOBILE: horizontal scroll */}
        <div
          className="
            flex md:grid
            md:grid-cols-2 lg:grid-cols-3
            gap-6
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory
            px-4 md:px-0min-
            scrollbar-hide
          "
        >
          {PeopleReviewData.map((item, index) => (
            <div
              key={index}
              className="
                min-w-[85%] sm:min-w-[70%]
                md:min-w-0
                snap-center
                border border-gray-200 rounded-xl
              "
            >
              <PeopleReviewCards
                Img={item.img}
                Name={item.name}
                review={item.text}
                tittle={item.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
