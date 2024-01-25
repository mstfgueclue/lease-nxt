import BannerHouse from "../../assets/img/banner-house.svg";

export const Banner = () => {
  return (
    <section className="h-full max-h-[640px] mb-8 xl:mb-24">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
          <h1 className="text 4-xl lg:text-[58px] font-semibold leading-none mb-6">
            <span className="text-blue-700">Find</span> your next home
          </h1>
          <p className="max-w-[480px] mb-8">
            Search properties for sale and to rent in Vienna
          </p>
        </div>
      </div>
      <div className="justify-end hidden flex-1 lg:flex items-end">
        <img
          src={BannerHouse}
          alt="BannerHouse"
          className="rounded-lg h-auto max-w-xl"
        />
      </div>
    </section>
  );
};
