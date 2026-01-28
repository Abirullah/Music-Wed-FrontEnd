

export default function PeopleReviewCards({Img , Name , review , tittle}) {
  return (
    <div className=" w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <img
          src={Img}
          alt="Lorem, ipsum."
          className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
        />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
             {Name}
            </h3>
          </div>
          <span className="text-gray-500 ">{tittle}</span>
        </div>
      </div>

      <p className="text-gray-700  leading-relaxed mt-2">
        {review}
      </p>
    </div>
  );
}
