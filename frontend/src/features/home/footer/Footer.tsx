import { FooterHead } from "./FooterHead";
import { Column } from "./Column";
import { FooterFoot } from "./FooterFoot";



export const Footer = () => {
  return (
    <footer>
      <div className=" sm:pt-24 lg:px-8 lg:pt-32 pt-10">
        <div className=" flex justify-around items-center flex-wrap">
          <FooterHead />
          <div className="flex flex-wrap gap-15 max-lg:justify-center max-lg:gap-10">
              <Column
                heading="Solutions"
                arr={['Task Tracking', 'Project Management', 'Team Collaboration', 'Analytics']}
              />
              <Column
                heading="Support"
                arr={['Documentation', 'Guides', 'API Status', 'Contact Us']}
              />
              <Column
                heading="Company"
                arr={['About', 'Blog', 'Careers', 'Press']}
              />
              <Column
                heading="Legal"
                arr={['Privacy Policy', 'Terms of Service', 'Cookie Policy']}
              />
          </div>
        </div>
        <FooterFoot/>
      </div>
    </footer>
  );
};
