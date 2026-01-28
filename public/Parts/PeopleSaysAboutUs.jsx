import PeopleReviewCards from "../Component/PeopleReviewCards";
import Img from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";

export default function TestimonialSection() {
  const PeopleReviewData = [
    {
      name: "Lorem, ipsum.",
      title: "Lorem ipsum dolor sit amet consectetur",
      img: Img,
      text: "Lorem ipsum dolor sit amet consectetur. Eget sed aliquam orci viverra ut egestas. Orci proin elit est leo mollis at cras. Vulputate faucibus augue diam sit. ",
    },
    {
      name: "Lorem, ipsum.",
      title: "Lorem ipsum dolor sit amet consectetur",
      img: Img,
      text: "Lorem ipsum dolor sit amet consectetur. Eget sed aliquam orci viverra ut egestas. Orci proin elit est leo mollis at cras. Vulputate faucibus augue diam sit. ",
    },
    {
      name: "Lorem, ipsum.",
      title: "Lorem ipsum dolor sit amet consectetur",
      img: Img,
      text: "Lorem ipsum dolor sit amet consectetur. Eget sed aliquam orci viverra ut egestas. Orci proin elit est leo mollis at cras. Vulputate faucibus augue diam sit. ",
    },
  ];

  return (
    <div className="w-full py-16 bg-gray-50 flex justify-center items-center flex-col gap-15 mt-10">
      <p className="text-4xl font-semibold ">Whats People says About Us</p>
      <div className="w-[80%] max-w-8xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PeopleReviewData.map((item, index) => (
          <PeopleReviewCards
            key={index}
            Img={item.img}
            Name={item.name}
            review={item.text}
            tittle={item.title}
          />
        ))}
      </div>
    </div>
  );
}
