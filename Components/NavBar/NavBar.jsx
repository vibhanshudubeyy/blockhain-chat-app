import React, {useEffect, useState, useContext} from 'react'
import Image from "next/image";
import Link from "next/link";

import images from "../../assets";
import { Model, Error } from '../index';
import Style from './NavBar.module.css'
import { ChatAppContext } from '@/Context/ChatAppContext';


const NavBar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "/",
    },
    {
      menu: "Chat",
      link: "/",
    },
    {
      menu: "Contact",
      link: "/",
    },
    {
      menu: "Settings",
      link: "/",
    },
    {
      menu: "Terms and Conditions",
      link: "/",
    },
    {
      menu: "FAQs",
      link: "/",
    }
  ];

  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, ConnectWallet } = useContext(ChatAppContext);
  return (
    <div className ={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt='logo' width={50} height={50}></Image>
        </div>
        <div className={Style.NavBar_box_right}>
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((ele, i) => (
				<div
					onClick={ () => setActive(i + 1)}
					key={i + 1}
					className={`${Style.NavBar_box_right_menu_items} ${active == i + 1 ? Style.active_btn : ""}`}
				>

					<Link className={Style.NavBar_box_right_menu_items_link}
						href={ele.link}>
							{ele.menu}
					</Link>
				</div>
			))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
