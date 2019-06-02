import React from "react";
import parse from "html-react-parser";

export default function GoogleFrame(props) {
    const address = `${props.city} ${props.street}`;
    const encode = encodeURIComponent(address);
    const map = `<iframe
            width="700"
            height="440"
            src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=${encode}+(Tytu%C5%82)&amp;ie=UTF8&amp;t=k&amp;z=12&amp;iwloc=B&amp;output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            title="map"
        />`;
    return <>{parse(map)}</>;
}
