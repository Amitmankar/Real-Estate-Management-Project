import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';



const teamMembers = [
    {
        name: 'Ankit Mohapatra',
        title: 'CEO and Founder',
        description: 'Ankit has over 15 years of experience in the real estate industry, with a proven track record of successfully managing a diverse portfolio of properties.',
    },
    {
        name: 'Nikhitha Adigopula',
        title: 'CO-Founder',
        description: 'Nikhitha also has over 15 years of experience in the real estate industry and also has been Collaborate with other founders to define the companys vision, mission, and strategic objectives.',
    },
    {
        name: 'Amit Mankar',
        title: 'Executive Director',
        description: 'Amit  has over 15 years of experience.He Develop and implement strategic plans to achieve the organization goals, including growth, profitability, and market expansion.',
    },
];
const AboutUs = () => {
    return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
        <div className="max-w-7xl mx-auto p-8">
            <section className="text-center">
                <h1 className="text-5xl font-bold mb-6">
                    About Our Real Estate Management Company
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-10">
                    At our Real Estate Management System, we are dedicated to providing exceptional property management services to our clients. 
                    Our mission is to ensure the smooth and efficient operation of your properties, allowing you to focus on your investment goals.
                </p>
                <div className="bg-gray-100 p-6 rounded-lg inline-block">
                    <button className="bg-white text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md mb-4">
                        Our Values
                    </button>
                    <p className="text-gray-500 text-base">
                        Integrity, Transparency, and Professionalism are the core values that guide our team in delivering 
                        the best possible service to our clients.
                    </p>
                </div>
            </section>
            <section className="text-center mt-16">
                <h2 className="text-4xl font-semibold mb-8">
                    Meet Our Team
                </h2>
                <div className="flex flex-wrap justify-center">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4 p-6">
                            <div className="flex justify-center">
                                <div className="rounded-full bg-gray-200 w-24 h-24 mb-4"></div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                            <p className="text-gray-600 mb-2">{member.title}</p>
                            <p className="text-gray-600 text-sm">{member.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
        <Footer />
    </div>
    );
};

export default AboutUs;
