import { Link, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import RightNav from "../components/layout-component/RightNav";
import { WiDirectionLeft } from "react-icons/wi";
 

const NewsDetail = () => {
  const detailsData = useLoaderData();
  const  news = detailsData.data[0];
  // console.log(news);
  return (
    <div>
      <header className="my-8">
        <Header></Header>
      </header>
      <main className="w-10/12 mx-auto">
        <div className="grid grid-cols-12">
          <section className="col-span-9">
            <h1 className="font-semibold text-xl"> Dragon News</h1>
            <div className=" p-4 bg-white rounded-lg shadow-md"> 
              {/* Thumbnail Image */}
              <img
                src={news.image_url}
                alt="Thumbnail"
                className="w-full  object-cover rounded-lg mb-4"
              />
               {/* Title */}
               <h2 className="text-xl font-semibold mb-2">{news.title}</h2>

              {/* Details */}
              <p className="text-gray-700 text-sm mb-4">
                {news.details}
              </p>
            <button>< Link to={`/category/${news.category_id}`} className="btn flex items-center rounded-none text-lg font-semibold text-white btn-error">
            <span><WiDirectionLeft size={35}></WiDirectionLeft></span>All news in this category</ Link></button>
            </div>
          </section>
          <aside className="col-span-3">
            <RightNav></RightNav>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default NewsDetail;
