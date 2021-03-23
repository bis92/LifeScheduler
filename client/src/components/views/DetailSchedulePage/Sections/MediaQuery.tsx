import React from "react"
import { useMediaQuery } from "react-responsive"

const Mobile :React.FC = ({children}) => {
const isMobile = useMediaQuery({
  query : "(max-width:767px)"
});

return <React.Fragment>{isMobile && children}</React.Fragment>
}

const Tablet :React.FC = ({children}) => {
  const isTablet = useMediaQuery({
    query : "(min-width:768px) and (max-width:969px)"
  });
  
  return <React.Fragment>{isTablet && children}</React.Fragment>
  }

  const Tablet2 :React.FC = ({children}) => {
    const isTablet2 = useMediaQuery({
      query : "(min-width:970px) and (max-width:1739px)"
    });
    
    return <React.Fragment>{isTablet2 && children}</React.Fragment>
    }


const PC :React.FC = ({children}) => {
const isPc = useMediaQuery({
  query : "(min-width:1740px) "
});
return <React.Fragment>{isPc && children}</React.Fragment>
}

export  {Mobile,PC, Tablet, Tablet2};