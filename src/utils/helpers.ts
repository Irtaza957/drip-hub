import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Libraries } from "@react-google-maps/api";

export const libraries: Libraries = ["places"];

type CountryResponse = {
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
    };
  };
};

export const calculateTotalCost = (cart: CART[]) => {
  let totalCost = 0;
  for (const item of cart) {
    totalCost += item.price * item.quantity;
  }
  return totalCost;
};

export const generateDates = (amount: number): DATE[] => {
  const today = new Date();
  const dates = [];

  for (let i = 0; i < amount; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const id = i + 1;
    const day = date.toLocaleString("en-us", { weekday: "short" });
    const month = date.toLocaleString("en-us", { month: "short" });

    dates.push({
      id: id,
      date: date.getDate(),
      day: day,
      month: month,
    });
  }

  return dates;
};

export const generateTimeSlots = (dateStr: string) => {
  const inputDate = new Date(dateStr);
  const currentDate = new Date();
  const isToday = currentDate.toDateString() === inputDate.toDateString();

  let startTime = new Date(inputDate);

  if (isToday) {
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    startTime.setHours(currentHour, 0, 0, 0);
    if (currentMinutes > 0) {
      startTime.setHours(currentHour + 1, 0, 0, 0);
    }
  } else {
    startTime.setHours(0, 0, 0, 0);
  }

  const endTime = new Date(inputDate);
  endTime.setHours(24, 0, 0, 0);

  const timeSlots = [];

  while (startTime < endTime) {
    const slotStartTime = startTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    startTime.setHours(startTime.getHours() + 1);

    const slotEndTime = startTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    timeSlots.push(`${slotStartTime} - ${slotEndTime}`);
  }

  return timeSlots;
};

export const getCoordinates = (): Promise<COORDINATES> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation API not supported by browser"));
    }
  });
};

// eslint-disable-next-line no-unused-vars
export const fetchCountryFromIP = async (setter: (code: string) => void) => {
  const coords = await getCoordinates();

  if (coords) {
    let locationData = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const finalLocation: {
      results: {
        address_components: {
          long_name: string;
          short_name: string;
          types: string[];
        }[];
      }[];
      status: string;
    } = await locationData.json();
    const countryCode =
      finalLocation.results[0]?.address_components[
        finalLocation.results[0]?.address_components.length - 1
      ].short_name;

    if (countryCode) {
      setter(countryCode);
    } else {
      toast.error("Error Fetching Location");
    }
  } else {
    toast.error("Error Fetching Location");
  }
};

export const fetchCountries = async (
  setter: React.Dispatch<React.SetStateAction<SELECT_MENU_ITEM_PROPS[]>>
) => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name"
  );
  const countries: CountryResponse[] = await response.json();
  const countryList = countries.map((country, idx) => {
    return {
      id: idx,
      name: country.name.common,
    };
  });

  setter(countryList);
};

export const priceCalculator = (
  discount_type: string,
  price: string,
  discount_value: string
) => {
  if (discount_type === "percent") {
    let discount_amount =
      parseFloat(price) -
      parseFloat(price) * (parseFloat(discount_value) / 100);
    return discount_amount;
  } else {
    return parseFloat(price) - parseFloat(discount_value);
  }
};

export const numberSentences = (number: number, text: string) => {
  const sentenceRegex = /[^.!?]+[.!?]+/g;
  const sentences = text.match(sentenceRegex);

  return sentences ? sentences.slice(0, number) : [];
};

export const convertToDateString = (dateObj: DATE): string => {
  const monthMap: { [key: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const { date, month } = dateObj;
  const currentYear = dayjs().year();
  const monthNumber = monthMap[month];

  const formattedDate = String(date).padStart(2, "0");

  const dateString = `${currentYear}-${monthNumber}-${formattedDate}`;
  const formattedDateString = dayjs(dateString, "YYYY-MM-DD").format(
    "YYYY-MM-DD"
  );

  return formattedDateString;
};

export const calculateDiscount = (cart: CART[], promo: PROMO | null) => {
  let subtotal = 0;
  let discounted_total = 0;

  for (const item of cart) {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    if (item.discount === null) {
      if (promo?.discount_type === "fixed") {
        discounted_total +=
          Math.max(0, item.price - parseInt(promo.discount_value)) *
          item.quantity;
      } else if (promo?.discount_type === "percentage") {
        discounted_total +=
          item.price *
          (1 - parseInt(promo.discount_value) / 100) *
          item.quantity;
      }
    } else {
      discounted_total += itemTotal;
    }
  }

  const discounted_amount = subtotal - discounted_total;

  return {
    subtotal,
    discounted_total,
    discounted_amount,
  };
};

export const sort = (sortType: string, array: DRIP_CARD[] | undefined) => {
  if (array) {
    const sortedArray = [...array!];

    switch (sortType) {
      case "Price (Low to High)":
        return sortedArray.sort(
          (a, b) => parseFloat(a.price_with_vat) - parseFloat(b.price_with_vat)
        );
      case "Price (High to Low)":
        return sortedArray.sort(
          (a, b) => parseFloat(b.price_with_vat) - parseFloat(a.price_with_vat)
        );
      case "Alphabetically":
        return sortedArray.sort((a, b) => a.name!.localeCompare(b.name!));
      default:
        return sortedArray;
    }
  }
};

export const imageBase = (image: string) => {
  const domain1 = "https://crm.fandcproperties.ae";

  if (image === "") {
    return "https://images.pexels.com/photos/5726796/pexels-photo-5726796.jpeg";
  }

  if (!image?.includes(domain1)) {
    return "https://images.pexels.com/photos/5726796/pexels-photo-5726796.jpeg";
  } else {
    return image;
  }
};

export function truncateString(str: string, maxLength: number): string {
  if (str?.length <= maxLength) {
    return str;
  }

  return `${str?.slice(0, maxLength)}...`;
}

export function formatString(input: string): string {
  return input
    .replace(/[^a-zA-Z\s]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .trim();
}