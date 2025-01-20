import { Grid, Link, Stack, Theme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styles from "./styles";
import bigLogo from "/assets/img/bigLogo.png";
import Text from "/components/atoms/text/Text";
import { footerInfos, footerPages, footerTime } from "/utils/mock";

const Footer = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <Stack direction="column" sx={styles.logoContainer}>
          <Box component="img" sx={styles.logo} alt="logo" src={bigLogo} />
          {!isSmallScreen && (
            <Text
              sx={styles.privacy}
              variant="body1"
              customColor="text.secondary"
            >
              © Company Name. All rights reserved.
            </Text>
          )}
        </Stack>
        <Box sx={styles.columns}>
          <Grid
            container
            direction="column"
            rowGap={{ xs: 2, lg: 3 }}
            sx={styles.links}
          >
            {footerPages.map((page) => (
              <Grid item key={page}>
                <Link
                  underline="hover"
                  sx={styles.navItem}
                  title={page}
                  href={`/${page.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <Text
                    variant="h5"
                    customColor="text.secondary"
                    sx={styles.text}
                  >
                    {page}
                  </Text>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            direction="column"
            rowGap={{ xs: 1, lg: 3 }}
            sx={styles.infos}
          >
            {footerInfos.map(({ title, icon, href, target }) => (
              <Grid item key={title}>
                <Link
                  href={href}
                  target={target}
                  underline="hover"
                  title={title}
                  sx={styles.infoLink}
                >
                  {icon}
                  <Text
                    variant="h5"
                    ml={2}
                    customColor="text.secondary"
                    sx={styles.text}
                  >
                    {title}
                  </Text>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            direction="column"
            rowGap={{ xs: 2, lg: 3 }}
            sx={styles.time}
          >
            {footerTime.map(({ date, time }) => (
              <Grid item sx={styles.timeItem} key={`${date}-${time}`}>
                <Text
                  variant="h5"
                  customColor="text.secondary"
                  sx={styles.text}
                >
                  {date}
                </Text>
                <Text
                  variant="h5"
                  ml={2}
                  customColor="text.secondary"
                  sx={styles.text}
                >
                  {time}
                </Text>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
