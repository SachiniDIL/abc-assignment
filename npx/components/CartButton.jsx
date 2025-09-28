import React, {useState} from 'react';
import Image from 'next/image';

function CartButton(props) {
    const [cartItems, setCartItems] = useState(0);

    return (
        <div className={`cursor-pointer flex flex-row gap-[8px] bg-[#8A1739] py-[8px] px-[24px] rounded-tl-2xl rounded-br-2xl`}>
            <Image
                src={'/cart.png'}
                alt="cart"
                width={20}
                height={20}
            />
            <div className={`poppins font-medium text-[16px] text-white`}>
                {cartItems} Items
            </div>
        </div>
    );
}

export default CartButton;