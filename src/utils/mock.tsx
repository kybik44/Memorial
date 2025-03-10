import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import { IAdvantagesList } from "../components/organisms/advantages/Advantages";
import GearIcon from "../icons/GearIcon";
import GeoIcon from "../icons/GeoIcon";
import ShieldIcon from "../icons/ShieldIcon";
import SmartPhoneIcon from "../icons/SmartPhoneIcon";

//Временные данные, ждем апи, конечный вид объектов не известен

export const getAdvantagesInfo = (
  isSmallScreen: boolean,
  iconProperties: Object
): Array<IAdvantagesList> => [
  {
    title: "Удобная оплата",
    subtitle: "Наличный и безналичный расчет",
    icon: <SmartPhoneIcon className={isSmallScreen && iconProperties} />,
  },
  {
    title: "Надежно и безопасно",
    subtitle: "Опыт работы более 10 лет",
    icon: <ShieldIcon className={isSmallScreen && iconProperties} />,
  },
  {
    title: "Всё включено",
    subtitle: "Памятники от проектирования до установки",
    icon: <GearIcon className={isSmallScreen && iconProperties} />,
  },
  {
    title: "Широкая география",
    subtitle: "Работаем по всей территории Беларуси",
    icon: <GeoIcon className={isSmallScreen && iconProperties} />,
  },
];

export const footerPages = [
  "Главная",
  "Виды гранита",
  "Каталог",
  "Наши работы",
  "Контакты",
];

export const footerInfos = [
  {
    title: "+375 44 678 17 89",
    icon: <PhoneIcon htmlColor="#6E8061" />,
    href: "tel:+375446781789",
  },
  {
    title: "123456789@mail.ru",
    icon: <MailOutlinedIcon htmlColor="#6E8061" />,
    href: "mailto:+123456789@mail.ru",
  },
  {
    title: "г. Минск, ул. Бакинская, д. 56, кв. 5",
    icon: <LocationOnIcon htmlColor="#6E8061" />,
    href: "https://yandex.by/maps/157/minsk/house/Zk4YcwFgSkYGQFtpfXR2eH9gYA==/?ll=27.560331%2C53.879334&z=17.6",
    target: "_blank",
  },
];

export const footerTime = [
  {
    date: "пн - пт",
    time: "10:00 - 18: 00",
  },
  {
    date: "сб - вс",
    time: "10:00 - 15: 00",
  },
];
