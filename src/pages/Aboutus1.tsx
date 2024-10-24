import React from "react";
import missionImg from "../assets/images/LOLA-Event-Productions-Wedding-Planning-Tent-RichHarvestFarm-034.jpg";
import visionImg from "../assets/images/LOLA-Event-Productions-Wedding-Planning-Tent-RichHarvestFarm-034.jpg"; // Replace with actual image paths
import historyImg from "../assets/images/LOLA-Event-Productions-Wedding-Planning-Tent-RichHarvestFarm-014.jpg"; // Replace with actual image paths
import achievementsImg from "../assets/images/LOLA-Event-Productions-Wedding-Planning-Tent-RichHarvestFarm-009.jpg"; // Replace with actual image paths
import OurTeam from "./Ourteam";
const AboutUs1: React.FC = () => {
  return (
    <div className="    ">
        
        <div className="pt-36"><OurTeam /></div>
      <h2 className="text-4xl font-bold text-center mt-10">About Us</h2>
      <div className=" p-10   ">
        {/* Our Mission Section */}
        <section className="mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={missionImg}
              alt="Our Mission"
              className=" mb-3 w-full h-80 object-cover rounded"
            />

            <p className="text-lg">
              <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                Our Mission
              </h3>
              Our mission is to deliver exceptional event planning and
              coordination services that prioritize our clients’ needs and
              visions. We strive for excellence in every detail, ensuring a
              seamless experience from start to finish.
            </p>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="mb-8">
          <div className="flex items-center space-x-6">
            <p className="text-lg">
              <h3 className="text-2xl font-semibold text-yellow-500 mb-2">
                Our Vision
              </h3>
              We envision a world where every event, big or small, is executed
              flawlessly, leaving lasting memories for our clients and their
              guests.
            </p>
            <img
              src={visionImg}
              alt="Our Vision"
              className=" mb-3 w-full h-72 object-cover rounded"
            />
          </div>
        </section>
      </div>
      <div className=" pl-1 pr-1 flex space-x-4 text-white">
        <section className="">
          <div className="  items-center p-2">
            <img
              src={historyImg}
              alt="Our History"
              className=" mb-3 w-full h-72 object-cover pt-3 rounded"
            />
            <p className="text-lg  bg-gradient-to-r from-yellow-800 to-yellow-400 p-2">
              <h3 className="text-2xl font-semibold mb-2">Our History</h3>
              Founded in [Year], we have grown from a small team of passionate
              planners to a leading event management company in the region. Our
              diverse portfolio includes weddings, corporate events, and
              community gatherings, each tailored to meet our clients' unique
              needs.
            </p>
          </div>
        </section>

        <section className="mb-7 mt-3">
          <div className=" items-center p-2 ">
            <img
              src={achievementsImg}
              alt="Our Achievements"
              className=" mb-3 w-full h-72 object-cover rounded"
            />
            <p className="text-lg p-2 bg-gradient-to-r from-yellow-800 to-yellow-400">
              <h3 className="text-2xl font-semibold mb-2">Our Achievements</h3>
              Over the years, we have successfully executed numerous
              high-profile events, earning recognition for our creativity and
              attention to detail. Our commitment to excellence has garnered us
              a loyal client base and numerous awards in the industry.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs1;
