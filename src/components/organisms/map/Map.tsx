import { Box, Link, Stack, Theme, useMediaQuery } from "@mui/material";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import Text from "/components/atoms/text/Text";
import InstagramIcon from "/icons/InstagramIcon";
import styles from "./styles";
import FadeInWhenVisible from "/components/animations/FadeInWhenVisible";

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
      <FadeInWhenVisible delay={0.1}>
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
      </FadeInWhenVisible>

      <Box sx={styles.info}>
        <FadeInWhenVisible delay={0.2}>
          <Box sx={styles.titleBox}>
            <Text 
              variant="h2"
              animated
              animationType="fadeIn"
              delay={0.1}
            >
              Контакты
            </Text>
            <Text 
              variant={isSmallScreen ? "body2" : "body1"}
              animated
              animationType="fadeIn"
              delay={0.2}
            >
              Вся информация для связи с нами
            </Text>
          </Box>
        </FadeInWhenVisible>
        
        <Stack
          spacing={{ xs: 0, sm: 1, xl: 2.5 }}
          sx={styles.infoContainer}
          direction="column"
        >
          <FadeInWhenVisible delay={0.3} direction="up">
            <Stack spacing={1} sx={styles.infoBox}>
              <Text 
                variant="subtitle2" 
                sx={styles.text}
                animated
                animationType="fadeIn"
              >
                Телефон
              </Text>
              <Link href="tel:+375 44 678 17 89">
                <Text 
                  variant="body2" 
                  sx={styles.text}
                  animated
                  animationType="fadeIn"
                  delay={0.1}
                >
                  +375 44 678 17 89
                </Text>
              </Link>
            </Stack>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.4} direction="up">
            <Stack spacing={1} sx={styles.infoBox}>
              <Text 
                variant="subtitle2" 
                sx={styles.text}
                animated
                animationType="fadeIn"
              >
                Адрес магазина
              </Text>
              <Text 
                variant="body2" 
                sx={styles.text}
                animated
                animationType="fadeIn"
                delay={0.1}
              >
                г. Минск, ул. Бакинская, д. 56, кв. 5
              </Text>
              {!isSmallScreen && (
                <Link href="(link unavailable)" target="_blank">
                  <Text 
                    variant="body1" 
                    sx={styles.show}
                    animated
                    animationType="fadeIn"
                    delay={0.2}
                  >
                    Смотреть на карте
                  </Text>
                </Link>
              )}
            </Stack>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.5} direction="up">
            <Stack spacing={1} sx={styles.infoBox}>
              <Text 
                variant="subtitle2" 
                sx={styles.text}
                animated
                animationType="fadeIn"
              >
                E-mail:
              </Text>
              <Link variant="body2" href="mailto:123456789@mail.ru">
                <Text 
                  variant="body2" 
                  sx={styles.text}
                  animated
                  animationType="fadeIn"
                  delay={0.1}
                >
                  123456789@mail.ru
                </Text>
              </Link>
            </Stack>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.6} direction="up">
            <Stack spacing={1} sx={styles.infoBox}>
              <Text 
                variant="subtitle2" 
                sx={styles.text}
                animated
                animationType="fadeIn"
              >
                Время работы:
              </Text>
              <Text 
                variant="body2" 
                sx={styles.text} 
                multiline
                animated
                animationType="fadeIn"
                delay={0.1}
              >
                пн -пт : 10:00 - 18:00{"\n"} сб-вс: 10:00 - 15:00
              </Text>
            </Stack>
          </FadeInWhenVisible>
        </Stack>
        
        <FadeInWhenVisible delay={0.7}>
          <Link
            href="(link unavailable)"
            sx={styles.instagramLink}
            target="_blank"
          >
            <InstagramIcon className={{ marginTop: "22px" }} />
          </Link>
        </FadeInWhenVisible>
      </Box>
    </Box>
  );
};

export default MapY;
