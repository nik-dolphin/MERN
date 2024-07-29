import React, { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import {
  FaCamera,
  FaCut,
  FaPaintBrush,
  FaRegSmile,
  FaRocket,
  FaShoppingBag,
  FaTwitter,
  FaWeixin,
} from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";
import DashboardProducts from "../component/dashboard-products";

const Dashboard = () => {
  const [state, handleSubmit] = useForm("mblrjbwr");

  useEffect(() => {
    if (state.succeeded) {
      enqueueSnackbar("Contact form submitted successfully", {
        variant: "success",
      });
    }
  }, [state.succeeded]);

  return (
    <>
      <DashboardProducts />
      <section className="flex justify-center items-center box-border w-full h-screen bg-landing-section">
        <div>
          <h1 className="text-green-2 w-full text-center text-[44px] font-semibold tracking-widest leading-tight">
            Get Fresh products from Vegan Store
          </h1>
          <p className="text-white w-full tracking-wide text-center pt-8">
            With nutrition, all the vital functions of the body are connected.
            It is the source of the development of tissues and cells, their
            constant renewal, the saturation of man with energy.
          </p>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-full max-w-[1640px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-2 p-4">
          <div className="flex flex-col md:flex-row w-full lg:w-2/4 h-full gap-2">
            <div className="py-28 px-12 text-white w-full md:w-2/4 flex flex-col items-center space-y-4 bg-[#5acda6]">
              <FaCut size={96} className="hover:scale-110 duration-300" />
              <h3 className="font-semibold text-2xl">Step 01.</h3>
              <p className="text-center">
                Vegetables are an integral part of the human diet. They are
                extremely useful because of the high content of carbohydrates,
                various acids, vitamins and active elements in the form, easy
                for digestion.
              </p>
            </div>
            <div className="py-28 px-12 text-white w-full md:w-2/4 flex flex-col items-center space-y-4 bg-[#91ac41]">
              <FaPaintBrush
                size={96}
                className="hover:scale-110 duration-300"
              />
              <h3 className="font-semibold text-2xl">Step 02.</h3>
              <p className="text-center">
                Fresh tomatoes are ideal for replenishing the loss of minerals.
                These vegetables contain a lot of acids that our body needs for
                full-fledged work.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full lg:w-2/4 gap-2">
            <div className="py-28 px-12 text-white w-full md:w-2/4 flex flex-col items-center space-y-4 bg-[#e4b476]">
              <FaShoppingBag
                size={96}
                className="hover:scale-110 duration-300"
              />
              <h3 className="font-semibold text-2xl">Step 03.</h3>
              <p className="text-center">
                In the content of vitamin C, sweet peppers are superior to
                lemons and even black currants! The greatest amount of vitamin
                is contained around the stalk, that is, in the part of the
                product that is usually cut during cleaning.
              </p>
            </div>
            <div className="py-28 px-12 text-white w-full md:w-2/4 flex flex-col items-center space-y-4 bg-[#f69dad]">
              <FaRegSmile size={96} className="hover:scale-110 duration-300" />
              <h3 className="font-semibold text-2xl">Step 04.</h3>
              <p className="text-center">
                If you sometimes eat hot chili peppers, this will help normalize
                cerebral circulation, ease the condition with bronchial asthma,
                cough, sore throat, flu.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center bg-[#f7eee2] py-16 w-full">
        <div className="w-full max-w-[1640px] mx-auto flex flex-col justify-between items-center gap-2 p-4">
          <p className="text-[#91ac41] text-2xl mt-9">Fresh Food</p>
          <h3 className="text-5xl font-semibold mb-2 text-center">
            Our Vegan Store!
          </h3>
          <p className="font-medium text-gray-1 space-x-2 mb-14 text-center">
            Radish contains a lot of fiber, pectin and mineral salts.
          </p>
          <div className="flex justify-stretch my-0 mx-auto flex-col md:flex-row">
            <div className="w-full md:w-1/4 text-center p-6">
              <div className="inline-block bg-[#e3b375] rounded-full p-10 text-white duration-300">
                <FaCamera size={60} className="hover:scale-110 duration-300" />
              </div>
              <h3 className="font-semibold text-2xl">Fresh Vegetables</h3>
              <p className="font-medium text-gray-1 tracking-wider">
                Use for cooking several types of vegetable oil.
              </p>
            </div>
            <div className="w-full md:w-1/4 text-center p-6">
              <div className="inline-block bg-[#e3b375] rounded-full p-10 text-white duration-300">
                <FaRocket size={60} className="hover:scale-110 duration-300" />
              </div>
              <h3 className="font-semibold text-2xl">High Quality</h3>
              <p className="font-medium text-gray-1 tracking-wider">
                This is the best source of essential fatty acids for the body.
              </p>
            </div>
            <div className="w-full md:w-1/4 text-center p-6">
              <div className="inline-block bg-[#e3b375] rounded-full p-10 text-white duration-300">
                <FaTwitter size={60} className="hover:scale-110 duration-300" />
              </div>
              <h3 className="font-semibold text-2xl">Sale</h3>
              <p className="font-medium text-gray-1 tracking-wider">
                It is very good, if in the kitchen there will always be several
                bottles with different oils.
              </p>
            </div>
            <div className="w-full md:w-1/4 text-center p-6">
              <div className="inline-block bg-[#e3b375] rounded-full p-10 text-white duration-300">
                <FaWeixin size={60} className="hover:scale-110 duration-300" />
              </div>
              <h3 className="font-semibold text-2xl">Best Price</h3>
              <p className="font-medium text-gray-1 tracking-wider">
                Remember that unrefined oils are not suitable for heat
                treatment.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="testimonials-section"
        className="flex justify-center py-16 w-full"
      >
        <div className="w-full max-w-[1640px] mx-auto flex flex-col justify-between items-center gap-2 p-4">
          <p className="text-[#91ac41] text-2xl mt-9">Fresh Food</p>
          <h3 className="text-5xl font-semibold mb-2 text-center">
            Our Vegan Shop!
          </h3>
          <p className="font-medium max-w-[700px] mb-14 text-gray-1">
            According to experts, any habit can be formed in 21 days. The same
            statement applies to healthy eating.
          </p>
          <div className="w-full max-w-6xl my-0 mx-auto flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-1/4 flex flex-col justify-center items-center text-center bg-[#f5f6fb] py-10 px-8 m-4 rounded-tl-[45px] rounded-bl-[45px] rounded-br-[45px] duration-300 transition-shadow">
              <img
                className="w-20 mb-6 rounded-full"
                src="https://mobirise.com/extensions/organicamp/assets/images/face5.jpg"
                alt="img1"
              />
              <p className="text-sm text-gray-1 italic m-0">
                Sales consultants are very polite. Many of the products have
                tried and are ready to prompt and recommend to customers. The
                staff shows that they completely share the philosophy of proper
                nutrition, if you can say so.
              </p>
              <h3 className="uppercase font-semibold mt-6 mb-0">
                VERONICA KING
              </h3>
              <p className="color-gray-1 text-xs italic">Cook</p>
            </div>
            <div className="w-full md:w-1/4 flex flex-col justify-center items-center text-center bg-[#f5f6fb] py-10 px-8 m-4 rounded-tl-[45px] rounded-bl-[45px] rounded-br-[45px] duration-300 transition-shadow">
              <img
                className="w-20 mb-6 rounded-full"
                src="https://mobirise.com/extensions/organicamp/assets/images/face6.jpg"
                alt="img2"
              />
              <p className="text-sm text-gray-1 italic m-0">
                The assortment is very wide. From useful organic oils, cereals
                and teas to specific products for vegetarians, such as sausages
                and pies without meat.
              </p>
              <h3 className="uppercase font-semibold mt-6 mb-0">JIM CASH</h3>
              <p className="color-gray-1 text-xs italic">Seller</p>
            </div>
            <div className="w-full md:w-1/4 flex flex-col justify-center items-center text-center bg-[#f5f6fb] py-10 px-8 m-4 rounded-tl-[45px] rounded-bl-[45px] rounded-br-[45px] duration-300 transition-shadow">
              <img
                className="w-20 mb-6 rounded-full"
                src="https://mobirise.com/extensions/organicamp/assets/images/face7.jpg"
                alt="img3"
              />
              <p className="text-sm text-gray-1 italic m-0">
                I want to say a huge thank you to the management of the store
                and all its employees, I'm not a vegetarian, it would seem that
                the store is not for me, but it's not so, any person who comes
                here will find something useful.
              </p>
              <h3 className="uppercase font-semibold mt-6 mb-0">
                PETER GOODMAN
              </h3>
              <p className="color-gray-1 text-xs italic">Manager</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-stretch border-b-2 w-full">
        <div className="w-full mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-full lg:w-4/6 inline-block m-0 h-full">
            <img
              src="https://mobirise.com/extensions/organicamp/assets/images/19.jpg"
              alt="fruit"
              className="w-full"
            />
          </div>
          <div className="w-full lg:w-1/3 m-0 h-full flex justify-center bg-[#f6fcfa] bg-[url('https://edyoda.s3.ap-south-1.amazonaws.com/public/strawberry-white.png')] bg-left bg-cover">
            <div className="max-w-[1024px] m-8">
              <h3 className="text-4xl font-semibold">Follow Us</h3>
              <p className="text-gray-1 pt-2">
                A wide range of products; many unusual and tasty products;
                courteous staff.
              </p>
              <input
                placeholder="Your Email"
                className="w-full rounded font-medium bg-white p-3 text-gray-1 mt-8 lg:mt-14 block"
              />
              <input
                type="submit"
                value="Subscribe"
                className="bg-[#f69dad] py-4 px-10 rounded cursor-pointer text-white border-none text-sm font-semibold uppercase mt-4 hover:bg-transparent hover:text-[#f69dad] border-2 hover:border-solid hover:border-[#f69dad]"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <section id="stats-section">
        <div id="stats-wrapper">
          <div className="stats-item">
            <h3>7</h3>
            <p>Year of experiences</p>
          </div>
          <div className="stats-item">
            <h3>123k</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stats-item">
            <h3>72k</h3>
            <p>100% Satisfaction</p>
          </div>
          <div className="stats-item">
            <h3>13k</h3>
            <p>Detox Smoothies</p>
          </div>
        </div>
      </section> */}
      <section className="block py-10">
        <div className="w-full max-w-6xl my-0 mx-auto text-center">
          {/* <h3 className="text-gray-1 text-4xl">Vimeo Video</h3>
          <div
            id="line-separator"
            className="w-24 inline-block h-[1px] bg-[#e4b476] mb-9"
          ></div> */}
          <iframe
            title="vimeo"
            src="https://player.vimeo.com/video/275412279"
            frameBorder="0"
            className="w-full h-52 md:h-[425px]"
            allow="autoplay"
          ></iframe>
        </div>
      </section>
      <section className="flex justify-center shadow-sm border-b-2">
        <div className="w-full max-w-[1640px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-y-2 p-4">
          <div className="w-full lg:w-2/4">
            <p className="text-green-1 text-2xl font-caveat mt-9">Contact Us</p>
            <h3 className="text-[44px] m-0">Address Information</h3>
            <p className="text-gray-1 tracking-wide">
              Overeating is one of the most common causes of overweight and
              digestive problems.
            </p>
            <h4 className="text-2xl font-semibold m-0 mt-8">London Store</h4>
            <p className="text-gray-1 tracking-wide m-0 leading-loose">
              Roeterseiland Campus Building E <br />
              6th floor London <br />
              Monday to Friday : 9am to 8pm <br />
              examplemail.mail.com
            </p>
            <h4 className="text-2xl font-semibold m-0 mt-8">Berlin Store</h4>
            <p className="text-gray-1 tracking-wide m-0 leading-loose">
              Roeterseiland Campus Building E <br />
              6th floor London <br />
              Monday to Friday : 9am to 8pm <br />
              examplemail.mail.com
            </p>
          </div>
          <div className="w-full lg:w-2/4">
            <p className="text-green-1 text-2xl font-caveat mt-9">
              Meet Our Team
            </p>
            <h3 className="text-[44px] m-0">Get In Touch</h3>
            <p className="text-gray-1 tracking-wide">
              The task of proper nutrition - to remove from the diet harmful
              food and enrich it useful.
            </p>
            <form className="space-y-6 pt-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  required=""
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1234567890"
                  required=""
                />
                <ValidationError
                  prefix="Phone"
                  field="phone"
                  errors={state.errors}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Subject
                </label>
                <input
                  type="subject"
                  name="subject"
                  id="subject"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Subject"
                  required=""
                />
                <ValidationError
                  prefix="Subject"
                  field="subject"
                  errors={state.errors}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email*
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Message*
                </label>
                <textarea
                  type="message"
                  name="message"
                  id="message"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="message.."
                  required=""
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>
              <input
                id="btn-submit"
                className="font-semibold text-white bg-green-1 hover:bg-green-2 py-2 px-8 border-none rounded cursor-pointer"
                type="submit"
                value="Submit Now"
                disabled={state.submitting}
              />
            </form>
          </div>
        </div>
      </section>
      <footer className="bg-[#232323] text-white text-sm text-center py-5">
        © Copyright 2023 Nikunj Bhuva - All Rights Reserved
      </footer>
    </>
  );
};

export default Dashboard;
