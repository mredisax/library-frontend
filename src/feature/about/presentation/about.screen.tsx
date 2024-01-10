import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { type JSX } from 'react';

const Hero = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40vh',
  backgroundColor: '#282c34',
  color: 'white',
  fontSize: 'calc(10px + 2vmin)'
});

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gridGap: '12px',
  columnGap: '12px',
  rowGap: '32px',
  marginTop: '20px',
  marginBottom: '64px'
});

const BookCard = styled.div({
  width: '250px',
  height: '325px',
  backgroundColor: '#eee',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    scale: '1.03'
  }
});

const Contact = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '100px',
  padding: '20px',
  justifyContent: 'flex-start',
  backgroundColor: '#fff',
  '@media (max-width: 1150px)': {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});

const MapHolder = styled.div({
  marginTop: '20px',
  '@media (max-width: 1150px)': {
    iframe: {
      width: '100%',
      height: '300px'
    },
    width: '100%'
  }
});

export const AboutScreen = (): JSX.Element => {
  return (
    <Box>
      <Hero>
        <h1 style={{ textAlign: 'center' }}>Biblioteka Krakowska nr. 52</h1>
        <h3 style={{ textAlign: 'center' }}>im. Politechnikusa Krakusa</h3>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" href="/login" sx={{ mr: 2 }}>
            Login
          </Button>

          <Button variant="contained" color="secondary" href="/register" sx={{ ml: 2 }}>
            Register
          </Button>
        </Box>
      </Hero>
      <Box sx={{ mx: 8 }}>
        <div>
          <h1>Nowości</h1>
          <Grid>
            <BookCard>
              <img
                src="https://s.lubimyczytac.pl/upload/books/5098000/5098031/1118870-352x500.jpg"
                alt="tytul"
                width={250}
                height={325}
              />
            </BookCard>
            <BookCard>
              <img
                src="https://s.lubimyczytac.pl/upload/books/4988000/4988780/936172-352x500.jpg"
                alt="tytul"
                width={250}
                height={325}
              />
            </BookCard>
            <BookCard>
              <img
                src="https://s.lubimyczytac.pl/upload/books/308000/308630/494238-352x500.jpg"
                alt="tytul"
                width={250}
                height={325}
              />
            </BookCard>
            <BookCard>
              <img
                src="https://s.lubimyczytac.pl/upload/books/209000/209143/628379-352x500.jpg"
                alt="tytul"
                width={250}
                height={325}
              />
            </BookCard>
            <BookCard>
              <img
                src="https://s.lubimyczytac.pl/upload/books/4804000/4804205/903512-352x500.jpg"
                alt="tytul"
                width={250}
                height={325}
              />
            </BookCard>
            <BookCard>
              <img
                src="https://s.lubimyczytac.pl/upload/books/4802000/4802748/1110164-352x500.jpg"
                alt="tytul"
                width={250}
                height={325}
              />
            </BookCard>
          </Grid>
        </div>
        <Contact>
          <MapHolder>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12183.624371964059!2d19.92738639655679!3d50.06210200184096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b0911f4094b%3A0x64c6405eba13227b!2zUmFqc2thLCBLcmFrw7N3!5e0!3m2!1spl!2spl!4v1704547736869!5m2!1spl!2spl"
              width="600"
              height="450"
              style={{ border: 0 }}
              title="mapa"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapHolder>
          <div>
            <h2>Biblioteka Krakowska nr. 52</h2>
            <p>ul. Krakusa 1</p>
            <p>30-111 Kraków</p>
            <p>tel. 12 123 45 67</p>
            <p>
              email:
              <a href="mailto:test@test.test">test@test.test</a>
            </p>
            <h3>Godziny otwarcia:</h3>
            <ul>
              <li>Poniedziałek: 8:00 - 16:00</li>
              <li>Wtorek: 8:00 - 16:00</li>
              <li>Środa: 8:00 - 16:00</li>
              <li>Czwartek: 8:00 - 16:00</li>
              <li>Piątek: 8:00 - 16:00</li>
            </ul>
          </div>
        </Contact>
        <Contact style={{ marginTop: '64px', gap: '64px' }}>
          <div>
            <img
              src="https://krakow.mapaakademicka.pl/wp-content/uploads/sites/3/2019/05/pk_flagi_wyprostowane-2048x1523.jpg"
              alt="biblioteka"
              width={600}
              height={400}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <h1>O nas</h1>
            <p style={{ maxWidth: '768px' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus,
              voluptates, quidem, quos voluptatem voluptatum consequatur quas doloremque magni quod
              doloribus. Rerum, voluptatum quia. Quia, voluptatem. Quam, voluptates. Quisquam
              voluptatibus, voluptates, quidem, quos voluptatem voluptatum consequatur quas
              doloremque magni quod doloribus. Rerum, voluptatum quia. Quia, voluptatem. Quam,
              voluptates. Quisquam voluptatibus, voluptates, quidem, quos voluptatem voluptatum
              consequatur quas doloremque magni quod doloribus. Rerum, voluptatum quia. Quia,
              voluptatem. Quam, voluptates. Quisquam voluptatibus, voluptates, quidem, quos
              voluptatem voluptatum consequatur quas doloremque magni quod doloribus. Rerum,
              voluptatum quia. Quia, voluptatem. Quam, voluptates.
            </p>
          </div>
        </Contact>
      </Box>
    </Box>
  );
};
