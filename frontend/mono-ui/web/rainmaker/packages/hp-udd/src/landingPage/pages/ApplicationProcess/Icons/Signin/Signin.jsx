import PropTypes from "prop-types";
import React from "react";
export const Signin = ({ color = "#334870", className }) => {
  return (
    <svg
      className={`signin ${className}`}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M17.7075 16.7075L12.7075 21.7075C12.6146 21.8004 12.5043 21.8741 12.3829 21.9244C12.2615 21.9747 12.1314 22.0006 12 22.0006C11.8686 22.0006 11.7385 21.9747 11.6171 21.9244C11.4957 21.8741 11.3854 21.8004 11.2925 21.7075C11.1996 21.6146 11.1259 21.5043 11.0756 21.3829C11.0253 21.2615 10.9994 21.1314 10.9994 21C10.9994 20.8686 11.0253 20.7385 11.0756 20.6171C11.1259 20.4957 11.1996 20.3854 11.2925 20.2925L14.5863 17H3C2.73478 17 2.48043 16.8946 2.29289 16.7071C2.10536 16.5196 2 16.2652 2 16C2 15.7348 2.10536 15.4804 2.29289 15.2929C2.48043 15.1054 2.73478 15 3 15H14.5863L11.2925 11.7075C11.1049 11.5199 10.9994 11.2654 10.9994 11C10.9994 10.7346 11.1049 10.4801 11.2925 10.2925C11.4801 10.1049 11.7346 9.99944 12 9.99944C12.2654 9.99944 12.5199 10.1049 12.7075 10.2925L17.7075 15.2925C17.8005 15.3854 17.8742 15.4957 17.9246 15.6171C17.9749 15.7385 18.0008 15.8686 18.0008 16C18.0008 16.1314 17.9749 16.2615 17.9246 16.3829C17.8742 16.5043 17.8005 16.6146 17.7075 16.7075ZM24 4H17C16.7348 4 16.4804 4.10536 16.2929 4.29289C16.1054 4.48043 16 4.73478 16 5C16 5.26522 16.1054 5.51957 16.2929 5.70711C16.4804 5.89464 16.7348 6 17 6H24V26H17C16.7348 26 16.4804 26.1054 16.2929 26.2929C16.1054 26.4804 16 26.7348 16 27C16 27.2652 16.1054 27.5196 16.2929 27.7071C16.4804 27.8946 16.7348 28 17 28H24C24.5304 28 25.0391 27.7893 25.4142 27.4142C25.7893 27.0391 26 26.5304 26 26V6C26 5.46957 25.7893 4.96086 25.4142 4.58579C25.0391 4.21071 24.5304 4 24 4Z"
        fill={color}
      />
    </svg>
  );
};

Signin.propTypes = {
  color: PropTypes.string,
};
