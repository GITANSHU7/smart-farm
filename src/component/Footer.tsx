"use client";

import { Footer } from "flowbite-react";

const AppFooter: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex mt-0 -mb-10">
      <div className="flex-grow">{/* Your main content goes here */}</div>
      <Footer container className="mt-auto ">
        <Footer.Copyright
          by="Made With 💓 by Smart Farm"
          year={year}
        />
        {/* <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup> */}
      </Footer>
    </div>
  );
}

export default AppFooter;
