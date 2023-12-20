import type { NextPage } from "next";
import { AdminLayout } from "@layout";
import React from "react";
import { userService } from "src/services";
import { FaAddressCard, FaAsymmetrik, FaIdCard, FaLaptop, FaMailBulk, FaPhone, FaPhoneSlash, FaUser } from "react-icons/fa";
import Image from "next/image";
const IDCard: NextPage = () => {
  const username = userService.getUsername();
  const firstName = userService.getFirstName();
  const lastName = userService.getLastName();
  const role = userService.getRole();
return (
  <AdminLayout>
    <div className="flip-container centered">
      <div className="flipper">
        <div className="front flex flex-row"></div>
        <div className="back">
        <div className="id-avatar">
              <Image
                fill
                className="rounded-circle "
                src="/assets/img/avatars/avatarempty.jpg"
                alt="user@email.com"
              />
            </div>
            <div className="flex namecontainer">
            <h1 className="namesure" >امیرحسین نوری</h1>
            <h1 className="qsnamesure">:نام و نام خانوادگی </h1>
            <FaUser className="qsnamesureico"/> 
            </div>
            <div className="flex rolecontainer">
          <p className="roleid">برنامه نویس</p>
          <p className="roleqs"> :سمت</p>
          <FaLaptop className="cards-icon"/> 
          </div>
          <div className="flex rolecontainerid">
            <span className="contactcode">2051340013</span>
            <p className="roleqsid">:کدملی</p>
            <FaIdCard className="cards-icon"/> 
            </div>
          </div>      
      </div>
    </div>
  </AdminLayout>
);
};

export default IDCard;
