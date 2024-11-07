import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#F5F5F5] container mx-auto px-4 py-8 max-w-6xl">
            <div className=" rounded-lg shadow-lg h-[100vh] p-6">
                <h1 className="text-3xl font-bold text-center mb-8 text-[#333333]">
                    Big City Catering
                </h1>
                <div className="mb-6 flex flex-row">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        <div
                            className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            onClick={() => navigate('/recipes')}
                        >
                            <div className="overflow-hidden rounded-t-lg h-200">
                                <img src="https://assets.bonappetit.com/photos/5c2f8fe26558e92c8a622671/1:1/w_1920,c_limit/bolognese-1.jpg" className="h-[150px] w-full" alt="Recipes" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[#333333] mb-2">
                                    Recipes
                                </h3>
                            </div>
                        </div>
                        <div
                            className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            onClick={() => navigate('/manuals')}
                        >
                            <div className="overflow-hidden rounded-t-lg h-200">
                                <img src="https://www.sefiles.net/merchant/5418/images/site/Manual.JPG" className="h-[150px] " alt="Manuals" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[#333333] mb-2">
                                    Manuals
                                </h3>
                            </div>
                        </div>
                        <div
                            className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            onClick={() => navigate('/guides')}
                        >
                            <div className="overflow-hidden rounded-t-lg">
                                <img src="https://media.istockphoto.com/id/1343795805/vector/guide-with-colorful-bookmarks.jpg?s=612x612&w=0&k=20&c=fMfYIv-d31V6Rvwm7N7OXjdfAf_GLj3usxitJH7tdUM=" className="h-[150px] w-full" alt="Guides" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[#333333] mb-2">
                                    Guides
                                </h3>
                            </div>
                        </div>
                        <div
                            className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            onClick={() => navigate('/policies')}
                        >
                            <div className="overflow-hidden rounded-t-lg flex items-center justify-center">
                                <img src="https://www.assentriskmanagement.co.uk/wp-content/uploads/2023/10/Which-Policies-do-I-need-to-Display-on-my-Website-scaled.jpeg" className="h-[150px] w-full" alt="Policies" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[#333333] mb-2">
                                    Policies
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;