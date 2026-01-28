import FilterMenu from "../../../Component/FilterMenu";
import MusicCard from "../../../Component/MusicCard";
import HeroImg from "../../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import SearchBar from "../../../Component/SearchBar";

function AllMusic() {
  return (
    <div className="flex gap-15">
      <div className="w-[22%]">
        <FilterMenu />
      </div>

      <div className="w-[78%]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Explore</h2>
           <SearchBar
                            classess={
                              "w-110 rounded-full border-1 border-gray-500 shadow-sm bg-white/80  h-12"
                            }
                            ButtonInfo="w-[12%] h-full"
                          />
        </div>
        <div className="flex flex-col gap-20">
          <div>
            <div className="flex items-center justify-between mb-3 px-8">
              <p className="text-xl font-semibold">Music</p>
              <a href="">View All</a>
            </div>

            <div className="grid grid-cols-3 gap-10 mx-auto w-[90%]">
              {Array.from({ length: 6 }).map((_, i) => (
                <MusicCard
                  key={i}
                  image={HeroImg}
                  title="Lorem Ipsum Dolor"
                  subtitle="Top Album"
                  classes="h-50 w-[90%] rounded-xl"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 px-8">
              <p className="text-xl font-semibold">Music</p>
              <a href="">View All</a>
            </div>

            <div className="grid grid-cols-3 gap-10 mx-auto w-[90%]">
              {Array.from({ length: 6 }).map((_, i) => (
                <MusicCard
                  key={i}
                  image={HeroImg}
                  title="Lorem Ipsum Dolor"
                  subtitle="Top Album"
                  classes="h-45 w-[90%] rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMusic;
