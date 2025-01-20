import { SxProps, Theme } from '@mui/material/styles';
import smogImage from "../../../assets/img/smog.png";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: 'relative',
    textAlign: 'center',
    overflow: 'hidden',
  },
  content: {
    py: [2, 6, 10],
  },
  title: {
    mb: [2.5, 4, 8],
  },
  cards: {},
  cardContainer: {
    perspective: 1000,
    maxWidth: 300,
    maxHeight: 300,
    '&:hover $cardInner': {
      transform: 'rotateY(180deg)',
    },
  },
  card: {
    width: '100%',
    height: '100%',
    // mb: [2, 4, 4]
  },
  cardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 1s',
    transformStyle: 'preserve-3d',
  },
  cardFlipped: {
    transform: 'rotateY(180deg)',
  },
  cardFront: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    color: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotateY(180deg)',
    backfaceVisibility: 'hidden',
    textAlign: 'left'
  },
  cardText: {
    textAlign: 'center',
    mt: 0.75,
  },
  cardDescription: {
    lineHeight: '90%'
  },
  smog: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    height: ['35%', '35%', '50%'],
    backgroundImage: `url("${smogImage}")`,
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: 1,
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'all 1s ease',
  },
  button: {
    zIndex: 2,
    mt: 0,
    transition: 'all 1s ease',
    width: '100%',
    maxWidth: ['100%', '100%', '280px'],
  },
  collapse: {
    "& .MuiCollapse-wrapperInner": {
      marginBottom: [3, 3, 10],
    }
  }
};

export default styles;
