import { GoogleMapsEmbed } from "@next/third-parties/google";
import { FaMobileScreen, FaPhone, FaEnvelope } from "react-icons/fa6";

const Help = () => {
  return (
    <div className="w-full bg-light-primary dark:bg-secondary text-light-text dark:text-white">
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto p-5 md:px-0 flex flex-col items-center justify-center space-y-5 my-[60px] sm:my-[80px]">
        <h1 className="w-full text-left text-[22px]">How Can We Help ?</h1>
        <p className="w-full text-left text-sm font-light">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima vel
          earum vitae deleniti ab aperiam quae nemo dolore dolores quasi!
        </p>
        <div className="w-full flex flex-col items-center justify-center space-y-2.5 p-2.5 border border-accent/20 bg-white dark:bg-tertiary">
          <h1 className="w-full text-left text-[19px] font-medium">
            Contact Us
          </h1>
          <div className="w-full flex items-center justify-start space-x-3">
            <FaMobileScreen className="w-4 h-4 text-accent" />
            <span className="text-sm font-light">+971 56 330 2017</span>
          </div>
          <div className="w-full flex items-center justify-start space-x-3">
            <FaPhone className="w-4 h-4 text-accent" />
            <span className="text-sm font-light">04 333 0005 5</span>
          </div>
          <div className="w-full flex items-center justify-start space-x-3">
            <FaEnvelope className="w-4 h-4 text-accent" />
            <span className="text-sm font-light">healthhub@mail.ae</span>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center space-y-2.5 p-2.5 border border-accent/20 bg-white dark:bg-tertiary">
          <h1 className="w-full text-left text-[19px] font-medium">
            Online Chat
          </h1>
          <button className="px-7 pt-1 pb-1.5 bg-accent text-white place-self-start">
            WhatsApp
          </button>
        </div>
      </div>
      <div className="w-full h-[600px]">
        <GoogleMapsEmbed
          zoom="17"
          height={600}
          width="100%"
          mode="place"
          q="City+Doctor+Healthcare"
          center="25.0989095,55.1747754"
          apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        />
      </div>
    </div>
  );
};

export default Help;
