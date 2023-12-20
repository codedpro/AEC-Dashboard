import React from "react";
import { AdminLayout } from "@layout";
import SectionCard from "@components/SectionCard";

const Home = () => {
  const sections = [
    /*  {
      title: "PM",
      image: "https://hilineabseiling.co.uk/images/antenna/mast-cleaning1.jpg",
      link: "/",
      overlayColor: "green-200",
      subcategories: [
        { title: "PM File", link: "/PM-File" },
        { title: "PDH", link: "/PHD" },
        { title: "Tx and Poi", link: "/Tx-and-Poi" },
        { title: "FPA", link: "/FPA" },
        { title: "BSC", link: "/BSC" },
      ],
    }, */
    {
      title: "Battery",
      image: "/assets/img/battery-200AH.jpg",
      link: "/Battery",
      overlayColor: "yellow-200",
    },
    {
      title: "Vandalism",
      image: "/assets/img/vandalism.jpg",
      link: "/Vandalism",
      overlayColor: "purple-200",
    },
    {
      title: "CM",
      image: "/assets/img/cm.jpg",
      link: "/CM",
      overlayColor: "teal-200",
    },
    {
      title: "DSM",
      image: "/assets/img/Microwave-2.jpeg",
      link: "/dsm",
      overlayColor: "orange-200",
    },
    {
      title: "Data Base",
      image: "/assets/img/database.jpg",
      link: "/DataBase",
      overlayColor: "indigo-200",
    },
    /*
    {
      title: "File Manager",
      image: "https://hdc-co.com/wp-content/uploads/2020/10/Microwave-2.jpg",
      link: "/FileManager",
      overlayColor: "gray-200",
    },
    {
      title: "User Management",
      image: "https://hdc-co.com/wp-content/uploads/2020/10/Microwave-2.jpg",
      link: "/User-Management",
      overlayColor: "cyan-200",
    },
    */
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mt-2 inherit2">
        {sections.map((section, index) => (
          <SectionCard key={index} {...section} />
        ))}
      </div>
    </AdminLayout>
  );
};

export default Home;
