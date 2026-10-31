import background from "../images/featured/bg.png";
import image1 from "../images/featured/1.png";
import image2 from "../images/featured/2.png";
import image3 from "../images/featured/3.png";
import image4 from "../images/featured/4.png";
import image5 from "../images/featured/5.png";
import image6 from "../images/featured/6.png";
import { ClockIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { Utensils, Martini } from 'lucide-react';

const featuredImages = [image1, image2, image3, image4, image5, image6];

const restaurant = {
    name: "Coastal Canteen",
    town: "Manasquan, NJ",
    website: "https://www.coastalcanteennj.com/",
    description: "Coastal Canteen is a seafood and coastal American restaurant located on Main Street in Manasquan, New Jersey. Enjoy fresh seafood, handcrafted cocktails, seasonal menus, happy hour, and live music just minutes from the Jersey Shore.",
    dayText: "Monday - Friday",
    timeText: "4:00PM - 6:00PM",
    address1: "142 Main Street",
    address2: "Manasquan, NJ 08736",
    deals: "50% Off Draft Beer/$5 House Wines/$7 Aperol Spritz/$7 Tito's Drinks/25% Off Appetizers",
    specials: "<b>Monday<b>: $25 Burger + Beer or Wine + Soup or Salad/<b>Tuesday<b>: Tasting Tuesday - Assorted Small Plate Creations/<b>Wednesday<b>: Raw Bar & Seafood Focused Specials/<b>Thursday<b>: Ladies Night - $8 Margaritas & Espresso Martinis/<b>Friday & Saturday<b>: Live Music/<b>Sunday<b>: Gameday Specials - $8 Tito's Drinks, Hugo Spritz and House Wines, Half Priced Domestic Drafts",
    link: "https://static1.squarespace.com/static/674e50c92502920e4fa0083b/t/6a31971c8d2cd7397ad8c6ba/1781634844508/Happy+Hour+%285+x+7+in%29.pdf",
    longitude: -74.0494702,
    latitude: 40.1227831,
    images: [],
}

const ListText = ({ text, bulletPoints = true }) => {
    if (!text) return null;
    const items = text.split("/").map((item) => item.trim());
    return (
        <ul className={bulletPoints ? "list-disc space-y-1 pl-5" : "space-y-1"}>
            {items.map((text, idx) => (
                <li
                    key={idx}
                    className={
                        bulletPoints
                            ? undefined
                            : `py-2 ${idx < items.length - 1 ? "border-b border-gray-300" : ""}`
                    }
                >
                    {text.split(/(<b>.*?<b>)/g).map((part, partIdx) => {
                        const boldText = part.match(/^<b>(.*?)<b>$/);
                        return boldText
                            ? <strong key={partIdx}>{boldText[1]}</strong>
                            : part;
                    })}
                </li>
            ))}
        </ul>
    );
};

const Featured = () => {
    const isIOS = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);

    const mapUrl = isIOS
        ? `https://maps.apple.com/?q=${encodeURIComponent(restaurant.name)}&ll=${restaurant.latitude},${restaurant.longitude}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${restaurant.name} ${restaurant.latitude},${restaurant.longitude}`,
        )}`;

    return (
        <div className="featured-page flex flex-col min-h-screen">
            <div className="relative h-[clamp(20rem,70vw,32rem)] w-full overflow-hidden desktop:h-[50vh] desktop:min-h-[32rem]">
                <img
                    src={background}
                    alt="Featured happy hours"
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b3d70]/90 via-[#0b3d70]/55 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 z-10 max-w-3xl sm:left-8 sm:right-8 sm:bottom-8">
                    <h2 className="text-base font-bold text-white uppercase drop-shadow-md sm:text-2xl">
                        Happy Hour of the Week
                    </h2>
                    <div className="mt-2 h-0.5 w-1/2 !bg-white shadow-md" />
                    <h1 className="m-0 mt-5 text-3xl font-bold uppercase leading-tight text-white drop-shadow-md sm:mt-8 sm:text-5xl">
                        {restaurant.name}
                    </h1>
                    <h2 className="text-base sm:text-xl font-semibold text-white drop-shadow-md">
                        {restaurant.town}
                    </h2>
                    <p className="my-3 mr-2 hidden text-sm text-white drop-shadow-md xs:block sm:my-4 sm:text-lg">
                        {restaurant.description}
                    </p>
                    <a
                        href={restaurant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-8 hidden xs:block w-full items-center justify-center rounded-3xl bg-white px-4 py-2 text-center text-xs font-semibold text-blue hover-bg-blue hover:text-white xs:w-fit xs:min-w-48"
                    >
                        VIEW WEBSITE
                    </a>
                </div>
            </div>
            <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-8 sm:py-10 xl:px-12">
                <p className="mb-4 block text-sm text-black xs:hidden sm:text-lg">
                    {restaurant.description}
                </p>
                <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-8 xs:hidden mb-6 w-full items-center justify-center rounded-3xl bg-blue px-4 py-2 text-center text-xs font-semibold text-white hover-bg-light-blue sm:w-fit sm:min-w-48"
                >
                    VIEW WEBSITE
                </a>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 desktop:grid-cols-[minmax(0,0.75fr)_minmax(0,0.75fr)_minmax(0,1fr)] desktop:gap-0">
                    <div className="featured-section-1 featured-mobile-section flex min-w-0 flex-col sm:border-r sm:border-gray-300 sm:pr-8">
                        <h2 className="font-semibold text-lg tracking-wide text-[#82cac5]">
                            HAPPY HOUR
                        </h2>
                        <div className="my-4 flex">
                            <ClockIcon className="mr-2 mt-1 inline-block h-5 w-5 shrink-0 text-blue" />
                            <div>
                                <p className="text-sm sm:text-lg font-semibold text-black">
                                    {restaurant.dayText}
                                </p>
                                <p className="text-sm sm:text-lg text-black">
                                    {restaurant.timeText}
                                </p>
                            </div>
                        </div>
                        <div className="address-section mb-4 mt-2 flex w-full">
                            <MapPinIcon className="mr-2 mt-1 inline-block h-5 w-5 shrink-0 text-[#ff7494]" />
                            <div>
                                <p className="text-sm sm:text-lg font-semibold text-black">
                                    {restaurant.address1}
                                </p>
                                <p className="text-sm sm:text-lg text-black">
                                    {restaurant.address2}
                                </p>
                            </div>
                        </div>
                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-8 w-full items-center justify-center rounded-3xl bg-[#82cac5] px-4 py-2 text-center text-xs font-semibold text-white hover-bg-light-blue xs:w-fit xs:min-w-48"
                        >
                            VIEW MAP
                        </a>
                    </div>
                    <div className="featured-section-2 featured-mobile-section flex min-w-0 flex-col desktop:border-r desktop:border-gray-300 desktop:px-8">
                        <h2 className="font-semibold text-lg tracking-wide text-[#8da663]">
                            DEALS
                        </h2>
                        <div className="mb-4 mt-2 text-sm text-black sm:text-lg">
                            <ListText text={restaurant.deals} />
                        </div>
                        <a
                            href={restaurant.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-8 w-full items-center justify-center rounded-3xl bg-[#8da663] px-4 py-2 text-center text-xs font-semibold text-white hover-bg-light-blue xs:w-fit xs:min-w-48"
                        >
                            VIEW HAPPY HOUR MENU
                        </a>
                    </div>
                    <div className="featured-section-3 featured-mobile-section flex min-w-0 flex-col md:col-span-2 desktop:col-span-1 desktop:pl-8">
                        <h2 className="font-semibold text-lg tracking-wide text-[#ff9b64]">
                            DAILY SPECIALS
                        </h2>
                        <div className="mb-4 mt-2 text-sm text-black sm:text-lg">
                            <ListText text={restaurant.specials} bulletPoints={false} />
                        </div>
                    </div>
                </div>

                <section className="mt-4 w-full rounded-2xl border-2 border-[#3677cd] bg-light-blue p-5 shadow-xl sm:p-8">
                    <h1 className="text-center text-2xl font-bold tracking-wide text-blue sm:text-3xl">
                        jShH Recommendations
                    </h1>
                    <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-blue" />
                    <div className="mx-auto mt-5 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-xl border border-[#8da663]/25 bg-white p-4 shadow-md">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8da663]/15">
                                <Utensils
                                    aria-hidden="true"
                                    className="h-6 w-6 text-[#71894d]"
                                />
                            </span>
                            <p className="text-sm text-black sm:text-base">
                                <span className="font-semibold">Food:</span> Grilled Chicken Nachos
                            </p>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-[#ff9b64]/25 bg-white p-4 shadow-md">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff9b64]/15">
                                <Martini
                                    aria-hidden="true"
                                    className="h-6 w-6 text-[#e77d42]"
                                />
                            </span>
                            <p className="text-sm text-black sm:text-base">
                                <span className="font-semibold">Drink:</span> Skinny Iguana Marg
                            </p>
                        </div>
                    </div>
                </section>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 desktop:grid-cols-6">
                    {featuredImages.map((image, idx) => (
                        <img
                            key={image}
                            src={image}
                            alt={`${restaurant.name}, view ${idx + 1}`}
                            className="aspect-[3/4] w-full rounded-lg object-cover"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Featured;
