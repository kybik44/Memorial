import { Box, Link, Stack, Theme, useMediaQuery } from "@mui/material";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import Text from "/components/atoms/text/Text";
import InstagramIcon from "/icons/InstagramIcon";
import styles from "./styles";

const MapY = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const defaultMapState = {
    center: [53.929001, 27.622333],
    zoom: 17,
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.map} id="map">
        <YMaps>
          <Map defaultState={defaultMapState} width="100%" height="100%">
            <Placemark geometry={[53.929001, 27.622333]} />
          </Map>
        </YMaps>
        {isSmallScreen && (
          <Link href="(link unavailable)" sx={styles.mapLink} target="_blank">
            <Text variant="body2">Смотреть на карте</Text>
          </Link>
        )}
      </Box>

      <Box sx={styles.info}>
        <Box sx={styles.titleBox}>
          <Text variant="h2">Контакты</Text>
          <Text variant={isSmallScreen ? "body2" : "body1"}>
            Вся информация для связи с нами
          </Text>
        </Box>
        <Stack
          spacing={{ xs: 0, sm: 1, xl: 2.5 }}
          sx={styles.infoContainer}
          direction="column"
        >
          <Stack spacing={1} sx={styles.infoBox}>
            <Text variant="subtitle2" sx={styles.text}>
              Телефон
            </Text>
            <Link href="tel:+375 44 678 17 89">
              <Text variant="body2" sx={styles.text}>
                +375 44 678 17 89
              </Text>
            </Link>
          </Stack>
          <Stack spacing={1} sx={styles.infoBox}>
            <Text variant="subtitle2" sx={styles.text}>
              Адрес магазина
            </Text>
            <Text variant="body2" sx={styles.text}>
              г. Минск, ул. Бакинская, д. 56, кв. 5
            </Text>
            {!isSmallScreen && (
              <Link href="(link unavailable)" target="_blank">
                <Text variant="body1" sx={styles.show}>
                  Смотреть на карте
                </Text>
              </Link>
            )}
          </Stack>
          <Stack spacing={1} sx={styles.infoBox}>
            <Text variant="subtitle2" sx={styles.text}>
              E-mail:
            </Text>
            <Link variant="body2" href="mailto:123456789@mail.ru">
              <Text variant="body2" sx={styles.text}>
                123456789@mail.ru
              </Text>
            </Link>
          </Stack>
          <Stack spacing={1} sx={styles.infoBox}>
            <Text variant="subtitle2" sx={styles.text}>
              Время работы:
            </Text>
            <Text variant="body2" sx={styles.text} multiline>
              пн -пт : 10:00 - 18:00{"\n"} сб-вс: 10:00 - 15:00
            </Text>
          </Stack>
        </Stack>
        <Link
          href="(link unavailable)"
          sx={styles.instagramLink}
          target="_blank"
        >
          <InstagramIcon className={{ marginTop: "22px" }} />
        </Link>
      </Box>
    </Box>
  );
};

export default MapY;
