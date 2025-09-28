import React from 'react';
import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";

function Footer(props) {
    const QLink = ({text, path}) =>{
        return (
            <Link href={path} className={`text-[#AAAAAA] font-medium font-lato text-[14px] mb-[14px]`}>
                {text}
            </Link>
        );
    }
    return (
        <div className={`bg-[#8A1739] p-[64px] rounded-tl-[100px]`}>

            <div className={`flex flex-row justify-between`}>
                <div className={`max-w-[368px]`}>
                    <Logo/>
                    <div className={`mt-[16px] text-[#AAAAAA] font-medium font-lato text-[14px]`}>
                        Distinguished leader in Qatar's hospitality and food
                        & beverage industry, delivering unparalleled culinary
                        experiences.
                    </div>
                    <div className={`mt-[28px] text-white font-medium playfair text-[16px]`}>
                        Connect With Us
                    </div>
                    <div className={'flex flex-row gap-[24px] mt-[16px]'}>
                        <Image
                            src={'/fb.png'}
                            alt={'Facebook logo'}
                            width={14}
                            height={16}
                            className={`cursor-pointer`}
                        />
                        <Image
                            src={'/insta.png'}
                            alt={'Instagram logo'}
                            width={20}
                            height={16}
                            className={`cursor-pointer`}
                        />
                        <Image
                            src={'/youtube.png'}
                            alt={'Youtube logo'}
                            width={29}
                            height={16}
                            className={`cursor-pointer`}
                        />
                    </div>
                </div>

                <div className={`flex flex-col`}>
                    <div className={`playfair font-medium text-[16px] text-white mb-[24px]`}>
                        Quick Links
                    </div>
                    <QLink text={"Services & Leisures"} path={'#'}/>
                    <QLink text={"Our Restaurants"} path={'#'}/>
                    <QLink text={"About Us"} path={'#'}/>
                    <QLink text={"Contacts"} path={'#'}/>
                    <QLink text={"Projects"} path={'#'}/>
                    <QLink text={"Careers"} path={'#'}/>

                </div>

                <div className={`flex flex-col`}>
                    <div className={`playfair font-medium text-[16px] text-white mb-[24px]`}>
                        Restaurant Categories
                    </div>
                    <QLink text={"Home-grown Restaurants"} path={'#'}/>
                    <QLink text={"Franchised Restaurants"} path={'#'}/>
                    <QLink text={"Virtual Restaurants"} path={'#'}/>
                    <QLink text={"Surrey Suites"} path={'#'}/>
                    <QLink text={"Munia Catering"} path={'#'}/>
                </div>

                <div className={`flex flex-col max-w-[305px]`}>
                    <div className={`playfair font-medium text-[16px] text-white mb-[24px] uppercase`}>
                        Stay Connected
                    </div>
                    <div className={` text-[#AAAAAA] font-medium font-lato text-[14px]`}>
                        Subscribe to our newsletter for updates on new restaurants and exclusive offers.
                    </div>

                        <input
                            type="email"
                            placeholder="jhon@gmail.com"
                            className="font-lato text-[12px] text-[##7D7D7D] p-[9px] rounded-tl-[16px] rounded-br-[16px] my-[20px] bg-white"
                        />
                    <div className="w-full flex justify-end">
                        <button
                            className="cursor-pointer font-medium text-[16px] playfair text-white py-[10px] px-[24px] border border-white rounded-tl-[16px] rounded-br-[16px]"
                        >
                            Subscribe
                        </button>
                    </div>

                </div>
            </div>

            <hr className="border-0 h-[1px] bg-[#D4AF37] my-4" />

            <div className={`flex flex-row justify-between mt-[36px] text-[#A7A7A7] font-lato text-[10px] leading-[16px]`}>
                <div>
                    © 2025 ABC Ventures. All rights reserved.
                </div>
                <div className={`flex flex-row gap-[24px]`}>
                    <div>Terms of Use</div>
                    <div>Privacy Policy</div>
                    <div>Back to Top</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;