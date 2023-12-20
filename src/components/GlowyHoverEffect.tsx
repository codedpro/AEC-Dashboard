import Link from "next/link";
import React from "react";

const GlowyHoverEffect: React.FC = () => {
  return (
    <section className="wrapper">
      <div className="container">
        <div className="col text-center mb-5">
          <h1 className="text-4xl font-bold md:text-6xl">PDH - R1</h1>
        </div>

        <div className="reg-cards grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Link 1 */}
          <Link href="/#">
            <div className="col-span-1 mb-4">
              <div
                className="card text-dark card-has-bg click-col bg-cover h-64 md:h-80"
                style={{
                  backgroundImage:
                    "url('https://hdc-co.com/wp-content/uploads/2020/10/Microwave-2.jpg')",
                }}
              >
                <img
                  className="card-img hidden"
                  src="https://hdc-co.com/wp-content/uploads/2020/10/Microwave-2.jpg"
                  alt="Gilan"
                />
                <div className="card-img-overlay flex flex-col justify-end h-full">
                  <div className="card-body">
                    <h4 className="card-title mt-0 text-white">Gilan</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Link 2 */}
          <Link href="/#">
            <div className="col-span-1 mb-4">
              <div
                className="card text-dark card-has-bg click-col bg-cover h-64 md:h-80"
                style={{
                  backgroundImage:
                    "url('https://www.giantbomb.com/a/uploads/scale_small/9/93538/1647845-acme_photo_radio_tower_02.1100822_std.jpg')",
                }}
              >
                <img
                  className="card-img hidden"
                  src="https://www.giantbomb.com/a/uploads/scale_small/9/93538/1647845-acme_photo_radio_tower_02.1100822_std.jpg"
                  alt="Mazandaran-West"
                />
                <div className="card-img-overlay flex flex-col justify-end h-full">
                  <div className="card-body">
                    <h4 className="card-title mt-0 text-white">Maz - West</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Link 3 */}
          <Link href="/#">
            <div className="col-span-1 mb-4">
              <div
                className="card text-dark card-has-bg click-col bg-cover h-64 md:h-80"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1587320122541-ce3e46f6fe60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80')",
                }}
              >
                <img
                  className="card-img hidden"
                  src="https://images.unsplash.com/photo-1587320122541-ce3e46f6fe60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  alt="Mazandaran-East"
                />
                <div className="card-img-overlay flex flex-col justify-end h-full">
                  <div className="card-body">
                    <h4 className="card-title mt-0 text-white">Maz - East</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Link 4 */}
          <Link href="/#">
            <div className="col-span-1 mb-4">
              <div
                className="card text-dark card-has-bg click-col bg-cover h-64 md:h-80"
                style={{
                  backgroundImage:
                    "url('https://img.washingtonpost.com/rf/image_1024w/2010-2019/WashingtonPost/2014/05/23/Local/Images/tower11400868061.jpg?uuid=NqAxLOKkEeOUQlQYm_GoCQ')",
                }}
              >
                <img
                  className="card-img hidden"
                  src="https://img.washingtonpost.com/rf/image_1024w/2010-2019/WashingtonPost/2014/05/23/Local/Images/tower11400868061.jpg?uuid=NqAxLOKkEeOUQlQYm_GoCQ"
                  alt="Golestan"
                />
                <div className="card-img-overlay flex flex-col justify-end h-full">
                  <div className="card-body">
                    <h4 className="card-title mt-0 text-white">Golestan</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GlowyHoverEffect;
