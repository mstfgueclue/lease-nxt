import { ListProperties } from "../../property/components/ListProperties";
import { Banner } from "./Banner";

export const Home = () => {
  return (
    <div className="min-h-[1800px]">
      <Banner />
      <ListProperties />
    </div>
  );
};
