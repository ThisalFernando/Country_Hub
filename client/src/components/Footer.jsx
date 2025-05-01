import CHLogo from "../asserts/CountryHubLogo(png).png";
import facebook from "../asserts/facebook.svg";
import instagram from "../asserts/instagram.svg";
import twitter from "../asserts/twitter.svg";

const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];

const Footer = () => {
    return (
      <footer className="bg-blue-700 text-white font-bold text-center p-5 mt-0 flex flex-col items-center">
        
          {/* Footer Image */}
          <a href='https://res.cloudinary.com/fmart/image/upload/v1745471470/CountryHubLogo_xpgvql.png' className='flex font-semibold font-montserrat leading-normal items-center text-xl text-coral-red' >
            <img src={ CHLogo } alt='logo' width={200} height={200} /> 
          </a>

          {/* Social Media Links */}
          <p className="text-black font-semibold text-lg animate-fadeInUp delay-100">
            Follow us on
          </p>
          <div className="flex justify-center mt-5 animate-fadeInUp delay-100">
            <div className="flex items-center gap-7">
              {socialMedia.map((icon) => (
                <div
                  className="flex justify-center items-center w-12 h-12 bg-white rounded-2xl"
                  key={icon.alt}
                >
                  <a href="https://res.cloudinary.com/fmart/image/upload/v1745471470/CountryHubLogo_xpgvql.png">
                    <img src={icon.src} alt={icon.alt} width={24} height={24} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        
          <p className="pt-10">&copy; {new Date().getFullYear()} Country Hub. All rights reserved.</p>
        
      </footer>
    );
  };
  
export default Footer;