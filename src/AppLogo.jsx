import Logo from '/social-app.png';

function AppLogo({ logoSize }) {

    const sizeMap = {
        1: 'size-12 rounded-bl-[2pc] rounded-[0.3pc] ',
        2: 'size-24 rounded-bl-[4pc] rounded-[0.6pc] ',
        3: 'size-36 rounded-bl-[6pc] rounded-[0.9pc] ',
        4: 'size-48 rounded-bl-[8pc] rounded-[1.2pc] ',
        5: 'size-60 rounded-bl-[10pc] rounded-[1.5pc] ',
    };

    return (
        <img src={Logo} className={sizeMap[logoSize] + 'opacity-80 shadow-xl'} ></img >
    );

}

export default AppLogo;